import React from 'react';
import { Flame, MessageCircle, User, Heart } from 'lucide-react';
import { Avatar } from './Avatar';

interface BottomNavProps {
  activeTab: 'discover' | 'likes' | 'matches' | 'profile';
  onChange: (tab: 'discover' | 'likes' | 'matches' | 'profile') => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'discover', icon: Flame, label: 'Discover' },
    { id: 'likes', icon: Heart, label: 'Likes' },
    { id: 'matches', icon: MessageCircle, label: 'Matches' },
    { id: 'profile', icon: User, label: 'Profile' }
  ] as const;

  return (
    <div className="bg-white border-t border-gray-100 pb-safe pt-2 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] shrink-0 w-full">
      <div className="max-w-md mx-auto px-6 flex justify-around items-center">
        {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center p-2 transition-colors ${
              isActive ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`relative p-2 rounded-full transition-all ${isActive && tab.id !== 'profile' ? 'bg-rose-50' : 'bg-transparent'}`}>
              {tab.id === 'profile' ? (
                <Avatar 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfbf&mouth=smile&eyes=happy&clothing=blazerAndShirt" 
                  alt="Profile" 
                  className={`w-6 h-6 ${isActive ? 'ring-2 ring-rose-500 ring-offset-2' : ''}`} 
                />
              ) : (
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              )}
              {tab.id === 'matches' && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
              )}
            </div>
            <span className={`text-[10px] font-medium mt-1 ${isActive ? 'text-rose-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
