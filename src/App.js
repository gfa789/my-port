import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Home, About, Services, Contact } from './components/FillerContent';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />
          <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-0 sm:ml-48' : 'ml-0'}`}>
            <Header />
            <div className="p-4">
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="services"><Services /></section>
              <section id="contact"><Contact /></section>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;