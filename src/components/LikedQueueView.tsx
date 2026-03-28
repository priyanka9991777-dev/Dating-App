import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Profile, Match } from '../data';
import { ChatView } from './ChatView';

interface LikedQueueViewProps {
  likedProfiles: Profile[];
}

export function LikedQueueView({ likedProfiles }: LikedQueueViewProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Create a temporary match object for the chat view
  const tempMatch: Match | null = selectedProfile ? {
    id: `temp-${selectedProfile.id}`,
    profileId: selectedProfile.id,
    lastMessage: '',
    time: 'Just now',
    unread: false,
    messages: []
  } : null;

  return (
    <div className="flex-1 bg-white h-full overflow-hidden relative">
      <AnimatePresence>
        {selectedProfile && tempMatch && (
          <ChatView 
            key="chat-view"
            match={tempMatch} 
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)} 
          />
        )}
      </AnimatePresence>

      <div className="h-full overflow-y-auto pb-4">
        <div className="px-6 pt-12 pb-4 sticky top-0 bg-white/80 backdrop-blur-xl z-10 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Likes</h1>
        <p className="text-gray-500 mt-1">Profiles you've swiped right on</p>
      </div>
      
      <div className="p-6 grid grid-cols-2 gap-4">
        {likedProfiles.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Heart size={32} className="text-gray-300" />
            </div>
            <p className="font-medium text-gray-600">No likes yet</p>
            <p className="text-sm mt-1 text-center max-w-[200px]">
              Profiles you swipe right on will appear here in your queue.
            </p>
          </div>
        ) : (
          likedProfiles.map(profile => (
            <div 
              key={profile.id} 
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer shadow-sm border border-gray-100"
              onClick={() => setSelectedProfile(profile)}
            >
              <img 
                src={profile.images[0]} 
                alt={profile.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-12">
                <h3 className="text-white font-bold text-lg leading-tight">{profile.name}, {profile.age}</h3>
                <p className="text-white/80 text-xs mt-0.5 truncate">{profile.job}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Heart size={16} className="text-rose-500" fill="currentColor" />
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
