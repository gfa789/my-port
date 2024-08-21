import React, { useState, useEffect, useRef } from "react";


const timelineItems = [
    {
        title: "St Mary's Catholic School",
        date: "2014-2021",
        description: "Secondary School - 3 A*s and 12 GCSEs 7-9 ",
        isActive: true,
        image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "Shape Performance",
        date: "2021-2023",
        description: "Sports Coach ",
        isActive: true,
        image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "NogginHQ",
        date: "2023",
        description: "Intern Data Engineer",
        isActive: true,
        image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
            </svg>
        )
    },
    {
        title: "University of Bristol",
        date: "2021-2024",
        description: "BSc Computer Science (High 2:1)",
        isActive: true,
        image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        isActive: false,
        image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: (
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
            </svg>
        )
    }
];

const VerticalTimeline = () => {
    const [progress, setProgress] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
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
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-screen bg-gradient-to-r from-sagegreen to-puce pt-32 pb-32">
        <div ref={timelineRef} className="max-w-4xl mx-auto relative px-4 sm:px-6 lg:px-8">
            {/* Progress bar */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent">
                <div 
                    className="absolute top-0 left-0 md:left-1/2 w-full bg-emerald-500 transition-all duration-200 ease-out"
                    style={{ height: `${progress}%` }}
                ></div>
            </div>

            {timelineItems.map((item, index) => {
                const itemProgress = (progress - (index / timelineItems.length) * 100) * timelineItems.length;
                const isActive = itemProgress > 0;

                return (
                    <div key={index} className={`relative flex items-start mb-12 group ${isActive ? 'is-active' : ''}`}>
                        <div className={`absolute left-4 md:left-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white ${isActive ? 'bg-emerald-500 text-emerald-50' : 'bg-slate-300 text-slate-500'} shadow shrink-0 transform -translate-x-1/2 z-10 transition-colors duration-300`}>
                            {item.icon}
                        </div>
                        <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                            <div className={`text-puce bg-gradient-to-br from-white to-sagegreen
                 ring-1 ring-puce focus:ring-2 rounded-lg shadow overflow-hidden
                                ${isActive ? 'animate-popIn' : 'opacity-0 scale-95 translate-y-4'}
                                transition-all duration-300 ease-in-out transform
                                hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}>
                                <div className="flex">
                                    <div className="w-1/3 aspect-square overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-2/3 p-4">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900">{item.title}</div>
                                            <time className={`font-caveat font-medium ${isActive ? 'text-indigo-500' : 'text-amber-500'}`}>{item.date}</time>
                                        </div>
                                        <div className="text-slate-500">{item.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    );
};

export default VerticalTimeline;