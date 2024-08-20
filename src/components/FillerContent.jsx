import React from 'react';

const Home = () => (
  <div className="p-4 ml-48">
    <h1 className="text-2xl font-bold mb-4">Welcome to Our Site</h1>
    {[...Array(20)].map((_, i) => (
      <p key={i} className="mb-4">
        This is some filler content for the home page. It's here to demonstrate how the page scrolls
        and interacts with the sidebar. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </div>
);

const About = () => (
  <div className="p-4 ml-48">
    <h1 className="text-2xl font-bold mb-4">About Us</h1>
    {[...Array(20)].map((_, i) => (
      <p key={i} className="mb-4">
        Here's some information about our company. We're dedicated to providing excellent service
        and innovative solutions. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </div>
);

const Services = () => (
  <div className="p-4 ml-48">
    <h1 className="text-2xl font-bold mb-4">Our Services</h1>
    {[...Array(20)].map((_, i) => (
      <p key={i} className="mb-4">
        We offer a wide range of services to meet your needs. From consulting to implementation,
        we've got you covered. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </div>
);

const Contact = () => (
  <div className="p-4 ml-48">
    <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
    {[...Array(20)].map((_, i) => (
      <p key={i} className="mb-4">
        Get in touch with us for any inquiries or support. We're here to help you succeed.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </div>
);

export { Home, About, Services, Contact };