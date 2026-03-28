import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Edit3, Camera, Shield, Star, Zap, X, Bell, Lock, User, ChevronRight, LogOut, ChevronLeft } from 'lucide-react';
import { Avatar } from './Avatar';

export interface UserProfile {
  name: string;
  age: number;
  job: string;
  bio: string;
  avatar: string;
  priorities: string[];
  status?: string;
}

interface ProfileViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export function ProfileView({ userProfile, setUserProfile }: ProfileViewProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [settingsView, setSettingsView] = useState<'main' | 'notifications' | 'privacy' | 'subscription'>('main');
  
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailNotifications: false,
    newMatches: true,
    messages: true,
    showDistance: true,
    showAge: true,
    incognitoMode: false,
  });
  
  const [editForm, setEditForm] = useState({
    ...userProfile,
    prioritiesInput: userProfile.priorities.join(', ')
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    setUserProfile({
      name: editForm.name,
      age: editForm.age,
      job: editForm.job,
      bio: editForm.bio,
      avatar: editForm.avatar,
      priorities: editForm.prioritiesInput.split(',').map(s => s.trim()).filter(Boolean),
      status: editForm.status
    });
    setIsEditProfileOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setUserProfile(prev => ({ ...prev, avatar: newAvatar }));
        setEditForm(prev => ({ ...prev, avatar: newAvatar }));
      };
      reader.readAsDataURL(file);
    }
  };

  const Toggle = ({ checked, onChange, label, description }: { checked: boolean, onChange: (v: boolean) => void, label: string, description?: string }) => (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <div className="font-medium text-gray-900">{label}</div>
        {description && <div className="text-sm text-gray-500 mt-0.5">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-rose-500' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 h-full overflow-y-auto pb-4">
      <div className="bg-white rounded-b-[3rem] shadow-sm pb-8 relative z-10">
        <div className="flex justify-between items-center p-6 pt-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile</h1>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div 
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-rose-400 to-orange-400">
              <Avatar
                src={userProfile.avatar}
                alt="Profile"
                className="w-full h-full border-4 border-white"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
              <Camera size={16} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              capture="user"
              className="hidden"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-4">{userProfile.name}, {userProfile.age}</h2>
          <p className="text-gray-500 font-medium">{userProfile.job}</p>
          
          {userProfile.status && (
            <div className="mt-4 bg-rose-50 px-5 py-3 rounded-2xl border border-rose-100 shadow-sm w-full max-w-xs text-center">
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mb-1">What's on your mind?</p>
              <p className="text-gray-800 font-medium text-sm">"{userProfile.status}"</p>
            </div>
          )}
          
          <button 
            onClick={() => {
              setEditForm({
                ...userProfile,
                prioritiesInput: userProfile.priorities.join(', ')
              });
              setIsEditProfileOpen(true);
            }}
            className="mt-6 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-semibold transition-colors"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-rose-500 to-orange-400 rounded-3xl p-6 text-white shadow-lg shadow-rose-200 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Star size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">Spark Premium</h3>
            <p className="text-white/80 text-sm mt-1">See who likes you</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Zap size={24} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Boost</h3>
            <p className="text-gray-500 text-sm mt-1">Get more matches</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6">
          <div className="flex items-center gap-4 mb-6 cursor-pointer group">
            <div className="bg-blue-50 p-3 rounded-2xl group-hover:bg-blue-100 transition-colors">
              <Shield size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Safety Center</h3>
              <p className="text-sm text-gray-500">Guides, tools, and resources</p>
            </div>
          </div>
          <div className="h-px bg-gray-100 w-full mb-6" />
          <div 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="bg-gray-50 p-3 rounded-2xl group-hover:bg-gray-100 transition-colors">
              <Settings size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">App Settings</h3>
              <p className="text-sm text-gray-500">Notifications, privacy, account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsSettingsOpen(false); setTimeout(() => setSettingsView('main'), 300); }}
              className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 h-[85%] bg-gray-50 rounded-t-[2rem] z-50 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {settingsView !== 'main' && (
                    <button onClick={() => setSettingsView('main')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {settingsView === 'main' ? 'Settings' : 
                     settingsView === 'notifications' ? 'Notifications' : 
                     settingsView === 'privacy' ? 'Privacy & Security' : 'Subscription'}
                  </h2>
                </div>
                <button 
                  onClick={() => { setIsSettingsOpen(false); setTimeout(() => setSettingsView('main'), 300); }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {settingsView === 'main' && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                    {/* Account Section */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Account Management</h3>
                      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <div 
                          onClick={() => { setIsSettingsOpen(false); setTimeout(() => setIsEditProfileOpen(true), 300); }}
                          className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <User size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-900">Personal Information</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                        <div 
                          onClick={() => setSettingsView('subscription')}
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Star size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-900">Subscription</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Preferences Section */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h3>
                      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <div 
                          onClick={() => setSettingsView('notifications')}
                          className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Bell size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-900">Notifications</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                        <div 
                          onClick={() => setSettingsView('privacy')}
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Lock size={20} className="text-gray-400" />
                            <span className="font-medium text-gray-900">Privacy & Security</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 pb-8">
                      <button 
                        onClick={() => { setIsSettingsOpen(false); setTimeout(() => setSettingsView('main'), 300); }}
                        className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center justify-center gap-2 text-rose-500 font-bold hover:bg-rose-50 transition-colors"
                      >
                        <LogOut size={20} />
                        Log Out
                      </button>
                      <button 
                        onClick={() => { setIsSettingsOpen(false); setTimeout(() => setSettingsView('main'), 300); }}
                        className="w-full mt-4 p-4 flex items-center justify-center text-gray-400 font-medium hover:text-gray-600 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </motion.div>
                )}

                {settingsView === 'notifications' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                      <Toggle label="Push Notifications" checked={preferences.pushNotifications} onChange={(v) => setPreferences({...preferences, pushNotifications: v})} />
                      <Toggle label="Email Notifications" checked={preferences.emailNotifications} onChange={(v) => setPreferences({...preferences, emailNotifications: v})} />
                      <Toggle label="New Matches" checked={preferences.newMatches} onChange={(v) => setPreferences({...preferences, newMatches: v})} />
                      <Toggle label="Messages" checked={preferences.messages} onChange={(v) => setPreferences({...preferences, messages: v})} />
                    </div>
                  </motion.div>
                )}

                {settingsView === 'privacy' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                      <Toggle label="Show Distance" description="Let others see how far away you are" checked={preferences.showDistance} onChange={(v) => setPreferences({...preferences, showDistance: v})} />
                      <Toggle label="Show Age" description="Display your age on your profile" checked={preferences.showAge} onChange={(v) => setPreferences({...preferences, showAge: v})} />
                      <Toggle label="Incognito Mode" description="Only show me to people I've liked" checked={preferences.incognitoMode} onChange={(v) => setPreferences({...preferences, incognitoMode: v})} />
                    </div>
                  </motion.div>
                )}

                {settingsView === 'subscription' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Spark Free</h3>
                    <p className="text-gray-500 mb-6">Upgrade to Premium to see who likes you and get unlimited swipes.</p>
                    <button className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-3 rounded-2xl shadow-lg shadow-rose-200 hover:scale-[1.02] transition-transform">
                      Upgrade to Premium
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 h-[85%] bg-gray-50 rounded-t-[2rem] z-50 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})} 
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium" 
                  />
                </div>
                
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">Age</label>
                  <input 
                    type="number" 
                    value={editForm.age} 
                    onChange={e => setEditForm({...editForm, age: parseInt(e.target.value) || 0})} 
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium" 
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">Job Title</label>
                  <input 
                    type="text" 
                    value={editForm.job} 
                    onChange={e => setEditForm({...editForm, job: e.target.value})} 
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium" 
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">What's on your mind?</label>
                  <input 
                    type="text" 
                    value={editForm.status || ''} 
                    onChange={e => setEditForm({...editForm, status: e.target.value})} 
                    placeholder="Share a quick update..."
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium" 
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">Bio</label>
                  <textarea 
                    value={editForm.bio} 
                    onChange={e => setEditForm({...editForm, bio: e.target.value})} 
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium resize-none h-32" 
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block px-2">Priorities (comma separated)</label>
                  <input 
                    type="text" 
                    value={editForm.prioritiesInput} 
                    onChange={e => setEditForm({...editForm, prioritiesInput: e.target.value})} 
                    placeholder="e.g. Long-term relationship, Career focused"
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none shadow-sm transition-all text-gray-900 font-medium" 
                  />
                </div>

                <div className="pt-4 pb-8">
                  <button 
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 hover:scale-[1.02] transition-transform"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
