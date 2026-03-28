import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import { SwipeCard } from './components/SwipeCard';
import { MatchesView } from './components/MatchesView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { LikedQueueView } from './components/LikedQueueView';
import { profiles, Profile, matches } from './data';
import { Heart, X, Sparkles, User, Star, RotateCcw, Zap, MessageCircle } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'discover' | 'likes' | 'matches' | 'profile'>('discover');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [matchPopup, setMatchPopup] = useState<Profile | null>(null);

  const [userProfile, setUserProfile] = useState({
    name: 'Sarah',
    age: 26,
    job: 'Graphic Designer',
    bio: 'Coffee addict, dog lover, and weekend hiker. Looking for someone to explore the city with.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfbf&mouth=smile&eyes=happy&clothing=blazerAndShirt',
    priorities: ['Long-term relationship', 'Career focused'],
    status: 'Excited for the weekend! 🎉'
  });

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (dir: 'left' | 'right' | 'up') => {
    if ((dir === 'right' || dir === 'up') && currentProfile) {
      setLikedProfiles(prev => {
        if (!prev.find(p => p.id === currentProfile.id)) {
          return [...prev, currentProfile];
        }
        return prev;
      });
      
      if (Math.random() > 0.5 || dir === 'up') {
        setMatchPopup(currentProfile);
      }
    }
    setDirection(dir);
    
    // Unmount immediately to trigger exit animation
    setCurrentIndex((prev) => prev + 1);
  };

  const closeMatchPopup = () => {
    setMatchPopup(null);
    setDirection(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-[100dvh] w-full bg-gray-50 flex justify-center overflow-hidden font-sans text-gray-900">
        <div className="w-full h-full bg-white relative shadow-2xl overflow-hidden flex flex-col">
          <LoginView onLogin={(sparkId) => {
            setUserProfile(prev => ({
              ...prev,
              name: sparkId,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sparkId}&backgroundColor=ffdfbf&mouth=smile&eyes=happy&clothing=blazerAndShirt`
            }));
            setIsAuthenticated(true);
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full bg-gray-50 flex justify-center overflow-hidden font-sans text-gray-900">
      {/* Main Container */}
      <div className="w-full h-full bg-white relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header - Only show on Discover */}
        <AnimatePresence>
          {activeTab === 'discover' && (
            <motion.header 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="px-6 py-4 flex justify-between items-center z-10 bg-white/80 backdrop-blur-md absolute top-0 w-full"
            >
              <div className="flex items-center gap-2 text-rose-500 font-bold text-2xl tracking-tighter max-w-5xl mx-auto w-full px-4">
                <Sparkles size={28} className="text-rose-500" />
                Spark
              </div>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <div className="w-5 h-5 border-2 border-gray-600 rounded-full relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full" />
                </div>
              </button>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pt-20 pb-4 px-4 flex flex-col"
              >
                {/* Current User Profile Summary */}
                <div className="mb-4 shrink-0 max-w-md mx-auto w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src={userProfile.avatar} alt="Me" className="w-12 h-12 rounded-full border-2 border-rose-100 bg-rose-50" />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-bold text-gray-900 truncate">Hey, {userProfile.name}! 👋</h2>
                      {userProfile.status && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">"{userProfile.status}"</p>
                      )}
                      <div className="flex gap-1 mt-1.5 overflow-x-auto hide-scrollbar">
                        {userProfile.priorities.map(p => (
                          <span key={p} className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('profile')} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-rose-500 transition-colors shrink-0">
                      <User size={18} />
                    </button>
                  </div>
                  
                  <div className="flex gap-4 pt-3 border-t border-gray-50">
                    <div 
                      className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setActiveTab('likes')}
                    >
                      <span className="text-lg font-bold text-gray-900 leading-none">{likedProfiles.length}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Likes</span>
                    </div>
                    <div className="w-px bg-gray-100"></div>
                    <div 
                      className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setActiveTab('matches')}
                    >
                      <span className="text-lg font-bold text-gray-900 leading-none">{matches.length}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Connections</span>
                    </div>
                  </div>
                </div>

                <div className="relative flex-1 w-full max-w-md mx-auto">
                  {currentProfile ? (
                    <>
                      {/* Next Card (Background) */}
                      {profiles[currentIndex + 1] && (
                        <div className="absolute inset-0 w-full h-full rounded-3xl shadow-md overflow-hidden bg-gray-200 scale-95 origin-bottom opacity-50">
                          <img
                            src={profiles[currentIndex + 1].images[0]}
                            alt="Next profile"
                            className="w-full h-full object-cover blur-sm"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      {/* Current Card */}
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <SwipeCard
                          key={currentProfile.id}
                          profile={currentProfile}
                          onSwipe={handleSwipe}
                          active={true}
                          direction={direction}
                        />
                      </AnimatePresence>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6">
                      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                        <Sparkles size={40} className="text-rose-300" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all caught up!</h2>
                      <p className="text-gray-500 mb-8">Check back later for more potential matches in your area.</p>
                      <button 
                        onClick={() => setCurrentIndex(0)}
                        className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
                      >
                        Start Over
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {currentProfile && (
                  <div className="flex justify-center items-center gap-4 mt-6 mb-2 shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => {
                          if (currentIndex > 0) {
                            setCurrentIndex(prev => prev - 1);
                            setDirection(null);
                          }
                        }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-yellow-500 hover:scale-110 hover:bg-yellow-50 transition-all"
                      >
                        <RotateCcw size={24} strokeWidth={3} />
                      </button>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rewind</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleSwipe('left')}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-rose-500 hover:scale-110 hover:bg-rose-50 transition-all"
                      >
                        <X size={32} strokeWidth={3} />
                      </button>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reject</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleSwipe('up')}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-blue-500 hover:scale-110 hover:bg-blue-50 transition-all"
                      >
                        <Star size={24} strokeWidth={3} fill="currentColor" />
                      </button>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Super</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleSwipe('right')}
                        className="w-16 h-16 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(244,63,94,0.3)] text-white hover:scale-110 hover:shadow-[0_8px_30px_rgb(244,63,94,0.5)] transition-all"
                      >
                        <Heart size={32} strokeWidth={3} fill="currentColor" />
                      </button>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Like</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-purple-500 hover:scale-110 hover:bg-purple-50 transition-all">
                        <Zap size={24} strokeWidth={3} fill="currentColor" />
                      </button>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Boost</span>
                    </div>
                  </div>
                )}

                {/* Other Suggestions Row */}
                <div className="mt-2 shrink-0 max-w-md mx-auto w-full">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <h2 className="text-sm font-bold text-gray-900">Other Suggestions</h2>
                    <button className="text-xs font-bold text-rose-500">See All</button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar">
                    {profiles.slice(3, 8).map(p => (
                      <div key={p.id} className="relative w-16 h-24 rounded-2xl overflow-hidden shrink-0 snap-start shadow-sm border border-gray-100 cursor-pointer hover:scale-105 transition-transform">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 pt-4">
                          <p className="text-white text-[10px] font-bold truncate">{p.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'likes' && (
              <motion.div
                key="likes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 w-full max-w-2xl mx-auto"
              >
                <LikedQueueView likedProfiles={likedProfiles} />
              </motion.div>
            )}

            {activeTab === 'matches' && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 w-full max-w-2xl mx-auto"
              >
                <MatchesView />
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 w-full max-w-2xl mx-auto"
              >
                <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Match Popup Overlay */}
          <AnimatePresence>
            {matchPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.1 }}
                  className="text-center w-full max-w-sm"
                >
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-8 italic tracking-tighter transform -rotate-2">
                    It's a Match!
                  </h2>
                  
                  <div className="flex justify-center items-center gap-4 mb-10">
                    <motion.div 
                      initial={{ x: -50, opacity: 0, rotate: -10 }}
                      animate={{ x: 0, opacity: 1, rotate: -5 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-rose-100"
                    >
                      <img src={userProfile.avatar} alt="You" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ x: 50, opacity: 0, rotate: 10 }}
                      animate={{ x: 0, opacity: 1, rotate: 5 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-rose-100"
                    >
                      <img src={matchPopup.images[0]} alt={matchPopup.name} className="w-full h-full object-cover" />
                    </motion.div>
                  </div>

                  <p className="text-white text-lg font-medium mb-8">
                    You and <span className="font-bold">{matchPopup.name}</span> have liked each other.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        closeMatchPopup();
                        setActiveTab('matches');
                      }}
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} />
                      Send a Message
                    </button>
                    <button 
                      onClick={closeMatchPopup}
                      className="w-full bg-white/10 text-white font-bold py-4 rounded-full hover:bg-white/20 transition-colors border border-white/20"
                    >
                      Keep Swiping
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
