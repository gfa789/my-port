import React, { useState, useRef, useCallback } from 'react';

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

  const handlePlay = useCallback(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (video1 && video2) {
      video2.currentTime = video1.currentTime;
      video2.play();
    }
  }, []);

  React.useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    
    if (video1 && video2) {
      if (isPlaying) {
        const playVideos = async () => {
          try {
            video2.currentTime = video1.currentTime;
            await Promise.all([
              video1.play(),
              video2.play()
            ]);
          } catch (error) {
            console.error('Error playing videos:', error);
          }
        };
        playVideos();
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
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer w-full"
        style={{ aspectRatio: '16/9' }}
        onMouseMove={handleBoundedMouseMove}
        onClick={onTogglePlay}
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
            clipPath: `polygon(0 0, ${splitPosition || '50%'}px 0, ${splitPosition || '50%'}px 100%, 0 100%)`
          }}
        >
          <source src={`/overwater/optimized_videos/optimized_${pair.original}.mp4`} type="video/mp4" />
        </video>
        
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{
            left: `${splitPosition || 50}px`,
            transform: 'translateX(-50%)'
          }}
        />
      </div>
      <div className="text-lg font-medium text-white font-serif pb-4">
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
    </div>
  );
};

export default VideoComparison;