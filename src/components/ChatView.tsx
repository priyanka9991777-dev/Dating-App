import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Send, Phone, Video, MoreVertical, Sparkles } from 'lucide-react';
import { Match, Profile, Message } from '../data';
import { Avatar } from './Avatar';

interface ChatViewProps {
  match: Match;
  profile: Profile;
  onClose: () => void;
}

export function ChatView({ match, profile, onClose }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(match.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage.trim(),
      timestamp: 'Just now'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleAiSuggest = () => {
    setIsGenerating(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let suggestion = "";
      
      if (messages.length === 0) {
        // Icebreakers
        const interests = profile.interests && profile.interests.length > 0 ? profile.interests : ['having fun'];
        const randomInterest = interests[Math.floor(Math.random() * interests.length)];
        const starters = [
          `I see you're into ${randomInterest.toLowerCase()}! What's your favorite thing about it? ✨`,
          `Your profile caught my eye! How's your day treating you so far? 😊`,
          `A fellow ${randomInterest.toLowerCase()} fan! We already have something in common.`,
          `Working as a ${profile.job.toLowerCase()} sounds super interesting. What's the best part of your job?`
        ];
        suggestion = starters[Math.floor(Math.random() * starters.length)];
      } else {
        const lastMsg = messages[messages.length - 1];
        const isMine = lastMsg.senderId === 'me';
        
        if (isMine) {
          // Follow-ups if they haven't replied
          const followUps = [
            "Just thought I'd check in! Hope you're having a great day. 🌟",
            "No pressure, but I'd still love to hear your thoughts! 😊",
            "Anyway, how's the rest of your week looking?"
          ];
          suggestion = followUps[Math.floor(Math.random() * followUps.length)];
        } else {
          // Replies to their message
          const replies = [
            "That's actually really fascinating! Tell me more? 🤔",
            "Haha, I totally agree with you on that! 😂",
            "Oh wow, I never thought about it that way. What else do you like to do?",
            "That's awesome. I'd love to hear more about that. ✨",
            "Love that energy! 🌟 What's your next big adventure?"
          ];
          suggestion = replies[Math.floor(Math.random() * replies.length)];
        }
      }
      
      setNewMessage(suggestion);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <Avatar src={profile.images[0]} alt={profile.name} className="w-10 h-10" />
            <div>
              <h2 className="font-bold text-gray-900">{profile.name}</h2>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <Video size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <div className="text-center text-xs text-gray-400 font-medium my-4">
          You matched with {profile.name} today
        </div>
        
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-4 py-2.5 rounded-2xl ${
                    isMe 
                      ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-br-sm shadow-sm shadow-rose-100' 
                      : 'bg-white text-gray-900 border border-gray-100 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAiSuggest}
            disabled={isGenerating}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              isGenerating 
                ? 'bg-purple-100 text-purple-400 animate-pulse' 
                : 'bg-purple-50 text-purple-500 hover:bg-purple-100 hover:scale-105 shadow-sm'
            }`}
            title="AI Wingman Suggestion"
          >
            <Sparkles size={18} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim() 
                ? 'bg-rose-500 text-white shadow-md shadow-rose-200 hover:scale-105' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send size={18} className={newMessage.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
