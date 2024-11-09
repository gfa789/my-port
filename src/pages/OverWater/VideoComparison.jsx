import React, { useState, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import Button from '../../components/Button';
import { Download } from 'lucide-react';

const VideoComparisonItem = React.memo(({ 
  index, 
  pair, 
  isPlaying,
  onMouseMove, 
  splitPosition,
  onTogglePlay
}) => {
  const containerRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wasPlayingRef = useRef(isPlaying);

  const currentSplitPosition = splitPosition ?? (containerRef.current?.offsetWidth / 2 || 200);

  // Handle visibility change
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      const video1 = video1Ref.current;
      const video2 = video2Ref.current;
      
      if (!video1 || !video2) return;

      if (document.hidden) {
        // Store current playing state and pause videos
        wasPlayingRef.current = !video1.paused;
        video1.pause();
        video2.pause();
      } else if (wasPlayingRef.current && isPlaying) {
        // Resume if it was playing before
        Promise.all([
          video1.play().catch(() => {}),
          video2.play().catch(() => {})
        ]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const handlePlay = useCallback(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (video1 && video2) {
      video2.currentTime = video1.currentTime;
      video2.play().catch(() => {});
    }
  }, []);

  React.useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    
    if (video1 && video2) {
      if (isPlaying && !document.hidden) {
        video2.currentTime = video1.currentTime;
        Promise.all([
          video1.play().catch(() => {}),
          video2.play().catch(() => {})
        ]);
      } else {
        video1.pause();
        video2.pause();
      }
    }
  }, [isPlaying]);

  const handleBoundedMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    onMouseMove(e, index, x);
  }, [index, onMouseMove]);

  return (
    <div className="flex flex-col items-center gap-2 w-11/12 lg:w-[400px]">
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-lg shadow-lg cursor-col-resize w-full"
        style={{ aspectRatio: '16/9' }}
        onMouseMove={handleBoundedMouseMove}
      >
        <video
          ref={video2Ref}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
        >
          <source src={`/overwater/optimized_videos/optimized_${pair.comparison}.mp4`} type="video/mp4" />
        </video>
        
        <video
          ref={video1Ref}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
          onPlay={handlePlay}
          style={{
            clipPath: `polygon(0 0, ${currentSplitPosition}px 0, ${currentSplitPosition}px 100%, 0 100%)`
          }}
        >
          <source src={`/overwater/optimized_videos/optimized_${pair.original}.mp4`} type="video/mp4" />
        </video>
        
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{
            left: `${currentSplitPosition}px`,
            transform: 'translateX(-50%)'
          }}
        />

        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button 
            onClick={onTogglePlay}
            variant="outline"
            size="icon"
            className="bg-white/20 hover:bg-white/30 w-10 h-10 flex items-center justify-center"
            icon={isPlaying ? (
              <Pause strokeWidth={2} className="h-5 w-5" />
            ) : (
              <Play strokeWidth={2} className="h-5 w-5" />
            )}
          >
          </Button>
        </div>
      </div>
      <div className="text-lg font-medium text-white font-serif">
        {pair.label}
      </div>
    </div>
  );
});

const VideoComparison = () => {
  const [splitPositions, setSplitPositions] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);

  const handleMouseMove = useCallback((e, index, boundedX) => {
    setSplitPositions(prev => ({
      ...prev,
      [index]: boundedX
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const pairs = React.useMemo(() => [
    { original: '0', comparison: '0_good', label: 'Comparison Set 1' },
    { original: '1', comparison: '1_good', label: 'Comparison Set 2' },
  ], []);

  return (
    <div className="p-4 w-full">
      <h1 className="justify-center text-white text-center font-serif text-3xl pb-8">
        Some Examples
      </h1>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-center justify-center gap-8">
        {pairs.map((pair, index) => (
          <VideoComparisonItem
            key={index}
            index={index}
            pair={pair}
            isPlaying={isPlaying}
            onMouseMove={handleMouseMove}
            splitPosition={splitPositions[index]}
            onTogglePlay={togglePlayPause}
          />
        ))}
      </div>
      <div className="justify-center flex text-center pt-10">
        <a href="https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view">
          <Button  text="Check out the paper" icon={<Download />}/>
        </a>
      </div>
    </div>
  );
};

export default VideoComparison;