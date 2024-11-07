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

  // Sync videos when one starts playing
  const handlePlay = useCallback(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (video1 && video2) {
      video2.currentTime = video1.currentTime;
      video2.play();
    }
  }, []);

  // Update video playback states
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

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
        style={{ height: '300px', display: 'inline-block' }}
        onMouseMove={(e) => onMouseMove(e, index)}
        onClick={onTogglePlay}
      >
        {/* Base video (processed/good version) */}
        <video
          ref={video2Ref}
          className="h-full w-auto pointer-events-none"
          loop
          muted
          playsInline
        >
          <source src={`/overwater/optimized_videos/optimized_${pair.comparison}.mp4`} type="video/mp4" />
        </video>
        
        {/* Original video with clip path */}
        <video
          ref={video1Ref}
          className="absolute top-0 left-0 h-full w-auto pointer-events-none"
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
        
        {/* White divider line */}
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

  const handleMouseMove = useCallback((e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSplitPositions(prev => ({
      ...prev,
      [index]: x
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const pairs = React.useMemo(() => [
    { original: '0', comparison: '0_good', label: 'Comparison Set 1' },
    { original: '1', comparison: '1_good', label: 'Comparison Set 2' },
    { original: '2', comparison: '2_good', label: 'Comparison Set 3' },
    // { original: '3', comparison: '3_good', label: 'Comparison Set 4' },
  ], []);

  return (
    <div className="p-4 w-full">
      <h1 className='justify-center text-white text-center font-serif text-3xl pb-4'>Some Examples</h1>
      <div className="justify-center gap-8">
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