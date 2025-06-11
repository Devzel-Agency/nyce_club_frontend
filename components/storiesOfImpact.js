"use client";
// Clean Stories of Impact Section Component
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { BACKEND_URL } from "@/apis/variables";

const StoriesOfImpact = ({ storiesOfImpact }) => {
  const videoRefs = useRef({});
  const [playingVideos, setPlayingVideos] = useState({});
  const [loadingVideos, setLoadingVideos] = useState({});

  // Clean up video references when component unmounts
  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  const toggleVideo = async (storyId) => {
    const video = videoRefs.current[storyId];
    if (!video) return;

    try {
      setLoadingVideos((prev) => ({ ...prev, [storyId]: true }));

      if (playingVideos[storyId]) {
        // Pause the current video
        video.pause();
        setPlayingVideos((prev) => ({ ...prev, [storyId]: false }));
      } else {
        // Pause all other videos first
        Object.entries(videoRefs.current).forEach(([id, videoElement]) => {
          if (id !== storyId && videoElement && !videoElement.paused) {
            videoElement.pause();
            setPlayingVideos((prev) => ({ ...prev, [id]: false }));
          }
        });

        // Play the selected video
        await video.play();
        setPlayingVideos((prev) => ({ ...prev, [storyId]: true }));
      }
    } catch (error) {
      console.error("Error controlling video playback:", error);
    } finally {
      setLoadingVideos((prev) => ({ ...prev, [storyId]: false }));
    }
  };

  const handleVideoEnd = (storyId) => {
    setPlayingVideos((prev) => ({ ...prev, [storyId]: false }));
  };

  const handleVideoError = (storyId, error) => {
    console.log(`Video error for story ${storyId}:`, error);
    setPlayingVideos((prev) => ({ ...prev, [storyId]: false }));
    setLoadingVideos((prev) => ({ ...prev, [storyId]: false }));
  };

  return (
    <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
      <h2 className="text-3xl mb-6 font-polysans font-medium">
        Stories of Impact
      </h2>

      {storiesOfImpact && storiesOfImpact.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storiesOfImpact.map((story, index) => (
            <div
              key={story._id || index}
              className="rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Video Container */}
              <div className="relative bg-black aspect-[9/16] w-full group">
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[story._id || index] = el;
                    }
                  }}
                  src={`${BACKEND_URL}/upload/${story.video}`}
                  className="w-full h-full object-cover"
                  onEnded={() => handleVideoEnd(story._id || index)}
                  onError={(e) => handleVideoError(story._id || index, e)}
                  preload="metadata"
                  playsInline
                  muted={false}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Simple Play/Pause Button */}
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => toggleVideo(story._id || index)}
                    disabled={loadingVideos[story._id || index]}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    aria-label={
                      playingVideos[story._id || index]
                        ? "Pause video"
                        : "Play video"
                    }
                  >
                    {loadingVideos[story._id || index] ? (
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : playingVideos[story._id || index] ? (
                      <Pause className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-4 bg-gray-50">
                <h3 className="text-lg font-polysans font-medium text-gray-900 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-700 text-sm font-overused-grotesk leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Play className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-600 font-overused-grotesk">
            No impact stories available at the moment.
          </p>
        </div>
      )}
    </section>
  );
};

export default StoriesOfImpact;
