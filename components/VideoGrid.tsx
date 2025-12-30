
import React from 'react';
import { ProductionVideo } from '../types';

interface VideoGridProps {
  videos: ProductionVideo[];
  onSelectVideo: (video: ProductionVideo) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onSelectVideo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="group relative flex flex-col cursor-pointer"
          onClick={() => onSelectVideo(video)}
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Numero de secuencia discreto */}
          <span className="absolute -top-4 -left-4 text-4xl font-black text-white/5 font-cinzel select-none group-hover:text-cyan-500/10 transition-colors">
            0{idx + 1}
          </span>

          <div className="relative aspect-video overflow-hidden rounded-sm glass-panel border border-white/10">
            <img
              src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
              onError={(e) => {
                const target = e.currentTarget;
                const src = target.src;
                if (src.includes('maxresdefault')) {
                  target.src = `https://img.youtube.com/vi/${video.youtubeId}/sddefault.jpg`;
                } else if (src.includes('sddefault')) {
                  target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                } else if (src.includes('hqdefault')) {
                  target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                }
              }}
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-6 border-l-2 border-transparent group-hover:border-cyan-500 transition-all pl-4">
            <p className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mb-2">
              {video.artist}
            </p>
            <h3 className="text-xl font-cinzel font-bold tracking-tight text-white group-hover:text-cyan-50 hover:underline decoration-cyan-500 underline-offset-8">
              {video.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
