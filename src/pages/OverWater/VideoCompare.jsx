import React from 'react';
import ComparisonSlider from '../../components/VideoCompare/ComparisonSlider';

const VideoCompare = () => {
  const comparisons = [
    {
      id: 1,
      title: "Coral Reef Scene",
      beforeSrc: "/overwater/A2.mp4",
      afterSrc: "/overwater/A2_FINALP2P_latest_processed.mp4"
    },
    {
      id: 2,
      title: "Deep Sea Environment",
      beforeSrc: "/overwater/yt8bad.mp4",
      afterSrc: "/overwater/yt8bad_FINALP2p_latest_processed.mp4"
    },
    {
      id: 3,
      title: "Underwater Wildlife",
      beforeSrc: "/overwater/zhong1raw.mp4",
      afterSrc: "/overwater/zhong1raw_FINALP2P_latest_processed.mp4"
    }
  ];

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Video Comparison</h2>
        
        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {comparisons.map(comparison => (
            <ComparisonSlider
              key={comparison.id}
              title={comparison.title}
              beforeSrc={comparison.beforeSrc}
              afterSrc={comparison.afterSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCompare;