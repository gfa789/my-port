import React, { useState, useRef, useEffect} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const recaptchaRef = useRef();

  const cardRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Starting form submission');
      
      // Execute reCAPTCHA
      const token = await recaptchaRef.current.executeAsync();
      console.log('reCAPTCHA token obtained:', token ? 'Yes' : 'No');

      if (!token) {
        throw new Error('reCAPTCHA verification failed');
      }

      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        email,
        message,
        timestamp: new Date()
      });
      console.log('Document written with ID: ', docRef.id);

      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      recaptchaRef.current.reset();
    } catch (error) {
      console.error('Error during form submission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div 
        ref={cardRef}
        className={`max-w-md w-full space-y-8 ${
          isVisible
            ? 'animate-popIn' : ''}`}
      >
        <div className="bg-gradient-to-br from-white to-sagegreen
                 ring-1 ring-puce focus:ring-2 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-2 py-2 mt-1 ring-1 ring-puce block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                placeholder='Enter Your Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                className=" px-2 py-2 mt-1 block w-full ring-puce ring-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6Lfx9CwqAAAAAA1MlzhDq1xg5NxM5leRgcoQUDMS"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" className="text-blue-500 hover:underline">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms" className="text-blue-500 hover:underline">Terms of Service</a> apply.
            </p>
          </form>
          {submitStatus === 'success' && (
            <p className="mt-4 text-green-600 text-center">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-red-600 text-center">Error sending message. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;