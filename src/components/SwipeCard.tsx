import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Heart, X, Info, MapPin, Briefcase, Music, Tv, MessageCircle, ShieldCheck, Sparkles, Flame, Target, Mountain, Coffee, Camera, ChefHat, Film, Plane, Palette, Mic, ShoppingBag, Fish, Activity, Leaf, ShoppingBasket, Building, Star, BookOpen, PenTool, Headphones, Pizza, TrendingUp, Calendar, Wine, Hash } from 'lucide-react';
import { Profile } from '../data';

const getInterestIcon = (interest: string) => {
  const i = interest.toLowerCase();
  if (i.includes('hik')) return <Mountain size={14} />;
  if (i.includes('coffee') || i.includes('matcha')) return <Coffee size={14} />;
  if (i.includes('photo')) return <Camera size={14} />;
  if (i.includes('cook')) return <ChefHat size={14} />;
  if (i.includes('movie')) return <Film size={14} />;
  if (i.includes('travel')) return <Plane size={14} />;
  if (i.includes('art')) return <Palette size={14} />;
  if (i.includes('music') || i.includes('danc')) return <Mic size={14} />;
  if (i.includes('thrift')) return <ShoppingBag size={14} />;
  if (i.includes('sushi')) return <Fish size={14} />;
  if (i.includes('run') || i.includes('yoga')) return <Activity size={14} />;
  if (i.includes('plant')) return <Leaf size={14} />;
  if (i.includes('market')) return <ShoppingBasket size={14} />;
  if (i.includes('arch')) return <Building size={14} />;
  if (i.includes('astro')) return <Star size={14} />;
  if (i.includes('read')) return <BookOpen size={14} />;
  if (i.includes('design')) return <PenTool size={14} />;
  if (i.includes('podcast')) return <Headphones size={14} />;
  if (i.includes('pizza')) return <Pizza size={14} />;
  if (i.includes('financ')) return <TrendingUp size={14} />;
  if (i.includes('event')) return <Calendar size={14} />;
  if (i.includes('wine')) return <Wine size={14} />;
  if (i.includes('urban')) return <MapPin size={14} />;
  return <Hash size={14} />;
};

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  active: boolean;
  direction?: 'left' | 'right' | 'up' | null;
}

export function SwipeCard({ profile, onSwipe, active, direction }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % profile.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + profile.images.length) % profile.images.length);
  };

  const getBadgeIcon = (badge: string) => {
    switch(badge) {
      case 'Verified': return <ShieldCheck size={14} className="text-blue-400" />;
      case 'Top Pick': return <Sparkles size={14} className="text-yellow-400" />;
      case 'Popular': return <Flame size={14} className="text-orange-400" />;
      case 'New Here': return <Sparkles size={14} className="text-green-400" />;
      default: return null;
    }
  };

  if (!active) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full rounded-3xl shadow-xl overflow-hidden bg-white"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      custom={direction}
      exit={(dir) => ({ 
        x: dir === 'left' ? -500 : dir === 'right' ? 500 : 0,
        y: dir === 'up' ? -500 : 0,
        opacity: 0,
        rotate: dir === 'left' ? -20 : dir === 'right' ? 20 : 0,
        transition: { duration: 0.3 }
      })}
    >
      {/* Image Gallery */}
      <div className="relative w-full h-full bg-gray-900" onClick={() => setShowDetails(!showDetails)}>
        <img
          src={profile.images[currentImageIndex]}
          alt={profile.name}
          className="w-full h-full object-cover"
          draggable="false"
          referrerPolicy="no-referrer"
        />

        {/* Image Navigation Indicators */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 px-4 z-10">
          {profile.images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full bg-white/50 transition-colors ${
                idx === currentImageIndex ? 'bg-white' : ''
              }`}
            />
          ))}
        </div>

        {/* Tap zones for image navigation */}
        <div className="absolute inset-y-0 left-0 w-1/2 z-10" onClick={prevImage} />
        <div className="absolute inset-y-0 right-0 w-1/2 z-10" onClick={nextImage} />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

        {/* Like/Nope Stamps */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-16 left-8 border-4 border-green-500 text-green-500 rounded-lg px-4 py-1 text-4xl font-black uppercase tracking-wider transform -rotate-12 z-20 pointer-events-none"
        >
          Like
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-16 right-8 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-4xl font-black uppercase tracking-wider transform rotate-12 z-20 pointer-events-none"
        >
          Reject
        </motion.div>

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
          {profile.badges && profile.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.badges.map(badge => (
                <div key={badge} className="flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-bold text-white uppercase tracking-wider border border-white/10 shadow-sm">
                  {getBadgeIcon(badge)}
                  {badge}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center gap-1 text-white/80 mt-1 text-sm">
                <MapPin size={14} />
                <span>{profile.distance}</span>
              </div>
            </div>
            <button 
              className="bg-white/20 backdrop-blur-md p-2 rounded-full pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
            >
              <Info size={20} />
            </button>
          </div>

          <motion.div 
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Briefcase size={16} />
                <span>{profile.job}</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.interests.map((interest) => (
                  <div 
                    key={interest} 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium backdrop-blur-md transition-colors shadow-sm text-white"
                  >
                    <span className="text-rose-300 flex items-center justify-center">
                      {getInterestIcon(interest)}
                    </span>
                    {interest}
                  </div>
                ))}
              </div>

              {/* Priorities */}
              {profile.priorities && profile.priorities.length > 0 && (
                <div className="pt-4 space-y-2 border-t border-white/20 mt-4">
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-2">Priorities</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.priorities.map(priority => (
                      <div key={priority} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500/20 to-orange-400/20 border border-rose-500/30 rounded-xl text-sm font-medium text-white shadow-sm">
                        <Target size={14} className="text-rose-400" />
                        {priority}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Dynamic Features */}
              <div className="pt-4 space-y-3 border-t border-white/20 mt-4">
                {profile.status && (
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                    <div className="bg-white/20 p-1.5 rounded-full shrink-0">
                      <MessageCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-0.5">On my mind</p>
                      <p className="text-sm text-white font-medium">{profile.status}</p>
                    </div>
                  </div>
                )}
                
                {profile.recentlyListening && (
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                    <div className="bg-white/20 p-1.5 rounded-full shrink-0">
                      <Music size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-0.5">Recently Listening</p>
                      <p className="text-sm text-white font-medium">{profile.recentlyListening}</p>
                    </div>
                  </div>
                )}

                {profile.recentlyWatching && (
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
                    <div className="bg-white/20 p-1.5 rounded-full shrink-0">
                      <Tv size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-0.5">Recently Watching</p>
                      <p className="text-sm text-white font-medium">{profile.recentlyWatching}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
