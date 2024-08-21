import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TimelineEvent = ({ event, isActive }) => (
  <div className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
    <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-300'} mb-2`} />
    <p className={`text-sm font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>{event.date}</p>
    <p className={`text-xs ${isActive ? 'text-black' : 'text-gray-400'}`}>{event.title}</p>
  </div>
);

const HorizontalTimeline = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef(null);

  const handleScroll = (e) => {
    const container = timelineRef.current;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newProgress = (scrollPosition / maxScroll) * 100;
    setProgress(newProgress);

    const newIndex = Math.round((scrollPosition / maxScroll) * (events.length - 1));
    setActiveIndex(newIndex);
  };

  const scrollTo = (index) => {
    const container = timelineRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = (index / (events.length - 1)) * maxScroll;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = timelineRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={timelineRef}
          className="flex overflow-x-auto space-x-12 py-4 px-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {events.map((event, index) => (
            <div key={index} className="flex-shrink-0 snap-center">
              <TimelineEvent event={event} isActive={index === activeIndex} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollTo(Math.min(events.length - 1, activeIndex + 1))}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HorizontalTimeline;