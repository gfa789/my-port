import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header';
import { useState } from 'react';
import VerticalTimeline from './components/VerticalTimeline';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="relative flex-grow">
          <Sidebar onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />
          <main className="w-screen bg-gradient-to-r from-sagegreen to-puce">
            <section id="home"><Header /></section>
            <section id= "timeline"><VerticalTimeline /></section>
            <section id="projects"><Projects /></section>
            <section id= "contact"> <Contact /> </section>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;