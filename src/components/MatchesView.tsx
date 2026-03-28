import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { matches, profiles, Match } from '../data';
import { Avatar } from './Avatar';
import { ChatView } from './ChatView';

export function MatchesView() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const matchedProfiles = matches.map(m => ({
    ...m,
    profile: profiles.find(p => p.id === m.profileId)!
  }));

  const newMatches = matchedProfiles.filter(m => !m.lastMessage);
  const messages = matchedProfiles.filter(m => m.lastMessage);

  return (
    <div className="flex-1 bg-white h-full overflow-hidden relative">
      <AnimatePresence>
        {selectedMatch && (
          <ChatView 
            key="chat-view"
            match={selectedMatch} 
            profile={profiles.find(p => p.id === selectedMatch.profileId)!}
            onClose={() => setSelectedMatch(null)} 
          />
        )}
      </AnimatePresence>

      <div className="h-full overflow-y-auto pb-4">
        <div className="px-6 pt-12 pb-4 sticky top-0 bg-white/80 backdrop-blur-xl z-10 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Messages</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal size={24} className="text-gray-600" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search matches..."
            className="w-full bg-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
          />
        </div>
      </div>

      {newMatches.length > 0 && (
        <div className="px-6 py-6">
          <h2 className="text-sm font-bold text-rose-500 uppercase tracking-wider mb-4">New Matches</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
            {newMatches.map(match => (
              <div 
                key={match.id} 
                className="flex flex-col items-center gap-2 snap-start shrink-0 cursor-pointer group"
                onClick={() => setSelectedMatch(match)}
              >
                <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-rose-400 to-orange-400 group-hover:scale-105 transition-transform">
                  <Avatar
                    src={match.profile.images[0]}
                    alt={match.profile.name}
                    className="w-full h-full border-2 border-white"
                  />
                  {match.unread && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">{match.profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 py-2">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Messages</h2>
        <div className="space-y-6">
          {messages.map(match => (
            <div 
              key={match.id} 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="relative w-16 h-16 shrink-0">
                <Avatar
                  src={match.profile.images[0]}
                  alt={match.profile.name}
                  className="w-full h-full"
                />
                {match.unread && (
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 border-b border-gray-100 pb-6 group-last:border-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${match.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {match.profile.name}
                  </h3>
                  <span className="text-xs font-medium text-gray-400 shrink-0 ml-2">{match.time}</span>
                </div>
                <p className={`text-sm truncate ${match.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {match.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
