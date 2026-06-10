import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, User, Heart, ThumbsUp, ThumbsDown, 
  MessageCircle, Share2, Plus, Music, Play, Home, 
  Inbox, ChevronUp, ChevronDown
} from 'lucide-react';

const VIDEOS = [
  {
    id: 1,
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=800",
    author: "@neon_creator",
    isPro: true,
    description: "This is a great video showcasing awesome sounds! Completely custom dark theme with rounded corners everywhere.",
    tags: ["#shorts", "#fyp", "#awesome_ui"],
    music: "Awesome Sounds - Original Audio Track • Custom Vibes",
    likes: "124.1K",
    comments: "4,092",
    thumbsUp: "89K"
  },
  {
    id: 2,
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800",
    author: "@digital_art",
    isPro: false,
    description: "Exploring the new digital landscape. Loving the vibrant colors and dark contrast.",
    tags: ["#digital", "#art", "#creative"],
    music: "Chill Synthwave - Creator Beats",
    likes: "89K",
    comments: "2,104",
    thumbsUp: "45K"
  },
  {
    id: 3,
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    poster: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800",
    author: "@tech_guru",
    isPro: true,
    description: "Look at this amazing setup. The orange highlights are popping today!",
    tags: ["#tech", "#setup", "#orange"],
    music: "Lo-Fi Beats to Code To - ChilledCow",
    likes: "256K",
    comments: "8,992",
    thumbsUp: "120K"
  }
];

function VideoItem({ video, isActive }: { key?: number | string, video: typeof VIDEOS[0], isActive: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const [isThumbsDown, setIsThumbsDown] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      if (videoRef.current) {
        setIsPlaying(true);
        // Add a slight delay to allow the scroll to settle before playing
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
        }
      }
    } else {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="w-full h-full snap-start snap-always shrink-0 relative bg-black flex items-center justify-center overflow-hidden group/video">
      <video
        ref={videoRef}
        src={video.url}
        poster={video.poster}
        className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
        playsInline
        loop
        muted
        onClick={togglePlay}
      />
      
      {/* Center Play Button Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 transition-all duration-300 pointer-events-none"
        >
          <div className="bg-black/60 p-5 rounded-full text-white/90 shadow-[0_0_30px_rgba(237,57,21,0.4)] pointer-events-auto cursor-pointer" onClick={togglePlay}>
            <Play size={40} className="ml-1 text-primary-light" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Up/Down Video Navigation Arrows (Desktop / Overlay) */}
      <div className="absolute right-3 top-1/3 flex-col items-center gap-4 z-20 pointer-events-none hidden md:group-hover/video:flex opacity-60 hover:opacity-100 transition-opacity">
        <div className="bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10 pointer-events-auto cursor-pointer hover:bg-black/80 hover:text-primary transition-colors hover:scale-110">
          <ChevronUp size={24} strokeWidth={2.5} />
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10 pointer-events-auto cursor-pointer hover:bg-black/80 hover:text-primary transition-colors hover:scale-110">
          <ChevronDown size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Right Side Action Bar */}
      <div className="absolute right-2 sm:right-3 bottom-6 sm:bottom-8 flex flex-col items-center gap-5 z-20">
        {/* Profile & Follow */}
        <div className="relative mb-2 shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-800 rounded-full border-[2px] border-primary-light overflow-hidden shadow-[0_0_10px_rgba(237,57,21,0.5)] cursor-pointer">
            <img src={`https://i.pravatar.cc/150?u=${video.id}`} alt="Profile" className="w-full h-full object-cover"/>
          </div>
          <button 
            onClick={() => setIsFollowing(!isFollowing)} 
            className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full p-[3px] transition-all duration-300 shadow-md ${
              isFollowing ? 'bg-green-500 text-white translate-y-2 opacity-0 pointer-events-none' : 'bg-primary text-white hover:scale-110 cursor-pointer'
            }`}
          >
            <Plus size={14} strokeWidth={3.5} />
          </button>
        </div>

        {/* Heart / Like */}
        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center group focus:outline-none cursor-pointer">
          <div className="p-2 sm:p-2.5 rounded-full bg-black/30 backdrop-blur-md group-hover:bg-primary/20 transition-all">
            <Heart size={26} fill={isLiked ? "var(--color-primary)" : "transparent"} stroke={isLiked ? "var(--color-primary)" : "currentColor"} className={`transition-transform duration-300 ${isLiked ? 'scale-110' : 'scale-100 group-hover:scale-110'}`} />
          </div>
          <span className="text-[11px] sm:text-[12px] mt-1 font-bold tracking-wide drop-shadow-md">
            {isLiked ? '124.2K' : video.likes}
          </span>
        </button>

        {/* Thumbs Up / Down Group */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center bg-black/30 backdrop-blur-md rounded-[2rem] py-1.5 px-1 sm:py-2 sm:px-1.5 border border-white/10 shadow-lg">
            <button 
              onClick={() => { setIsThumbsUp(!isThumbsUp); setIsThumbsDown(false); }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors focus:outline-none cursor-pointer ${isThumbsUp ? 'bg-primary/20 text-primary-light' : 'hover:bg-white/20'}`}
            >
              <ThumbsUp size={20} fill={isThumbsUp ? "currentColor" : "transparent"} />
            </button>
            <div className="w-5 h-[1px] bg-white/20 my-0.5"></div>
            <button 
              onClick={() => { setIsThumbsDown(!isThumbsDown); setIsThumbsUp(false); }}
              className={`p-1.5 sm:p-2 rounded-full transition-colors focus:outline-none cursor-pointer ${isThumbsDown ? 'bg-gray-500/40 text-gray-400' : 'hover:bg-white/20'}`}
            >
              <ThumbsDown size={20} fill={isThumbsDown ? "currentColor" : "transparent"} />
            </button>
          </div>
        </div>

        {/* Comments */}
        <button className="flex flex-col items-center group focus:outline-none cursor-pointer">
          <div className="p-2 sm:p-2.5 rounded-full bg-black/30 backdrop-blur-md group-hover:bg-white/20 transition-all">
            <MessageCircle size={26} className="transition-transform group-hover:-scale-x-100 duration-300" />
          </div>
          <span className="text-[11px] sm:text-[12px] mt-1 font-bold tracking-wide drop-shadow-md">{video.comments}</span>
        </button>
        
        {/* Share */}
        <button className="flex flex-col items-center group focus:outline-none cursor-pointer">
          <div className="p-2 sm:p-2.5 rounded-full bg-black/30 backdrop-blur-md group-hover:bg-white/20 transition-all">
            <Share2 size={24} className="transition-transform group-hover:rotate-12 duration-300" />
          </div>
          <span className="text-[11px] sm:text-[12px] mt-1 font-bold tracking-wide drop-shadow-md hidden sm:block">Share</span>
        </button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute left-3 sm:left-4 bottom-5 sm:bottom-6 right-16 sm:right-20 z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5 text-white drop-shadow-lg">
          <h3 className="font-bold text-[15px] sm:text-[17px] tracking-wide pointer-events-auto cursor-pointer hover:underline">{video.author}</h3>
          {video.isPro && (
            <span className="text-primary bg-primary/20 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider backdrop-blur-sm border border-primary/30">Pro</span>
          )}
        </div>
        
        {/* Rich Description Overlay (Rounded Corners) */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-white/10 mb-2.5 sm:mb-3 shadow-[0_4px_15px_rgba(0,0,0,0.4)] pointer-events-auto cursor-auto max-w-sm">
          <p className="text-[12px] sm:text-[13px] leading-relaxed text-gray-100 font-medium tracking-wide line-clamp-3 sm:line-clamp-none">
            {video.description}
            <br />
            <span className="text-primary font-bold block mt-0.5 sm:mt-1 hover:text-primary-light cursor-pointer transition-colors">
              {video.tags.join(" ")}
            </span>
          </p>
        </div>
        
        {/* Scrolling Audio Track */}
        <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-200">
          <div className="bg-black/50 p-1 sm:p-1.5 rounded-full shadow-[0_0_10px_rgba(237,57,21,0.3)] shrink-0">
            <Music size={14} className={`${isPlaying ? 'animate-pulse' : ''} text-primary-light`} />
          </div>
          <div className="w-36 sm:w-48 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,white_80%,transparent)] pointer-events-auto cursor-pointer hover:text-white transition-colors">
            <p className={`inline-block text-[12px] sm:text-[13px] font-semibold tracking-wide ${isPlaying ? 'animate-[scroll_5s_linear_infinite]' : ''}`}>
              {video.music}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const clientHeight = containerRef.current.clientHeight;
      // Calculate which video is most visible
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="flex justify-center bg-black min-h-screen font-sans text-white select-none">
      {/* Mobile constraint container for desktop view */}
      <div className="w-full max-w-md bg-[#121212] relative overflow-hidden h-[100dvh] flex flex-col shadow-[0_0_50px_rgba(237,57,21,0.05)]">
        
        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 sm:p-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
          <button className="text-white hover:text-primary transition-colors focus:outline-none pointer-events-auto">
            <Menu size={24} className="sm:w-[26px] sm:h-[26px]" />
          </button>
          
          <div className="flex gap-4 font-semibold text-sm sm:text-base tracking-wide pointer-events-auto">
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors drop-shadow-md">Following</span>
            <span className="text-white relative drop-shadow-md cursor-pointer">
              For You
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(237,57,21,0.8)]"></span>
            </span>
          </div>

          <button className="flex items-center gap-2 text-white hover:text-primary transition-colors focus:outline-none pointer-events-auto">
            <span className="text-[11px] sm:text-xs font-bold hidden sm:inline-block tracking-wider drop-shadow-md">SIGN IN</span>
            <User size={24} className="sm:w-[26px] sm:h-[26px]" />
          </button>
        </div>

        {/* Video Feed Container */}
        <div className="relative flex-1 bg-[#1a1a1a] rounded-[1.5rem] sm:rounded-[2rem] mx-1 sm:mx-2 mt-16 sm:mt-20 mb-[4rem] sm:mb-[4.5rem] overflow-hidden shadow-[0_0_20px_rgba(237,57,21,0.15)] border border-white/5">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
          >
            {VIDEOS.map((video, index) => (
              <VideoItem key={video.id} video={video} isActive={index === activeIndex} />
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="h-[4rem] sm:h-[4.5rem] bg-[#121212] flex justify-around items-center absolute bottom-0 w-full z-30 px-1 sm:px-2 pb-safe border-t border-[#1a1a1a]">
          <button className="flex flex-col items-center text-white p-2 focus:outline-none cursor-pointer">
            <Home size={24} strokeWidth={2.5} className="sm:w-[26px] sm:h-[26px]" />
            <span className="text-[9px] sm:text-[10px] mt-1 font-bold text-white tracking-wider">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-2 focus:outline-none cursor-pointer">
            <Search size={24} strokeWidth={2.5} className="sm:w-[26px] sm:h-[26px]" />
            <span className="text-[9px] sm:text-[10px] mt-1 font-semibold tracking-wider">Discover</span>
          </button>
          
          {/* Upload Plus Sign */}
          <button className="flex items-center justify-center bg-gradient-to-tr from-primary-dark via-primary to-primary-light w-12 h-8 sm:w-14 sm:h-9 rounded-xl text-white group shadow-[0_0_15px_rgba(237,57,21,0.5)] hover:scale-105 transition-all duration-300 active:scale-95 focus:outline-none relative cursor-pointer mx-1 sm:mx-0">
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Plus size={20} strokeWidth={3.5} className="sm:w-[22px] sm:h-[22px] group-hover:rotate-90 transition-transform duration-300 drop-shadow-md z-10" />
          </button>
          
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-2 focus:outline-none relative cursor-pointer">
            <div className="relative">
              <Inbox size={24} strokeWidth={2.5} className="sm:w-[26px] sm:h-[26px]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#121212]"></span>
            </div>
            <span className="text-[9px] sm:text-[10px] mt-1 font-semibold tracking-wider">Inbox</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-2 focus:outline-none cursor-pointer">
            <User size={24} strokeWidth={2.5} className="sm:w-[26px] sm:h-[26px]" />
            <span className="text-[9px] sm:text-[10px] mt-1 font-semibold tracking-wider">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
