"use client";
// Stories of Impact Section Component with YouTube Support
import { useState, useRef, useEffect } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";

const StoriesOfImpact = ({ storiesOfImpact }) => {
  const [playingVideos, setPlayingVideos] = useState({});

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const toggleVideo = (storyId, videoId) => {
    if (playingVideos[storyId]) {
      // If video is playing, stop it by resetting the state
      setPlayingVideos((prev) => ({ ...prev, [storyId]: false }));
    } else {
      // Pause all other videos first
      setPlayingVideos({});
      // Play the selected video
      setPlayingVideos((prev) => ({ ...prev, [storyId]: true }));
    }
  };

  const openYouTubeVideo = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-white rounded-xl md:border border-gray-100 p-0 sm:p-8 mb-8">
      <h2 className="text-3xl mb-6 font-polysans font-medium">
        Stories of Impact
      </h2>

      {storiesOfImpact && storiesOfImpact.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storiesOfImpact.map((story, index) => {
            const videoId = getYouTubeVideoId(story.video);
            const storyKey = story._id || index;

            return (
              <div
                key={storyKey}
                className="rounded-lg overflow-hidden border border-gray-200"
              >
                {/* Video Container */}
                <div className="relative bg-black aspect-[9/16] w-full group">
                  {videoId ? (
                    <>
                      {playingVideos[storyKey] ? (
                        // YouTube Embed Player
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={story.title}
                        ></iframe>
                      ) : (
                        // YouTube Thumbnail with Play Button
                        <>
                          <img
                            src={getYouTubeThumbnail(videoId)}
                            alt={story.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to medium quality thumbnail if maxres fails
                              e.target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                            }}
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200">
                            <button
                              onClick={() => toggleVideo(storyKey, videoId)}
                              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                              aria-label="Play video"
                            >
                              <Play className="w-6 h-6 text-white ml-1" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* Control Buttons */}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {playingVideos[storyKey] && (
                          <button
                            onClick={() => toggleVideo(storyKey, videoId)}
                            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                            aria-label="Close video"
                          >
                            <Pause className="w-4 h-4 text-gray-700" />
                          </button>
                        )}

                        <button
                          onClick={() => openYouTubeVideo(story.video)}
                          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                          aria-label="Open in YouTube"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </>
                  ) : (
                    // Fallback for invalid YouTube URLs
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">
                          Invalid video URL
                        </p>
                      </div>
                    </div>
                  )}
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
            );
          })}
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
