import React, { useState, useEffect, useRef } from "react";


const timelineItems = [
    {
        title: "St Mary's Catholic School",
        date: "Sept 2014 - June 2021",
        description: "Secondary School",
        longDescription: "Excelled in academic studies, particularly in sciences and mathematics. Scored A*A*A* in Physics, Maths, and Further Maths in addition to AA in EPQ and Thinking Skills. Attained 12 GCSEs: four 9's, seven 8's, and one 7.",
        isActive: true,
        image: "/photos/marys.png",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "Shape Performance",
        date: "July 2021- April 2023",
        description: "Sports Coach ",
        longDescription: "A summer job to help fund my university studies. Responsible for groups of 15‑20 children aged 5‑12 as part of sports summer camps across Newcastle, coaching a range of sports and activities. ",
        isActive: true,
        image: "/photos/shapeperformance.jpg",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "NogginHQ",
        date: "Jul-Aug 2023",
        description: "Intern Data Engineer",
        longDescription: "Summer internship during Summer 2023. Responsible for SEO and produced a data scraper to efficiently retrieve up to date information.",
        isActive: true,
        image: "photos/nhq.png",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "University of Bristol",
        date: "2021-2024",
        description: "BSc Computer Science",
        longDescription: "Attained a high 2:1 with honours (67%), achieving outstanding results in software engineering, data science, and machine learning. Participated in various extracurricular activities including the engineering football team.",
        isActive: true,
        image: "/photos/bris.png",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "Neptune North",
        date: "2024-Present",
        description: "Software Engineer",
        longDescription: "The latest step in my career. To be continued...",
        isActive: false,
        image: "/photos/neptune.png",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
            </svg>
        )
    }
];

const VerticalTimeline = () => {
    const [activeItems, setActiveItems] = useState([]);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const timelineElement = timelineRef.current;
            if (!timelineElement) return;

            const items = timelineElement.querySelectorAll('.timeline-item');
            const viewportHeight = window.innerHeight;

            const newActiveItems = Array.from(items).map((item, index) => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < viewportHeight * 0.75 && rect.bottom >= 0;
                return isVisible || activeItems.includes(index);
            });

            setActiveItems(newActiveItems);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeItems]);

    return (
        <div className="w-screen bg-gradient-to-r from-sagegreen to-puce pt-48 pb-48">
            <div ref={timelineRef} className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
                {/* Progress bar */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent">
                </div>

                {timelineItems.map((item, index) => (
                    <div key={index} className={`timeline-item relative flex items-start mb-24 group ${activeItems[index] ? 'is-active' : ''}`}>
                        <div className={`absolute left-4 md:left-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 border-white ${activeItems[index] ? 'bg-emerald-500 text-emerald-50' : 'bg-slate-300 text-slate-500'} shadow shrink-0 transform -translate-x-1/2 z-10 transition-colors duration-300`}>
                            {item.icon}
                        </div>
                        <div className={`ml-28 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                            <div className={`text-puce bg-gradient-to-br from-white to-sagegreen
                            ring-1 ring-puce focus:ring-2 rounded-lg shadow overflow-hidden
                                ${activeItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                transition-all duration-300 ease-in-out transform
                                hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}>

                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="absolute h-full w-auto md:h-auto md:w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/3 p-6">
                                        <div className="flex items-center justify-between space-x-2 mb-2">
                                            <div className="font-bold text-xl text-slate-900">{item.title}</div>
                                            <time className={`font-caveat font-medium text-lg ${activeItems[index] ? 'text-indigo-500' : 'text-amber-500'}`}>{item.date}</time>
                                        </div>
                                        <div className="text-slate-700 font-semibold mb-2">{item.role}</div>
                                        <div className="text-slate-600 mb-4">{item.description}</div>
                                        <div className="text-slate-500 text-sm">{item.longDescription}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalTimeline;