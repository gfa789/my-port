import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Home, About, Services, Contact } from './components/FillerContent';
import Header from './components/Header';
import { useState } from 'react';
import VerticalTimeline from './components/VerticalTimeline';
import Footer from './components/Footer';
import HorizontalTimeline from './components/HorizontalTimeline'
import { Camera, Book, Music } from 'lucide-react';
import Projects from './components/Projects';

function App() {
  const [, setIsSidebarOpen] = useState(true);


  // const events = [
  //   { title: "Event 1", description: "Description for event 1", icon: <Camera size={16} /> },
  //   { title: "Event 2", description: "Description for event 2", icon: <Book size={16} /> },
  //   { title: "Event 3", description: "Description for event 3", icon: <Music size={16} /> },
  // ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="relative flex-grow">
          <Sidebar onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />
          <main className="w-screen bg-gradient-to-r from-sagegreen to-puce">
            <Header />
            <section id="projects"><Projects /></section>
            <section id= "timeline"><VerticalTimeline /></section>
            <div className="p-4">
              <section id="about"><About /></section>
              <section id="services"><Services /></section>
              <section id="contact"><Contact /></section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;