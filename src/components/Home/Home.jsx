import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [activeEvents, setActiveEvents] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const timelineRef = useRef(null);
  const eventsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    const handleResize = () => {
      if (eventsRef.current && timelineRef.current) {
        const eventsHeight = eventsRef.current.offsetHeight;
        const timelineTop = timelineRef.current.offsetTop;
        setTimelineHeight(eventsHeight);
        timelineRef.current.style.height = `${eventsHeight}px`;
        timelineRef.current.style.top = `${timelineTop}px`;
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const checkEventVisibility = () => {
      const events = document.querySelectorAll('.event');
      const newActiveEvents = [];

      events.forEach((event, index) => {
        const rect = event.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          newActiveEvents.push(index);
        }
      });

      setActiveEvents(newActiveEvents);
    };

    window.addEventListener('scroll', checkEventVisibility);
    checkEventVisibility();

    return () => {
      window.removeEventListener('scroll', checkEventVisibility);
    };
  }, []);

  const calculateProgress = () => {
    if (!timelineRef.current) return 0;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    const progress = ((windowCenter - timelineRect.top) / timelineRect.height) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const progress = calculateProgress();

  const getCardStyle = (index) => {
    const card = document.querySelector(`.event-card-${index}`);
    if (!card) return {};
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
    const distanceX = mousePosition.x - centerX;
    const distanceY = mousePosition.y - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const maxTilt = 15; // Maximum tilt in degrees
    const maxShift = 30; // Maximum shift in pixels
    
    const tiltX = (distanceY / maxDistance) * maxTilt;
    const tiltY = -(distanceX / maxDistance) * maxTilt;
    const shiftX = (distanceX / maxDistance) * maxShift;
    const shiftY = (distanceY / maxDistance) * maxShift;
    
    const scale = 1 + (1 - Math.min(distance, maxDistance) / maxDistance) * 0.05;
    
    return {
      transform: `translate(${shiftX}px, ${shiftY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
      transition: 'transform 0.2s ease-out',
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto pt-4 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Vertical Timeline</h1>
      <p className="mb-8 text-center">Scroll down to see the timeline progress.</p>
      <div ref={timelineRef} className="absolute left-1/2 w-2 bg-gray-200 transform -translate-x-1/2">
        <div
          className="w-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
        ></div>
      </div>
      <div ref={eventsRef} className="relative z-10">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`event mb-16 flex items-center ${
              index % 2 === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`absolute left-1/2 w-6 h-6 rounded-full transition-all duration-500 ease-out transform -translate-x-1/2 ${
                activeEvents.includes(index) 
                  ? 'bg-blue-500 scale-125 border-2 border-white shadow-lg' 
                  : 'bg-gray-300 border-2 border-gray-300'
              }`}
            ></div>
            <div
              className={`event-card-${index} bg-white p-4 rounded shadow-lg max-w-xs ${
                index % 2 === 0 ? 'mr-8' : 'ml-8'
              }`}
              style={getCardStyle(index)}
            >
              <h2 className="text-xl font-semibold">Event {index + 1}</h2>
              <p>This is a description for Event {index + 1}.</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .event-card {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;