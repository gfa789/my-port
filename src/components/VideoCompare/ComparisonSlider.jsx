import React, { useState, useRef, useEffect } from 'react';

const ComparisonSlider = ({ beforeSrc, afterSrc, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeVideoError, setBeforeVideoError] = useState(false);
  const [afterVideoError, setAfterVideoError] = useState(false);
  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // Debug video loading issues
  useEffect(() => {
    const beforeVideo = beforeVideoRef.current;
    const afterVideo = afterVideoRef.current;

    if (!beforeVideo || !afterVideo) return;

    const handleBeforeError = (e) => {
      console.error('Error loading before video:', beforeSrc, e);
      setBeforeVideoError(true);
    };

    const handleAfterError = (e) => {
      console.error('Error loading after video:', afterSrc, e);
      setAfterVideoError(true);
    };

    const handleBeforeCanPlay = () => {
      console.log('Before video can play:', beforeSrc);
      setBeforeVideoError(false);
    };

    const handleAfterCanPlay = () => {
      console.log('After video can play:', afterSrc);
      setAfterVideoError(false);
    };

    beforeVideo.addEventListener('error', handleBeforeError);
    afterVideo.addEventListener('error', handleAfterError);
    beforeVideo.addEventListener('canplay', handleBeforeCanPlay);
    afterVideo.addEventListener('canplay', handleAfterCanPlay);

    // Synchronize video playback
    const syncVideos = (event) => {
      if (event.target === beforeVideo && afterVideo.readyState >= 2) {
        afterVideo.currentTime = beforeVideo.currentTime;
      } else if (event.target === afterVideo && beforeVideo.readyState >= 2) {
        beforeVideo.currentTime = afterVideo.currentTime;
      }
    };

    const handlePlay = (event) => {
      if (event.target === beforeVideo && afterVideo.readyState >= 2) {
        afterVideo.play().catch(console.error);
      } else if (event.target === afterVideo && beforeVideo.readyState >= 2) {
        beforeVideo.play().catch(console.error);
      }
    };

    const handlePause = (event) => {
      if (event.target === beforeVideo) {
        afterVideo.pause();
      } else {
        beforeVideo.pause();
      }
    };

    beforeVideo.addEventListener('timeupdate', syncVideos);
    afterVideo.addEventListener('timeupdate', syncVideos);
    beforeVideo.addEventListener('play', handlePlay);
    beforeVideo.addEventListener('pause', handlePause);
    afterVideo.addEventListener('play', handlePlay);
    afterVideo.addEventListener('pause', handlePause);

    return () => {
      beforeVideo.removeEventListener('error', handleBeforeError);
      afterVideo.removeEventListener('error', handleAfterError);
      beforeVideo.removeEventListener('canplay', handleBeforeCanPlay);
      afterVideo.removeEventListener('canplay', handleAfterCanPlay);
      beforeVideo.removeEventListener('timeupdate', syncVideos);
      afterVideo.removeEventListener('timeupdate', syncVideos);
      beforeVideo.removeEventListener('play', handlePlay);
      beforeVideo.removeEventListener('pause', handlePause);
      afterVideo.removeEventListener('play', handlePlay);
      afterVideo.removeEventListener('pause', handlePause);
    };
  }, [beforeSrc, afterSrc]);

  const handleMouseMove = (event) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
      <div
        ref={containerRef}
        className="relative aspect-video w-full rounded-lg overflow-hidden cursor-col-resize shadow-xl"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={handleMouseLeave}
        onTouchMove={(e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
          setSliderPosition(Math.min(Math.max(x, 0), 100));
        }}
      >
        {/* Before Video */}
        <div className="absolute inset-0">
          <video
            ref={beforeVideoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            controls
          >
            <source src={beforeSrc} type="video/mp4" />
            <source src={beforeSrc} type="video/webm" />
            {beforeVideoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                Error loading original video
              </div>
            )}
          </video>
        </div>

        {/* After Video with clip path */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <video
            ref={afterVideoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            controls
          >
            <source src={afterSrc} type="video/mp4" />
            <source src={afterSrc} type="video/webm" />
            {afterVideoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                Error loading enhanced video
              </div>
            )}
          </video>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;