import React, { useState, useEffect, useRef, useCallback} from "react";
import { motion } from "framer-motion";


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
        date: "2024-2025",
        description: "Graduate Software Developer",
        longDescription: "Worked on the Rokos Capital Management project for the Reference Data team; I developed in a wide variety of areas primarily utilising .NET/C#, Python, React.js, and MS SQL Server. Additionally, deployed full stack AI applications used company-wide.",
        isActive: true,
        image: "/photos/neptune2.png",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "Neptune North",
        date: "2025-Present",
        description: "Software Developer",
        longDescription: "The latest step in my career. To be continued...",
        isActive: false,
        image: "/photos/neptune2.png",
        icon: (
            '...'
        )
    }
];

const VerticalTimeline = () => {
    const [progress, setProgress] = useState(0);
    const timelineRef = useRef(null);

    const handleScroll = useCallback(() => {
        const timelineElement = timelineRef.current;
        if (!timelineElement) return;

        const rect = timelineElement.getBoundingClientRect();
        const timelineStart = rect.top;
        const timelineEnd = rect.bottom;
        const viewportHeight = window.innerHeight;
        const viewportMidpoint = viewportHeight / 2;

        if (timelineStart <= viewportMidpoint && timelineEnd >= viewportMidpoint) {
            const totalHeight = timelineEnd - timelineStart;
            const currentProgress = (viewportMidpoint - timelineStart) / totalHeight;
            setProgress(currentProgress * 100);
        } else if (timelineEnd < viewportMidpoint) {
            setProgress(100);
        } else if (timelineStart > viewportMidpoint) {
            setProgress(0);
        }
    }, []);

    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="w-screen pt-48 lg:ml-56 xl:ml-0 xl:w-screen lg:w-3/4">
            <div ref={timelineRef} className="lg:max-w-6xl lg:mx-auto relative ">
                {/* Progress bar */}
                <div className="ml-2 sm:ml-4 md:ml-0 absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent">
                <div 
                    className="absolute top-0 left-0 md:left-1/2 w-full bg-emerald-500 transition-all duration-200 ease-out"
                    style={{ height: `${progress}%` }}
                ></div>
            </div>

                {timelineItems.map((item, index) => {
                    const itemProgress = (progress - (index / timelineItems.length) * 100) * timelineItems.length;
                    const isActive = itemProgress > 0;
                    return (
                    <div key={index} className={`timeline-item relative flex items-start mb-24 group ${isActive ? 'is-active' : ''}`}>
                        <div className={`ml-6 sm:ml-8 md:ml-0 absolute left-4 md:left-1/2 flex items-center justify-center w-16 h-16 rounded-full border-2 border-white ${isActive ? 'bg-emerald-500 text-emerald-50' : 'bg-slate-300 text-slate-500'} shadow shrink-0 transform -translate-x-1/2 z-10 transition-colors duration-300`}>
                            {item.icon}
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }} className={`mr-5 md:mr-0 ml-24 md:ml-0 w-3/4 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:pr-4 md:ml-4' : 'md:pl-4 md:ml-auto md:mr-6'}`}>
                            <div className={`text-puce bg-gradient-to-br from-white to-sagegreen
                            ring-1 ring-puce focus:ring-2 rounded-lg shadow overflow-hidden
                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                transition-all duration-300 ease-in-out transform
                                hover:shadow-lg`}>

                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full pt-2 md:w-1/3 h-48 md:h-auto flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-auto max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/3 p-6">
                                        <div className="font-bold text-xl text-slate-900">{item.title}</div>
                                        <div className="text-indigo-500 text-lg font-semibold">{item.description}</div>
                                        <time className={`font-caveat font-medium text-sm text-slate-500`}>{item.date}</time>
                                        <div className="text-slate-700 text-sm relative mt-2">{item.longDescription}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>);}
                )}
            </div>
        </div>
    );
};

export default VerticalTimeline;