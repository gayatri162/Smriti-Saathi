// // // // import React, { useState, useEffect } from 'react';
// // // // import { supabase } from './services/supabase';
// // // // import type { User } from '@supabase/supabase-js';
// // // // import { Navbar } from './components/common/Navbar';
// // // // import { Sidebar } from './components/common/Sidebar';
// // // // import { EmergencyModal } from './components/common/EmergencyModal';
// // // // import { SetupGuideModal } from './components/setup/SetupGuideModal';
// // // // import { DashboardView } from './components/dashboard/DashboardView';
// // // // import { MemoryGamesView } from './components/games/MemoryGamesView';
// // // // import { AdaptiveRecallView } from './components/adaptive/AdaptiveRecallView';
// // // // import { RemindersView } from './components/reminders/RemindersView';
// // // // import { PersonalMemoriesView } from './components/memories/PersonalMemoriesView';
// // // // import { ProgressView } from './components/progress/ProgressView';
// // // // import { CaregiverDashboardView } from './components/caregiver/CaregiverDashboardView';

// // // // import {
// // // //   PageId,
// // // //   CaregiverProfile,
// // // //   ReminderItem,
// // // //   PersonalMemory,
// // // //   AdaptiveRecallItem,
// // // //   AdaptiveRecallLog,
// // // //   GameScoreRecord,
// // // //   ActivitySummary,
// // // // } from './types';
// // // // import { storageService } from './services/storage';
// // // // import { soundEffects } from './services/sound';

// // // // function AuthScreen() {
// // // //   const [isSignup, setIsSignup] = useState(true);
// // // //   const [name, setName] = useState('');
// // // //   const [role, setRole] = useState('patient');
// // // //   const [email, setEmail] = useState('');
// // // //   const [password, setPassword] = useState('');

// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   const handleSignup = async () => {
// // // //     setSubmitting(true);
// // // //     try {
// // // //       const { error } = await supabase.auth.signUp({
// // // //         email,
// // // //         password,
// // // //         options: { data: { full_name: name, role } },
// // // //       });
// // // //       if (error) {
// // // //         alert(error.message);
// // // //       } else {
// // // //         alert('Account created. If email confirmation is enabled, please check your inbox to confirm your account.');
// // // //         setIsSignup(false);
// // // //       }
// // // //     } catch (error: unknown) {
// // // //       alert(error instanceof Error ? error.message : 'Could not create account. Please try again.');
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const handleLogin = async () => {
// // // //     setSubmitting(true);
// // // //     try {
// // // //       const { error } = await supabase.auth.signInWithPassword({ email, password });
// // // //       if (error) alert(error.message);
// // // //     } catch (error: unknown) {
// // // //       alert(error instanceof Error ? error.message : 'Could not log in. Please try again.');
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
// // // //       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
// // // //         <h1 className="mb-2 text-center text-3xl font-bold text-purple-800">
// // // //           🧠 Smriti-Saathi
// // // //         </h1>

// // // //         <p className="mb-6 text-center text-gray-500">
// // // //           Memory Support & Cognitive Gaming
// // // //         </p>

// // // //         <div className="mb-6 grid grid-cols-2 gap-3">
// // // //           <button
// // // //             type="button"
// // // //             onClick={() => setIsSignup(true)}
// // // //             className={`rounded-lg p-3 ${
// // // //               isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// // // //             }`}
// // // //           >
// // // //             Sign Up
// // // //           </button>

// // // //           <button
// // // //             type="button"
// // // //             onClick={() => setIsSignup(false)}
// // // //             className={`rounded-lg p-3 ${
// // // //               !isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// // // //             }`}
// // // //           >
// // // //             Login
// // // //           </button>
// // // //         </div>

// // // // <form
// // // //   className="space-y-4"
// // // //   onSubmit={async (e) => {
// // // //     e.preventDefault();

// // // //     if (isSignup) {
// // // //       await handleSignup();
// // // //     } else {
// // // //       await handleLogin();
// // // //     }
// // // //   }}
// // // // >
// // // //             {isSignup && (
// // // //             <>
// // // //               <input
// // // //                 className="w-full rounded-lg border p-3"
// // // //                 placeholder="Full Name"
// // // //                 value={name}
// // // //                 onChange={(e) => setName(e.target.value)}
// // // //                 required
// // // //               />

// // // //               <select
// // // //                 className="w-full rounded-lg border bg-white p-3"
// // // //                 value={role}
// // // //                 onChange={(e) => setRole(e.target.value)}
// // // //               >
// // // //                 <option value="patient">Patient</option>
// // // //                 <option value="caregiver">Caregiver</option>
// // // //                 <option value="doctor">Doctor</option>
// // // //               </select>
// // // //             </>
// // // //           )}

// // // //           <input
// // // //             type="email"
// // // //             className="w-full rounded-lg border p-3"
// // // //             placeholder="Email Address"
// // // //             value={email}
// // // //             onChange={(e) => setEmail(e.target.value)}
// // // //             required
// // // //           />

// // // //           <input
// // // //             type="password"
// // // //             className="w-full rounded-lg border p-3"
// // // //             placeholder="Password"
// // // //             value={password}
// // // //             onChange={(e) => setPassword(e.target.value)}
// // // //             required
// // // //           />

// // // //           <button
// // // //             type="submit"
// // // //             className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white"
          
// // // //             disabled={submitting}
// // // //           >
// // // //             {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function App() {
// // // //     const [authUser, setAuthUser] = useState<User | null>(null);

// // // //   const [authLoading, setAuthLoading] = useState(true);

// // // //   const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
// // // //   const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
// // // //   const [soundEnabled, setSoundEnabled] = useState(true);
// // // //   const [emergencyOpen, setEmergencyOpen] = useState(false);
// // // //   const [setupGuideOpen, setSetupGuideOpen] = useState(false);
// // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // // //   useEffect(() => {
// // // //     let isMounted = true;

// // // //     const checkSession = async () => {
// // // //       const { data, error } = await supabase.auth.getSession();

// // // //       if (error) {
// // // //         console.error('Session error:', error.message);
// // // //       }

// // // //       if (isMounted) {
// // // //         setAuthUser(data.session?.user ?? null);
// // // //         setAuthLoading(false);
// // // //       }
// // // //     };

// // // //     void checkSession();

// // // //     const {
// // // //   data: { subscription },
// // // // } = supabase.auth.onAuthStateChange(
// // // //   (
// // // //     _event: import('@supabase/supabase-js').AuthChangeEvent,
// // // //     session: import('@supabase/supabase-js').Session | null
// // // //   ) => {
// // // //     setAuthUser(session?.user ?? null);
// // // //     setAuthLoading(false);
// // // //   }
// // // // );

// // // //     return () => {
// // // //       isMounted = false;
// // // //       subscription.unsubscribe();
// // // //     };
// // // //   }, []);

// // // //   // App data state
// // // //   const [profile, setProfile] = useState<CaregiverProfile>(() => storageService.getCaregiverProfile());
// // // //   const [reminders, setReminders] = useState<ReminderItem[]>(() => storageService.getReminders());
// // // //   const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getPersonalMemories());
// // // //   const [adaptiveItems, setAdaptiveItems] = useState<AdaptiveRecallItem[]>(() =>
// // // //     storageService.getAdaptiveItems()
// // // //   );
// // // //   const [adaptiveLogs, setAdaptiveLogs] = useState<AdaptiveRecallLog[]>(() =>
// // // //     storageService.getAdaptiveLogs()
// // // //   );
// // // //   const [gameScores, setGameScores] = useState<GameScoreRecord[]>(() =>
// // // //     storageService.getGameScores()
// // // //   );
// // // //   const [activityLogs, setActivityLogs] = useState<ActivitySummary[]>(() =>
// // // //     storageService.getActivityLogs()
// // // //   );

// // // //   // Sync sound setting
// // // //   useEffect(() => {
// // // //     soundEffects.enabled = soundEnabled;
// // // //   }, [soundEnabled]);

// // // //   const refreshAllData = () => {
// // // //     setProfile(storageService.getCaregiverProfile());
// // // //     setReminders(storageService.getReminders());
// // // //     setMemories(storageService.getPersonalMemories());
// // // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // // //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// // // //     setGameScores(storageService.getGameScores());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //   };

// // // //   // Reminder operations
// // // //   const handleToggleReminder = (id: string) => {
// // // //     storageService.toggleReminder(id);
// // // //     setReminders(storageService.getReminders());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //   };

// // // //   const handleAddReminder = (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => {
// // // //     storageService.addReminder(data);
// // // //     setReminders(storageService.getReminders());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //   };

// // // //   const handleUpdateReminder = (data: ReminderItem) => {
// // // //     storageService.updateReminder(data);
// // // //     setReminders(storageService.getReminders());
// // // //   };

// // // //   const handleDeleteReminder = (id: string) => {
// // // //     storageService.deleteReminder(id);
// // // //     setReminders(storageService.getReminders());
// // // //   };

// // // //   // Memory operations
// // // //   const handleAddMemory = (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => {
// // // //     storageService.addPersonalMemory(data);
// // // //     setMemories(storageService.getPersonalMemories());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //   };

// // // //   const handleUpdateMemory = (data: PersonalMemory) => {
// // // //     storageService.updatePersonalMemory(data);
// // // //     setMemories(storageService.getPersonalMemories());
// // // //   };

// // // //   const handleDeleteMemory = (id: string) => {
// // // //     storageService.deletePersonalMemory(id);
// // // //     setMemories(storageService.getPersonalMemories());
// // // //   };

// // // //   const handleRecordMemoryResult = (id: string, remembered: boolean) => {
// // // //     storageService.recordMemoryRecallResult(id, remembered);
// // // //     setMemories(storageService.getPersonalMemories());
// // // //   };

// // // //   // Adaptive recall operation
// // // //   const handleAdaptiveAttempt = (itemId: string, selectedOptionIndex: number) => {
// // // //     const result = storageService.processAdaptiveAttempt(itemId, selectedOptionIndex);
// // // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // // //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //     return result;
// // // //   };

// // // //   const handleFastForwardAllAdaptive = () => {
// // // //     storageService.fastForwardAdaptiveTimers();
// // // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // // //   };

// // // //   // Game score recording
// // // //   const handleSaveGameScore = (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => {
// // // //     storageService.recordGameScore(scoreData);
// // // //     setGameScores(storageService.getGameScores());
// // // //     setActivityLogs(storageService.getActivityLogs());
// // // //   };

// // // //   // Profile update
// // // //   const handleUpdateProfile = (newProfile: CaregiverProfile) => {
// // // //     storageService.saveCaregiverProfile(newProfile);
// // // //     setProfile(newProfile);
// // // //   };

// // // //   // Count pending items for badges
// // // //   const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
// // // //   const nowMs = Date.now();
// // // //   const dueAdaptiveCount = adaptiveItems.filter(
// // // //     (item) => new Date(item.nextScheduledAt).getTime() <= nowMs
// // // //   ).length;

// // // //   // Font size classes
// // // //   const fontSizeContainerClass: Record<'normal' | 'large' | 'xlarge', string> = {
// // // //     normal: 'text-sm sm:text-base',
// // // //     large: 'text-base sm:text-lg',
// // // //     xlarge: 'text-lg sm:text-xl',
// // // //   };

// // // //   if (authLoading) {
// // // //     return <div className="flex min-h-screen items-center justify-center bg-purple-50 text-purple-800">Checking your session...</div>;
// // // //   }

// // // //   if (!authUser) {
// // // //     return <AuthScreen />;
// // // //   }

// // // //   return (
// // // //     <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass[fontSize]}`}>
// // // //       {/* Top Navbar */}
// // // //       <Navbar
// // // //         profile={profile}
// // // //         fontSize={fontSize}
// // // //         onFontSizeChange={setFontSize}
// // // //         soundEnabled={soundEnabled}
// // // //         onToggleSound={() => setSoundEnabled((prev) => !prev)}
// // // //         onOpenEmergency={() => setEmergencyOpen(true)}
// // // //         onOpenSetupGuide={() => setSetupGuideOpen(true)}
// // // //         mobileMenuOpen={mobileMenuOpen}
// // // //         onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
// // // //       />

// // // //       {/* Main Body with Sidebar & Content */}
// // // //       <div className="flex-1 max-w-7xl w-full mx-auto flex">
// // // //         {/* Left Sidebar */}
// // // //         <Sidebar
// // // //           currentPage={currentPage}
// // // //           onNavigate={(page) => {
// // // //             setCurrentPage(page);
// // // //             window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //           }}
// // // //           pendingRemindersCount={pendingRemindersCount}
// // // //           dueAdaptiveCount={dueAdaptiveCount}
// // // //           isOpenMobile={mobileMenuOpen}
// // // //           onCloseMobile={() => setMobileMenuOpen(false)}
// // // //         />

// // // //         {/* Center Main View Area */}
// // // //         <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
// // // //           {currentPage === 'dashboard' && (
// // // //             <DashboardView
// // // //               profile={profile}
// // // //               reminders={reminders}
// // // //               gameScores={gameScores}
// // // //               adaptiveItems={adaptiveItems}
// // // //               onToggleReminder={handleToggleReminder}
// // // //               onNavigate={(page) => {
// // // //                 setCurrentPage(page);
// // // //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //               }}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'games' && (
// // // //             <MemoryGamesView
// // // //               profile={profile}
// // // //               gameScores={gameScores}
// // // //               onSaveScore={handleSaveGameScore}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'adaptive' && (
// // // //             <AdaptiveRecallView
// // // //               items={adaptiveItems}
// // // //               logs={adaptiveLogs}
// // // //               onAttempt={handleAdaptiveAttempt}
// // // //               onFastForwardAll={handleFastForwardAllAdaptive}
// // // //               seniorName={profile.seniorName}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'reminders' && (
// // // //             <RemindersView
// // // //               reminders={reminders}
// // // //               onToggleReminder={handleToggleReminder}
// // // //               onAddReminder={handleAddReminder}
// // // //               onUpdateReminder={handleUpdateReminder}
// // // //               onDeleteReminder={handleDeleteReminder}
// // // //               seniorName={profile.seniorName}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'memories' && (
// // // //             <PersonalMemoriesView
// // // //               memories={memories}
// // // //               onAddMemory={handleAddMemory}
// // // //               onUpdateMemory={handleUpdateMemory}
// // // //               onDeleteMemory={handleDeleteMemory}
// // // //               onRecordResult={handleRecordMemoryResult}
// // // //               profile={profile}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'progress' && (
// // // //             <ProgressView
// // // //               gameScores={gameScores}
// // // //               reminders={reminders}
// // // //               adaptiveItems={adaptiveItems}
// // // //               onNavigate={(page) => {
// // // //                 setCurrentPage(page);
// // // //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //               }}
// // // //               seniorName={profile.seniorName}
// // // //             />
// // // //           )}

// // // //           {currentPage === 'caregiver' && (
// // // //             <CaregiverDashboardView
// // // //               profile={profile}
// // // //               reminders={reminders}
// // // //               gameScores={gameScores}
// // // //               adaptiveItems={adaptiveItems}
// // // //               activityLogs={activityLogs}
// // // //               onUpdateProfile={handleUpdateProfile}
// // // //               onRefreshData={refreshAllData}
// // // //             />
// // // //           )}
// // // //         </main>
// // // //       </div>

// // // //       {/* Emergency Helpline Modal */}
// // // //       <EmergencyModal
// // // //         isOpen={emergencyOpen}
// // // //         onClose={() => setEmergencyOpen(false)}
// // // //         profile={profile}
// // // //       />

// // // //       {/* Hackathon Setup & Export Guide Modal */}
// // // //       <SetupGuideModal
// // // //         isOpen={setupGuideOpen}
// // // //         onClose={() => setSetupGuideOpen(false)}
// // // //         onDataImported={refreshAllData}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useState, useEffect } from 'react';
// // // import { supabase } from './services/supabase';
// // // import type { User } from '@supabase/supabase-js';
// // // import { Navbar } from './components/common/Navbar';
// // // import { Sidebar } from './components/common/Sidebar';
// // // import { EmergencyModal } from './components/common/EmergencyModal';
// // // import { SetupGuideModal } from './components/setup/SetupGuideModal';
// // // import { DashboardView } from './components/dashboard/DashboardView';
// // // import { MemoryGamesView } from './components/games/MemoryGamesView';
// // // import { AdaptiveRecallView } from './components/adaptive/AdaptiveRecallView';
// // // import { RemindersView } from './components/reminders/RemindersView';
// // // import { PersonalMemoriesView } from './components/memories/PersonalMemoriesView';
// // // import { ProgressView } from './components/progress/ProgressView';
// // // import { CaregiverDashboardView } from './components/caregiver/CaregiverDashboardView';

// // // import {
// // //   PageId,
// // //   CaregiverProfile,
// // //   ReminderItem,
// // //   PersonalMemory,
// // //   AdaptiveRecallItem,
// // //   AdaptiveRecallLog,
// // //   GameScoreRecord,
// // //   ActivitySummary,
// // // } from './types';
// // // import { storageService } from './services/storage';
// // // import { soundEffects } from './services/sound';

// // // function AuthScreen() {
// // //   const [isSignup, setIsSignup] = useState(true);
// // //   const [name, setName] = useState('');
// // //   const [role, setRole] = useState('patient');
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');

// // //   const [submitting, setSubmitting] = useState(false);

// // //   const handleSignup = async () => {
// // //     setSubmitting(true);
// // //     try {
// // //       const { error } = await supabase.auth.signUp({
// // //         email,
// // //         password,
// // //         options: { data: { full_name: name, role } },
// // //       });
// // //       if (error) {
// // //         alert(error.message);
// // //       } else {
// // //         alert('Account created. If email confirmation is enabled, please check your inbox to confirm your account.');
// // //         setIsSignup(false);
// // //       }
// // //     } catch (error: unknown) {
// // //       alert(error instanceof Error ? error.message : 'Could not create account. Please try again.');
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const handleLogin = async () => {
// // //     setSubmitting(true);
// // //     try {
// // //       const { error } = await supabase.auth.signInWithPassword({ email, password });
// // //       if (error) alert(error.message);
// // //     } catch (error: unknown) {
// // //       alert(error instanceof Error ? error.message : 'Could not log in. Please try again.');
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
// // //       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
// // //         <h1 className="mb-2 text-center text-3xl font-bold text-purple-800">
// // //           🧠 Smriti-Saathi
// // //         </h1>

// // //         <p className="mb-6 text-center text-gray-500">
// // //           Memory Support & Cognitive Gaming
// // //         </p>

// // //         <div className="mb-6 grid grid-cols-2 gap-3">
// // //           <button
// // //             type="button"
// // //             onClick={() => setIsSignup(true)}
// // //             className={`rounded-lg p-3 ${
// // //               isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// // //             }`}
// // //           >
// // //             Sign Up
// // //           </button>

// // //           <button
// // //             type="button"
// // //             onClick={() => setIsSignup(false)}
// // //             className={`rounded-lg p-3 ${
// // //               !isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// // //             }`}
// // //           >
// // //             Login
// // //           </button>
// // //         </div>

// // // <form
// // //   className="space-y-4"
// // //   onSubmit={async (e) => {
// // //     e.preventDefault();

// // //     if (isSignup) {
// // //       await handleSignup();
// // //     } else {
// // //       await handleLogin();
// // //     }
// // //   }}
// // // >
// // //             {isSignup && (
// // //             <>
// // //               <input
// // //                 className="w-full rounded-lg border p-3"
// // //                 placeholder="Full Name"
// // //                 value={name}
// // //                 onChange={(e) => setName(e.target.value)}
// // //                 required
// // //               />

// // //               <select
// // //                 className="w-full rounded-lg border bg-white p-3"
// // //                 value={role}
// // //                 onChange={(e) => setRole(e.target.value)}
// // //               >
// // //                 <option value="patient">Patient</option>
// // //                 <option value="caregiver">Caregiver</option>
// // //                 <option value="doctor">Doctor</option>
// // //               </select>
// // //             </>
// // //           )}

// // //           <input
// // //             type="email"
// // //             className="w-full rounded-lg border p-3"
// // //             placeholder="Email Address"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             required
// // //           />

// // //           <input
// // //             type="password"
// // //             className="w-full rounded-lg border p-3"
// // //             placeholder="Password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             required
// // //           />

// // //           <button
// // //             type="submit"
// // //             className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white"
          
// // //             disabled={submitting}
// // //           >
// // //             {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function App() {
// // //     const [authUser, setAuthUser] = useState<User | null>(null);

// // //   const [authLoading, setAuthLoading] = useState(true);
// // //   const [profileOpen, setProfileOpen] = useState(false);
// // //   const [profileName, setProfileName] = useState('');
// // //   const [profileRole, setProfileRole] = useState('patient');
// // //   const [profileSaving, setProfileSaving] = useState(false);
// // //   const [loggingOut, setLoggingOut] = useState(false);

// // //   const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
// // //   const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
// // //   const [soundEnabled, setSoundEnabled] = useState(true);
// // //   const [emergencyOpen, setEmergencyOpen] = useState(false);
// // //   const [setupGuideOpen, setSetupGuideOpen] = useState(false);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // //   useEffect(() => {
// // //     let isMounted = true;

// // //     const checkSession = async () => {
// // //       const { data, error } = await supabase.auth.getSession();

// // //       if (error) {
// // //         console.error('Session error:', error.message);
// // //       }

// // //       if (isMounted) {
// // //         setAuthUser(data.session?.user ?? null);
// // //         setAuthLoading(false);
// // //       }
// // //     };

// // //     void checkSession();

// // //     const {
// // //       data: { subscription },
// // //     } = supabase.auth.onAuthStateChange((_event, session) => {
// // //       setAuthUser(session?.user ?? null);
// // //       setAuthLoading(false);
// // //     });

// // //     return () => {
// // //       isMounted = false;
// // //       subscription.unsubscribe();
// // //     };
// // //   }, []);

// // //   // App data state
// // //   const [profile, setProfile] = useState<CaregiverProfile>(() => storageService.getCaregiverProfile());
// // //   const [reminders, setReminders] = useState<ReminderItem[]>(() => storageService.getReminders());
// // //   const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getPersonalMemories());
// // //   const [adaptiveItems, setAdaptiveItems] = useState<AdaptiveRecallItem[]>(() =>
// // //     storageService.getAdaptiveItems()
// // //   );
// // //   const [adaptiveLogs, setAdaptiveLogs] = useState<AdaptiveRecallLog[]>(() =>
// // //     storageService.getAdaptiveLogs()
// // //   );
// // //   const [gameScores, setGameScores] = useState<GameScoreRecord[]>(() =>
// // //     storageService.getGameScores()
// // //   );
// // //   const [activityLogs, setActivityLogs] = useState<ActivitySummary[]>(() =>
// // //     storageService.getActivityLogs()
// // //   );

// // //   // Sync sound setting
// // //   useEffect(() => {
// // //     soundEffects.enabled = soundEnabled;
// // //   }, [soundEnabled]);

// // //   const refreshAllData = () => {
// // //     setProfile(storageService.getCaregiverProfile());
// // //     setReminders(storageService.getReminders());
// // //     setMemories(storageService.getPersonalMemories());
// // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// // //     setGameScores(storageService.getGameScores());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //   };

// // //   // Reminder operations
// // //   const handleToggleReminder = (id: string) => {
// // //     storageService.toggleReminder(id);
// // //     setReminders(storageService.getReminders());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //   };

// // //   const handleAddReminder = (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => {
// // //     storageService.addReminder(data);
// // //     setReminders(storageService.getReminders());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //   };

// // //   const handleUpdateReminder = (data: ReminderItem) => {
// // //     storageService.updateReminder(data);
// // //     setReminders(storageService.getReminders());
// // //   };

// // //   const handleDeleteReminder = (id: string) => {
// // //     storageService.deleteReminder(id);
// // //     setReminders(storageService.getReminders());
// // //   };

// // //   // Memory operations
// // //   const handleAddMemory = (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => {
// // //     storageService.addPersonalMemory(data);
// // //     setMemories(storageService.getPersonalMemories());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //   };

// // //   const handleUpdateMemory = (data: PersonalMemory) => {
// // //     storageService.updatePersonalMemory(data);
// // //     setMemories(storageService.getPersonalMemories());
// // //   };

// // //   const handleDeleteMemory = (id: string) => {
// // //     storageService.deletePersonalMemory(id);
// // //     setMemories(storageService.getPersonalMemories());
// // //   };

// // //   const handleRecordMemoryResult = (id: string, remembered: boolean) => {
// // //     storageService.recordMemoryRecallResult(id, remembered);
// // //     setMemories(storageService.getPersonalMemories());
// // //   };

// // //   // Adaptive recall operation
// // //   const handleAdaptiveAttempt = (itemId: string, selectedOptionIndex: number) => {
// // //     const result = storageService.processAdaptiveAttempt(itemId, selectedOptionIndex);
// // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //     return result;
// // //   };

// // //   const handleFastForwardAllAdaptive = () => {
// // //     storageService.fastForwardAdaptiveTimers();
// // //     setAdaptiveItems(storageService.getAdaptiveItems());
// // //   };

// // //   // Game score recording
// // //   const handleSaveGameScore = (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => {
// // //     storageService.recordGameScore(scoreData);
// // //     setGameScores(storageService.getGameScores());
// // //     setActivityLogs(storageService.getActivityLogs());
// // //   };

// // //   // Profile update
// // //   const handleUpdateProfile = (newProfile: CaregiverProfile) => {
// // //     storageService.saveCaregiverProfile(newProfile);
// // //     setProfile(newProfile);
// // //   };

// // //   // Count pending items for badges
// // //   const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
// // //   const nowMs = Date.now();
// // //   const dueAdaptiveCount = adaptiveItems.filter(
// // //     (item) => new Date(item.nextScheduledAt).getTime() <= nowMs
// // //   ).length;

// // //   // Keep the editable profile fields in sync with the signed-in Supabase user.
// // //   useEffect(() => {
// // //     setProfileName(String(authUser?.user_metadata?.full_name ?? ''));
// // //     setProfileRole(String(authUser?.user_metadata?.role ?? 'patient'));
// // //   }, [authUser]);

// // //   const handleSaveUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
// // //     event.preventDefault();
// // //     setProfileSaving(true);
// // //     try {
// // //       const { error } = await supabase.auth.updateUser({
// // //         data: { full_name: profileName.trim(), role: profileRole },
// // //       });
// // //       if (error) {
// // //         alert(error.message);
// // //       } else {
// // //         alert('Profile updated successfully.');
// // //         setProfileOpen(false);
// // //       }
// // //     } catch (error: unknown) {
// // //       alert(error instanceof Error ? error.message : 'Could not update profile. Please try again.');
// // //     } finally {
// // //       setProfileSaving(false);
// // //     }
// // //   };

// // //   const handleLogout = async () => {
// // //     setLoggingOut(true);
// // //     try {
// // //       const { error } = await supabase.auth.signOut();
// // //       if (error) alert(error.message);
// // //     } catch (error: unknown) {
// // //       alert(error instanceof Error ? error.message : 'Could not log out. Please try again.');
// // //     } finally {
// // //       setLoggingOut(false);
// // //     }
// // //   };

// // //   // Font size classes
// // //   const fontSizeContainerClass: Record<'normal' | 'large' | 'xlarge', string> = {
// // //     normal: 'text-sm sm:text-base',
// // //     large: 'text-base sm:text-lg',
// // //     xlarge: 'text-lg sm:text-xl',
// // //   };

// // //   if (authLoading) {
// // //     return <div className="flex min-h-screen items-center justify-center bg-purple-50 text-purple-800">Checking your session...</div>;
// // //   }

// // //   if (!authUser) {
// // //     return <AuthScreen />;
// // //   }

// // //   return (
// // //     <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass[fontSize]}`}>
// // //       {/* User account actions */}
// // //       <div className="flex justify-end gap-3 bg-white px-4 py-3 shadow-sm">
// // //         <button
// // //           type="button"
// // //           onClick={() => setProfileOpen(true)}
// // //           className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50"
// // //         >
// // //           Profile
// // //         </button>
// // //         <button
// // //           type="button"
// // //           onClick={() => void handleLogout()}
// // //           disabled={loggingOut}
// // //           className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
// // //         >
// // //           {loggingOut ? 'Logging out...' : 'Logout'}
// // //         </button>
// // //       </div>

// // //       {profileOpen && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
// // //           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
// // //             <div className="mb-5 flex items-center justify-between">
// // //               <h2 className="text-xl font-bold text-purple-800">My Profile</h2>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setProfileOpen(false)}
// // //                 className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
// // //                 aria-label="Close profile"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>
// // //             <form className="space-y-4" onSubmit={handleSaveUserProfile}>
// // //               <div>
// // //                 <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
// // //                 <input
// // //                   id="profile-email"
// // //                   value={authUser?.email ?? ''}
// // //                   readOnly
// // //                   className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
// // //                 <input
// // //                   id="profile-name"
// // //                   value={profileName}
// // //                   onChange={(event) => setProfileName(event.target.value)}
// // //                   required
// // //                   className="w-full rounded-lg border p-3"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="profile-role" className="mb-1 block text-sm font-medium text-gray-700">Role</label>
// // //                 <select
// // //                   id="profile-role"
// // //                   value={profileRole}
// // //                   onChange={(event) => setProfileRole(event.target.value)}
// // //                   className="w-full rounded-lg border bg-white p-3"
// // //                 >
// // //                   <option value="patient">Patient</option>
// // //                   <option value="caregiver">Caregiver</option>
// // //                   <option value="doctor">Doctor</option>
// // //                 </select>
// // //               </div>
// // //               <button
// // //                 type="submit"
// // //                 disabled={profileSaving}
// // //                 className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60"
// // //               >
// // //                 {profileSaving ? 'Saving...' : 'Save changes'}
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Top Navbar */}
// // //       <Navbar
// // //         profile={profile}
// // //         fontSize={fontSize}
// // //         onFontSizeChange={setFontSize}
// // //         soundEnabled={soundEnabled}
// // //         onToggleSound={() => setSoundEnabled((prev) => !prev)}
// // //         onOpenEmergency={() => setEmergencyOpen(true)}
// // //         onOpenSetupGuide={() => setSetupGuideOpen(true)}
// // //         mobileMenuOpen={mobileMenuOpen}
// // //         onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
// // //       />

// // //       {/* Main Body with Sidebar & Content */}
// // //       <div className="flex-1 max-w-7xl w-full mx-auto flex">
// // //         {/* Left Sidebar */}
// // //         <Sidebar
// // //           currentPage={currentPage}
// // //           onNavigate={(page) => {
// // //             setCurrentPage(page);
// // //             window.scrollTo({ top: 0, behavior: 'smooth' });
// // //           }}
// // //           pendingRemindersCount={pendingRemindersCount}
// // //           dueAdaptiveCount={dueAdaptiveCount}
// // //           isOpenMobile={mobileMenuOpen}
// // //           onCloseMobile={() => setMobileMenuOpen(false)}
// // //         />

// // //         {/* Center Main View Area */}
// // //         <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
// // //           {currentPage === 'dashboard' && (
// // //             <DashboardView
// // //               profile={profile}
// // //               reminders={reminders}
// // //               gameScores={gameScores}
// // //               adaptiveItems={adaptiveItems}
// // //               onToggleReminder={handleToggleReminder}
// // //               onNavigate={(page) => {
// // //                 setCurrentPage(page);
// // //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// // //               }}
// // //             />
// // //           )}

// // //           {currentPage === 'games' && (
// // //             <MemoryGamesView
// // //               profile={profile}
// // //               gameScores={gameScores}
// // //               onSaveScore={handleSaveGameScore}
// // //             />
// // //           )}

// // //           {currentPage === 'adaptive' && (
// // //             <AdaptiveRecallView
// // //               items={adaptiveItems}
// // //               logs={adaptiveLogs}
// // //               onAttempt={handleAdaptiveAttempt}
// // //               onFastForwardAll={handleFastForwardAllAdaptive}
// // //               seniorName={profile.seniorName}
// // //             />
// // //           )}

// // //           {currentPage === 'reminders' && (
// // //             <RemindersView
// // //               reminders={reminders}
// // //               onToggleReminder={handleToggleReminder}
// // //               onAddReminder={handleAddReminder}
// // //               onUpdateReminder={handleUpdateReminder}
// // //               onDeleteReminder={handleDeleteReminder}
// // //               seniorName={profile.seniorName}
// // //             />
// // //           )}

// // //           {currentPage === 'memories' && (
// // //             <PersonalMemoriesView
// // //               memories={memories}
// // //               onAddMemory={handleAddMemory}
// // //               onUpdateMemory={handleUpdateMemory}
// // //               onDeleteMemory={handleDeleteMemory}
// // //               onRecordResult={handleRecordMemoryResult}
// // //               profile={profile}
// // //             />
// // //           )}

// // //           {currentPage === 'progress' && (
// // //             <ProgressView
// // //               gameScores={gameScores}
// // //               reminders={reminders}
// // //               adaptiveItems={adaptiveItems}
// // //               onNavigate={(page) => {
// // //                 setCurrentPage(page);
// // //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// // //               }}
// // //               seniorName={profile.seniorName}
// // //             />
// // //           )}

// // //           {currentPage === 'caregiver' && (
// // //             <CaregiverDashboardView
// // //               profile={profile}
// // //               reminders={reminders}
// // //               gameScores={gameScores}
// // //               adaptiveItems={adaptiveItems}
// // //               activityLogs={activityLogs}
// // //               onUpdateProfile={handleUpdateProfile}
// // //               onRefreshData={refreshAllData}
// // //             />
// // //           )}
// // //         </main>
// // //       </div>

// // //       {/* Emergency Helpline Modal */}
// // //       <EmergencyModal
// // //         isOpen={emergencyOpen}
// // //         onClose={() => setEmergencyOpen(false)}
// // //         profile={profile}
// // //       />

// // //       {/* Hackathon Setup & Export Guide Modal */}
// // //       <SetupGuideModal
// // //         isOpen={setupGuideOpen}
// // //         onClose={() => setSetupGuideOpen(false)}
// // //         onDataImported={refreshAllData}
// // //       />
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useEffect } from 'react';
// // import { supabase } from './services/supabase';
// // import type { User } from '@supabase/supabase-js';
// // import { Navbar } from './components/common/Navbar';
// // import { Sidebar } from './components/common/Sidebar';
// // import { EmergencyModal } from './components/common/EmergencyModal';
// // import { SetupGuideModal } from './components/setup/SetupGuideModal';
// // import { DashboardView } from './components/dashboard/DashboardView';
// // import { MemoryGamesView } from './components/games/MemoryGamesView';
// // import { AdaptiveRecallView } from './components/adaptive/AdaptiveRecallView';
// // import { RemindersView } from './components/reminders/RemindersView';
// // import { PersonalMemoriesView } from './components/memories/PersonalMemoriesView';
// // import { ProgressView } from './components/progress/ProgressView';
// // import { CaregiverDashboardView } from './components/caregiver/CaregiverDashboardView';

// // import {
// //   PageId,
// //   CaregiverProfile,
// //   ReminderItem,
// //   PersonalMemory,
// //   AdaptiveRecallItem,
// //   AdaptiveRecallLog,
// //   GameScoreRecord,
// //   ActivitySummary,
// // } from './types';
// // import { storageService } from './services/storage';
// // import { soundEffects } from './services/sound';

// // type DoctorPatientRow = {
// //   id: string;
// //   full_name: string;
// //   email: string;
// //   latest_score: number | null;
// //   latest_activity: string | null;
// // };

// // function AuthScreen() {
// //   const [isSignup, setIsSignup] = useState(true);
// //   const [name, setName] = useState('');
// //   const [role, setRole] = useState('patient');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const [submitting, setSubmitting] = useState(false);

// //   const handleSignup = async () => {
// //     setSubmitting(true);
// //     try {
// //       const { error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: { data: { full_name: name, role } },
// //       });
// //       if (error) {
// //         alert(error.message);
// //       } else {
// //         alert('Account created. If email confirmation is enabled, please check your inbox to confirm your account.');
// //         setIsSignup(false);
// //       }
// //     } catch (error: unknown) {
// //       alert(error instanceof Error ? error.message : 'Could not create account. Please try again.');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     setSubmitting(true);
// //     try {
// //       const { error } = await supabase.auth.signInWithPassword({ email, password });
// //       if (error) alert(error.message);
// //     } catch (error: unknown) {
// //       alert(error instanceof Error ? error.message : 'Could not log in. Please try again.');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
// //       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
// //         <h1 className="mb-2 text-center text-3xl font-bold text-purple-800">
// //           🧠 Smriti-Saathi
// //         </h1>

// //         <p className="mb-6 text-center text-gray-500">
// //           Memory Support & Cognitive Gaming
// //         </p>

// //         <div className="mb-6 grid grid-cols-2 gap-3">
// //           <button
// //             type="button"
// //             onClick={() => setIsSignup(true)}
// //             className={`rounded-lg p-3 ${
// //               isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// //             }`}
// //           >
// //             Sign Up
// //           </button>

// //           <button
// //             type="button"
// //             onClick={() => setIsSignup(false)}
// //             className={`rounded-lg p-3 ${
// //               !isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
// //             }`}
// //           >
// //             Login
// //           </button>
// //         </div>

// // <form
// //   className="space-y-4"
// //   onSubmit={async (e) => {
// //     e.preventDefault();

// //     if (isSignup) {
// //       await handleSignup();
// //     } else {
// //       await handleLogin();
// //     }
// //   }}
// // >
// //             {isSignup && (
// //             <>
// //               <input
// //                 className="w-full rounded-lg border p-3"
// //                 placeholder="Full Name"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 required
// //               />

// //               <select
// //                 className="w-full rounded-lg border bg-white p-3"
// //                 value={role}
// //                 onChange={(e) => setRole(e.target.value)}
// //               >
// //                 <option value="patient">Patient</option>
// //                 <option value="caregiver">Caregiver</option>
// //                 <option value="doctor">Doctor</option>
// //               </select>
// //             </>
// //           )}

// //           <input
// //             type="email"
// //             className="w-full rounded-lg border p-3"
// //             placeholder="Email Address"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="password"
// //             className="w-full rounded-lg border p-3"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />

// //           <button
// //             type="submit"
// //             className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white"
          
// //             disabled={submitting}
// //           >
// //             {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function App() {
// //     const [authUser, setAuthUser] = useState<User | null>(null);

// //   const [authLoading, setAuthLoading] = useState(true);
// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const [profileName, setProfileName] = useState('');
// //   const [profileRole, setProfileRole] = useState('patient');
// //   const [profileSaving, setProfileSaving] = useState(false);
// //   const [loggingOut, setLoggingOut] = useState(false);
// //   const [doctorPatients, setDoctorPatients] = useState<DoctorPatientRow[]>([]);
// //   const [doctorPatientsLoading, setDoctorPatientsLoading] = useState(false);
// //   const [doctorPatientsError, setDoctorPatientsError] = useState('');
// //   const [patientSearch, setPatientSearch] = useState('');


// //   const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
// //   const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
// //   const [soundEnabled, setSoundEnabled] = useState(true);
// //   const [emergencyOpen, setEmergencyOpen] = useState(false);
// //   const [setupGuideOpen, setSetupGuideOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   useEffect(() => {
// //     let isMounted = true;

// //     const checkSession = async () => {
// //       const { data, error } = await supabase.auth.getSession();

// //       if (error) {
// //         console.error('Session error:', error.message);
// //       }

// //       if (isMounted) {
// //         setAuthUser(data.session?.user ?? null);
// //         setAuthLoading(false);
// //       }
// //     };

// //     void checkSession();

// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((_event, session) => {
// //       setAuthUser(session?.user ?? null);
// //       setAuthLoading(false);
// //     });

// //     return () => {
// //       isMounted = false;
// //       subscription.unsubscribe();
// //     };
// //   }, []);

// //   // App data state
// //   const [profile, setProfile] = useState<CaregiverProfile>(() => storageService.getCaregiverProfile());
// //   const [reminders, setReminders] = useState<ReminderItem[]>(() => storageService.getReminders());
// //   const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getPersonalMemories());
// //   const [adaptiveItems, setAdaptiveItems] = useState<AdaptiveRecallItem[]>(() =>
// //     storageService.getAdaptiveItems()
// //   );
// //   const [adaptiveLogs, setAdaptiveLogs] = useState<AdaptiveRecallLog[]>(() =>
// //     storageService.getAdaptiveLogs()
// //   );
// //   const [gameScores, setGameScores] = useState<GameScoreRecord[]>(() =>
// //     storageService.getGameScores()
// //   );
// //   const [activityLogs, setActivityLogs] = useState<ActivitySummary[]>(() =>
// //     storageService.getActivityLogs()
// //   );

// //   // Sync sound setting
// //   useEffect(() => {
// //     soundEffects.enabled = soundEnabled;
// //   }, [soundEnabled]);

// //   const refreshAllData = () => {
// //     setProfile(storageService.getCaregiverProfile());
// //     setReminders(storageService.getReminders());
// //     setMemories(storageService.getPersonalMemories());
// //     setAdaptiveItems(storageService.getAdaptiveItems());
// //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// //     setGameScores(storageService.getGameScores());
// //     setActivityLogs(storageService.getActivityLogs());
// //   };

// //   // Reminder operations
// //   const handleToggleReminder = (id: string) => {
// //     storageService.toggleReminder(id);
// //     setReminders(storageService.getReminders());
// //     setActivityLogs(storageService.getActivityLogs());
// //   };

// //   const handleAddReminder = (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => {
// //     storageService.addReminder(data);
// //     setReminders(storageService.getReminders());
// //     setActivityLogs(storageService.getActivityLogs());
// //   };

// //   const handleUpdateReminder = (data: ReminderItem) => {
// //     storageService.updateReminder(data);
// //     setReminders(storageService.getReminders());
// //   };

// //   const handleDeleteReminder = (id: string) => {
// //     storageService.deleteReminder(id);
// //     setReminders(storageService.getReminders());
// //   };

// //   // Memory operations
// //   const handleAddMemory = (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => {
// //     storageService.addPersonalMemory(data);
// //     setMemories(storageService.getPersonalMemories());
// //     setActivityLogs(storageService.getActivityLogs());
// //   };

// //   const handleUpdateMemory = (data: PersonalMemory) => {
// //     storageService.updatePersonalMemory(data);
// //     setMemories(storageService.getPersonalMemories());
// //   };

// //   const handleDeleteMemory = (id: string) => {
// //     storageService.deletePersonalMemory(id);
// //     setMemories(storageService.getPersonalMemories());
// //   };

// //   const handleRecordMemoryResult = (id: string, remembered: boolean) => {
// //     storageService.recordMemoryRecallResult(id, remembered);
// //     setMemories(storageService.getPersonalMemories());
// //   };

// //   // Adaptive recall operation
// //   const handleAdaptiveAttempt = (itemId: string, selectedOptionIndex: number) => {
// //     const result = storageService.processAdaptiveAttempt(itemId, selectedOptionIndex);
// //     setAdaptiveItems(storageService.getAdaptiveItems());
// //     setAdaptiveLogs(storageService.getAdaptiveLogs());
// //     setActivityLogs(storageService.getActivityLogs());
// //     return result;
// //   };

// //   const handleFastForwardAllAdaptive = () => {
// //     storageService.fastForwardAdaptiveTimers();
// //     setAdaptiveItems(storageService.getAdaptiveItems());
// //   };

// //   // Game score recording
// //   const handleSaveGameScore = (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => {
// //     storageService.recordGameScore(scoreData);
// //     setGameScores(storageService.getGameScores());
// //     setActivityLogs(storageService.getActivityLogs());
// //   };

// //   // Profile update
// //   const handleUpdateProfile = (newProfile: CaregiverProfile) => {
// //     storageService.saveCaregiverProfile(newProfile);
// //     setProfile(newProfile);
// //   };

// //   // Count pending items for badges
// //   const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
// //   const nowMs = Date.now();
// //   const dueAdaptiveCount = adaptiveItems.filter(
// //     (item) => new Date(item.nextScheduledAt).getTime() <= nowMs
// //   ).length;

// //   // Keep the editable profile fields in sync with the signed-in Supabase user.
// //   useEffect(() => {
// //     setProfileName(String(authUser?.user_metadata?.full_name ?? ''));
// //     setProfileRole(String(authUser?.user_metadata?.role ?? 'patient'));
// //   }, [authUser]);

// //   const handleSaveUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     setProfileSaving(true);
// //     try {
// //       const { error } = await supabase.auth.updateUser({
// //         data: { full_name: profileName.trim(), role: profileRole },
// //       });
// //       if (error) {
// //         alert(error.message);
// //       } else {
// //         alert('Profile updated successfully.');
// //         setProfileOpen(false);
// //       }
// //     } catch (error: unknown) {
// //       alert(error instanceof Error ? error.message : 'Could not update profile. Please try again.');
// //     } finally {
// //       setProfileSaving(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     setLoggingOut(true);
// //     try {
// //       const { error } = await supabase.auth.signOut();
// //       if (error) alert(error.message);
// //     } catch (error: unknown) {
// //       alert(error instanceof Error ? error.message : 'Could not log out. Please try again.');
// //     } finally {
// //       setLoggingOut(false);
// //     }
// //   };

// //   const isDoctor = String(authUser?.user_metadata?.role ?? 'patient') === 'doctor';

// //   useEffect(() => {
// //     if (!authUser || !isDoctor) return;

// //     let cancelled = false;
// //     const loadDoctorPatients = async () => {
// //       setDoctorPatientsLoading(true);
// //       setDoctorPatientsError('');
// //       try {
// //         // The doctor_patients table links a doctor to only the patients assigned to them.
// //         const { data: links, error: linksError } = await supabase
// //           .from('doctor_patients')
// //           .select('patient_id')
// //           .eq('doctor_id', authUser.id);

// //         if (linksError) throw linksError;
// //         const patientIds = [...new Set((links ?? []).map((row: { patient_id: string }) => row.patient_id))];

// //         if (patientIds.length === 0) {
// //           if (!cancelled) setDoctorPatients([]);
// //           return;
// //         }

// //         const { data: patientProfiles, error: profilesError } = await supabase
// //           .from('profiles')
// //           .select('id, full_name, email')
// //           .in('id', patientIds);
// //         if (profilesError) throw profilesError;

// //         const { data: activities, error: activitiesError } = await supabase
// //           .from('activity_records')
// //           .select('patient_id, score, created_at')
// //           .in('patient_id', patientIds)
// //           .order('created_at', { ascending: false });
// //         if (activitiesError) throw activitiesError;

// //         const latestByPatient = new Map<string, { score: number | null; created_at: string }>();
// //         for (const activity of activities ?? []) {
// //           if (!latestByPatient.has(activity.patient_id)) {
// //             latestByPatient.set(activity.patient_id, {
// //               score: typeof activity.score === 'number' ? activity.score : null,
// //               created_at: activity.created_at,
// //             });
// //           }
// //         }

// //         const rows: DoctorPatientRow[] = (patientProfiles ?? []).map((patient) => {
// //           const latest = latestByPatient.get(patient.id);
// //           return {
// //             id: patient.id,
// //             full_name: patient.full_name || 'Patient',
// //             email: patient.email || 'Email unavailable',
// //             latest_score: latest?.score ?? null,
// //             latest_activity: latest?.created_at ?? null,
// //           };
// //         });

// //         if (!cancelled) setDoctorPatients(rows);
// //       } catch (error: unknown) {
// //         if (!cancelled) {
// //           setDoctorPatientsError(
// //             error instanceof Error
// //               ? error.message
// //               : 'Could not load linked patients. Check the Supabase tables and permissions.'
// //           );
// //         }
// //       } finally {
// //         if (!cancelled) setDoctorPatientsLoading(false);
// //       }
// //     };

// //     void loadDoctorPatients();
// //     return () => { cancelled = true; };
// //   }, [authUser, isDoctor]);

// //   // Font size classes
// //   const fontSizeContainerClass: Record<'normal' | 'large' | 'xlarge', string> = {
// //     normal: 'text-sm sm:text-base',
// //     large: 'text-base sm:text-lg',
// //     xlarge: 'text-lg sm:text-xl',
// //   };

// //   if (authLoading) {
// //     return <div className="flex min-h-screen items-center justify-center bg-purple-50 text-purple-800">Checking your session...</div>;
// //   }

// //   if (!authUser) {
// //     return <AuthScreen />;
// //   }

// //   if (isDoctor) {
// //     const visiblePatients = doctorPatients.filter((patient) => {
// //       const query = patientSearch.trim().toLowerCase();
// //       return !query || patient.full_name.toLowerCase().includes(query) || patient.email.toLowerCase().includes(query);
// //     });

// //     return (
// //       <div className="min-h-screen bg-[#FAF8FF] text-gray-800">
// //         <header className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4 shadow-sm">
// //           <div>
// //             <h1 className="text-2xl font-bold text-purple-800">🧠 Smriti-Saathi</h1>
// //             <p className="text-sm text-gray-500">Doctor dashboard · Patient progress overview</p>
// //           </div>
// //           <div className="flex gap-2">
// //             <button type="button" onClick={() => setProfileOpen(true)} className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50">My Profile</button>
// //             <button type="button" onClick={() => void handleLogout()} disabled={loggingOut} className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60">{loggingOut ? 'Logging out...' : 'Logout'}</button>
// //           </div>
// //         </header>

// //         <main className="mx-auto max-w-7xl p-5 sm:p-8">
// //           <section className="mb-7 rounded-2xl bg-gradient-to-r from-purple-800 to-violet-600 p-6 text-white shadow">
// //             <p className="text-sm font-medium text-purple-100">WELCOME BACK</p>
// //             <h2 className="mt-1 text-2xl font-bold">Dr. {String(authUser.user_metadata?.full_name ?? 'Doctor')}</h2>
// //             <p className="mt-2 text-purple-100">Review your assigned patients and their latest recorded activity.</p>
// //           </section>

// //           <section className="mb-5 grid gap-4 sm:grid-cols-3">
// //             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Linked patients</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.length}</p></div>
// //             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Patients with activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => p.latest_activity).length}</p></div>
// //             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Awaiting first activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => !p.latest_activity).length}</p></div>
// //           </section>

// //           <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
// //             <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
// //               <div><h3 className="text-xl font-bold text-purple-900">My Patients</h3><p className="mt-1 text-sm text-gray-500">Only patients linked to your doctor account appear here.</p></div>
// //               <input aria-label="Search patients" value={patientSearch} onChange={(event) => setPatientSearch(event.target.value)} placeholder="Search name or email..." className="w-full rounded-lg border p-3 sm:max-w-xs" />
// //             </div>
// //             {doctorPatientsLoading ? <p className="py-8 text-center text-gray-500">Loading assigned patients...</p> : null}
// //             {doctorPatientsError ? <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700"><p className="font-semibold">Could not load patient list</p><p className="mt-1">{doctorPatientsError}</p><p className="mt-2">Check that the doctor-patient tables and Supabase access policies have been created.</p></div> : null}
// //             {!doctorPatientsLoading && !doctorPatientsError && visiblePatients.length === 0 ? <div className="rounded-lg bg-purple-50 p-6 text-center"><p className="font-semibold text-purple-900">No linked patients yet</p><p className="mt-1 text-sm text-gray-600">Once an authorized assignment is added in Supabase, the patient will appear here.</p></div> : null}
// //             {visiblePatients.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full min-w-[640px] text-left text-sm">
// //                   <thead><tr className="border-b text-gray-500"><th className="px-3 py-3 font-medium">Patient</th><th className="px-3 py-3 font-medium">Email</th><th className="px-3 py-3 font-medium">Latest score</th><th className="px-3 py-3 font-medium">Last activity</th><th className="px-3 py-3 font-medium">Status</th></tr></thead>
// //                   <tbody>{visiblePatients.map((patient) => (
// //                     <tr key={patient.id} className="border-b last:border-0 hover:bg-purple-50/50">
// //                       <td className="px-3 py-4 font-semibold text-gray-800">{patient.full_name}</td>
// //                       <td className="px-3 py-4 text-gray-600">{patient.email}</td>
// //                       <td className="px-3 py-4">{patient.latest_score === null ? '—' : `${patient.latest_score}%`}</td>
// //                       <td className="px-3 py-4">{patient.latest_activity ? new Date(patient.latest_activity).toLocaleString() : 'No activity yet'}</td>
// //                       <td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.latest_activity ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{patient.latest_activity ? 'Active record found' : 'Awaiting activity'}</span></td>
// //                     </tr>
// //                   ))}</tbody>
// //                 </table>
// //               </div>
// //             ) : null}
// //           </section>
// //         </main>

// //         {profileOpen && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
// //             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
// //               <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-purple-800">Doctor Profile</h2><button type="button" onClick={() => setProfileOpen(false)} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100" aria-label="Close profile">✕</button></div>
// //               <form className="space-y-4" onSubmit={handleSaveUserProfile}>
// //                 <div><label htmlFor="doctor-profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label><input id="doctor-profile-email" value={authUser.email ?? ''} readOnly className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600" /></div>
// //                 <div><label htmlFor="doctor-profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label><input id="doctor-profile-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} required className="w-full rounded-lg border p-3" /></div>
// //                 <div><label htmlFor="doctor-profile-specialty" className="mb-1 block text-sm font-medium text-gray-700">Specialization (optional)</label><input id="doctor-profile-specialty" placeholder="e.g. Neurology" className="w-full rounded-lg border p-3" /></div>
// //                 <p className="text-xs text-gray-500">Name and role are saved to your Supabase auth profile. Specialization will need a separate profile column to be persisted.</p>
// //                 <button type="submit" disabled={profileSaving} className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60">{profileSaving ? 'Saving...' : 'Save changes'}</button>
// //               </form>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass[fontSize]}`}>
// //       {/* User account actions */}
// //       <div className="flex justify-end gap-3 bg-white px-4 py-3 shadow-sm">
// //         <button
// //           type="button"
// //           onClick={() => setProfileOpen(true)}
// //           className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50"
// //         >
// //           Profile
// //         </button>
// //         <button
// //           type="button"
// //           onClick={() => void handleLogout()}
// //           disabled={loggingOut}
// //           className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
// //         >
// //           {loggingOut ? 'Logging out...' : 'Logout'}
// //         </button>
// //       </div>

// //       {profileOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
// //           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
// //             <div className="mb-5 flex items-center justify-between">
// //               <h2 className="text-xl font-bold text-purple-800">My Profile</h2>
// //               <button
// //                 type="button"
// //                 onClick={() => setProfileOpen(false)}
// //                 className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
// //                 aria-label="Close profile"
// //               >
// //                 ✕
// //               </button>
// //             </div>
// //             <form className="space-y-4" onSubmit={handleSaveUserProfile}>
// //               <div>
// //                 <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
// //                 <input
// //                   id="profile-email"
// //                   value={authUser?.email ?? ''}
// //                   readOnly
// //                   className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
// //                 <input
// //                   id="profile-name"
// //                   value={profileName}
// //                   onChange={(event) => setProfileName(event.target.value)}
// //                   required
// //                   className="w-full rounded-lg border p-3"
// //                 />
// //               </div>
// //               <div>
// //                 <label htmlFor="profile-role" className="mb-1 block text-sm font-medium text-gray-700">Role</label>
// //                 <select
// //                   id="profile-role"
// //                   value={profileRole}
// //                   onChange={(event) => setProfileRole(event.target.value)}
// //                   className="w-full rounded-lg border bg-white p-3"
// //                 >
// //                   <option value="patient">Patient</option>
// //                   <option value="caregiver">Caregiver</option>
// //                   <option value="doctor">Doctor</option>
// //                 </select>
// //               </div>
// //               <button
// //                 type="submit"
// //                 disabled={profileSaving}
// //                 className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60"
// //               >
// //                 {profileSaving ? 'Saving...' : 'Save changes'}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Top Navbar */}
// //       <Navbar
// //         profile={profile}
// //         fontSize={fontSize}
// //         onFontSizeChange={setFontSize}
// //         soundEnabled={soundEnabled}
// //         onToggleSound={() => setSoundEnabled((prev) => !prev)}
// //         onOpenEmergency={() => setEmergencyOpen(true)}
// //         onOpenSetupGuide={() => setSetupGuideOpen(true)}
// //         mobileMenuOpen={mobileMenuOpen}
// //         onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
// //       />

// //       {/* Main Body with Sidebar & Content */}
// //       <div className="flex-1 max-w-7xl w-full mx-auto flex">
// //         {/* Left Sidebar */}
// //         <Sidebar
// //           currentPage={currentPage}
// //           onNavigate={(page) => {
// //             setCurrentPage(page);
// //             window.scrollTo({ top: 0, behavior: 'smooth' });
// //           }}
// //           pendingRemindersCount={pendingRemindersCount}
// //           dueAdaptiveCount={dueAdaptiveCount}
// //           isOpenMobile={mobileMenuOpen}
// //           onCloseMobile={() => setMobileMenuOpen(false)}
// //         />

// //         {/* Center Main View Area */}
// //         <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
// //           {currentPage === 'dashboard' && (
// //             <DashboardView
// //               profile={profile}
// //               reminders={reminders}
// //               gameScores={gameScores}
// //               adaptiveItems={adaptiveItems}
// //               onToggleReminder={handleToggleReminder}
// //               onNavigate={(page) => {
// //                 setCurrentPage(page);
// //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// //               }}
// //             />
// //           )}

// //           {currentPage === 'games' && (
// //             <MemoryGamesView
// //               profile={profile}
// //               gameScores={gameScores}
// //               onSaveScore={handleSaveGameScore}
// //             />
// //           )}

// //           {currentPage === 'adaptive' && (
// //             <AdaptiveRecallView
// //               items={adaptiveItems}
// //               logs={adaptiveLogs}
// //               onAttempt={handleAdaptiveAttempt}
// //               onFastForwardAll={handleFastForwardAllAdaptive}
// //               seniorName={profile.seniorName}
// //             />
// //           )}

// //           {currentPage === 'reminders' && (
// //             <RemindersView
// //               reminders={reminders}
// //               onToggleReminder={handleToggleReminder}
// //               onAddReminder={handleAddReminder}
// //               onUpdateReminder={handleUpdateReminder}
// //               onDeleteReminder={handleDeleteReminder}
// //               seniorName={profile.seniorName}
// //             />
// //           )}

// //           {currentPage === 'memories' && (
// //             <PersonalMemoriesView
// //               memories={memories}
// //               onAddMemory={handleAddMemory}
// //               onUpdateMemory={handleUpdateMemory}
// //               onDeleteMemory={handleDeleteMemory}
// //               onRecordResult={handleRecordMemoryResult}
// //               profile={profile}
// //             />
// //           )}

// //           {currentPage === 'progress' && (
// //             <ProgressView
// //               gameScores={gameScores}
// //               reminders={reminders}
// //               adaptiveItems={adaptiveItems}
// //               onNavigate={(page) => {
// //                 setCurrentPage(page);
// //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// //               }}
// //               seniorName={profile.seniorName}
// //             />
// //           )}

// //           {currentPage === 'caregiver' && (
// //             <CaregiverDashboardView
// //               profile={profile}
// //               reminders={reminders}
// //               gameScores={gameScores}
// //               adaptiveItems={adaptiveItems}
// //               activityLogs={activityLogs}
// //               onUpdateProfile={handleUpdateProfile}
// //               onRefreshData={refreshAllData}
// //             />
// //           )}
// //         </main>
// //       </div>

// //       {/* Emergency Helpline Modal */}
// //       <EmergencyModal
// //         isOpen={emergencyOpen}
// //         onClose={() => setEmergencyOpen(false)}
// //         profile={profile}
// //       />

// //       {/* Hackathon Setup & Export Guide Modal */}
// //       <SetupGuideModal
// //         isOpen={setupGuideOpen}
// //         onClose={() => setSetupGuideOpen(false)}
// //         onDataImported={refreshAllData}
// //       />
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { supabase } from './services/supabase';
// import type { User } from '@supabase/supabase-js';
// import { Navbar } from './components/common/Navbar';
// import { Sidebar } from './components/common/Sidebar';
// import { EmergencyModal } from './components/common/EmergencyModal';
// import { SetupGuideModal } from './components/setup/SetupGuideModal';
// import { DashboardView } from './components/dashboard/DashboardView';
// import { MemoryGamesView } from './components/games/MemoryGamesView';
// import { AdaptiveRecallView } from './components/adaptive/AdaptiveRecallView';
// import { RemindersView } from './components/reminders/RemindersView';
// import { PersonalMemoriesView } from './components/memories/PersonalMemoriesView';
// import { ProgressView } from './components/progress/ProgressView';
// import { CaregiverDashboardView } from './components/caregiver/CaregiverDashboardView';

// import {
//   PageId,
//   CaregiverProfile,
//   ReminderItem,
//   PersonalMemory,
//   AdaptiveRecallItem,
//   AdaptiveRecallLog,
//   GameScoreRecord,
//   ActivitySummary,
// } from './types';
// import { storageService } from './services/storage';
// import { soundEffects } from './services/sound';

// type DoctorPatientRow = {
//   id: string;
//   full_name: string;
//   email: string;
//   latest_score: number | null;
//   latest_activity: string | null;
// };

// function AuthScreen() {
//   const [isSignup, setIsSignup] = useState(true);
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('patient');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [submitting, setSubmitting] = useState(false);

//   const handleSignup = async () => {
//     setSubmitting(true);
//     try {
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: name, role } },
//       });
//       if (error) {
//         alert(error.message);
//       } else {
//         alert('Account created. If email confirmation is enabled, please check your inbox to confirm your account.');
//         setIsSignup(false);
//       }
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'Could not create account. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleLogin = async () => {
//     setSubmitting(true);
//     try {
//       const { error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) alert(error.message);
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'Could not log in. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         <h1 className="mb-2 text-center text-3xl font-bold text-purple-800">
//           🧠 Smriti-Saathi
//         </h1>

//         <p className="mb-6 text-center text-gray-500">
//           Memory Support & Cognitive Gaming
//         </p>

//         <div className="mb-6 grid grid-cols-2 gap-3">
//           <button
//             type="button"
//             onClick={() => setIsSignup(true)}
//             className={`rounded-lg p-3 ${
//               isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
//             }`}
//           >
//             Sign Up
//           </button>

//           <button
//             type="button"
//             onClick={() => setIsSignup(false)}
//             className={`rounded-lg p-3 ${
//               !isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
//             }`}
//           >
//             Login
//           </button>
//         </div>

// <form
//   className="space-y-4"
//   onSubmit={async (e) => {
//     e.preventDefault();

//     if (isSignup) {
//       await handleSignup();
//     } else {
//       await handleLogin();
//     }
//   }}
// >
//             {isSignup && (
//             <>
//               <input
//                 className="w-full rounded-lg border p-3"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />

//               <select
//                 className="w-full rounded-lg border bg-white p-3"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="patient">Patient</option>
//                 <option value="caregiver">Caregiver</option>
//                 <option value="doctor">Doctor</option>
//               </select>
//             </>
//           )}

//           <input
//             type="email"
//             className="w-full rounded-lg border p-3"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="w-full rounded-lg border p-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white"
          
//             disabled={submitting}
//           >
//             {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//     const [authUser, setAuthUser] = useState<User | null>(null);

//   const [authLoading, setAuthLoading] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [profileName, setProfileName] = useState('');
//   const [profileRole, setProfileRole] = useState('patient');
//   const [profileSaving, setProfileSaving] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [doctorPatients, setDoctorPatients] = useState<DoctorPatientRow[]>([]);
//   const [doctorPatientsLoading, setDoctorPatientsLoading] = useState(false);
//   const [doctorPatientsError, setDoctorPatientsError] = useState('');
//   const [patientSearch, setPatientSearch] = useState('');


//   const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
//   const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [emergencyOpen, setEmergencyOpen] = useState(false);
//   const [setupGuideOpen, setSetupGuideOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const checkSession = async () => {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error('Session error:', error.message);
//       }

//       if (isMounted) {
//         setAuthUser(data.session?.user ?? null);
//         setAuthLoading(false);
//       }
//     };

//     void checkSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setAuthUser(session?.user ?? null);
//       setAuthLoading(false);
//     });

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   // App data state
//   const [profile, setProfile] = useState<CaregiverProfile>(() => storageService.getCaregiverProfile());
//   const [reminders, setReminders] = useState<ReminderItem[]>(() => storageService.getReminders());
//   const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getPersonalMemories());
//   const [adaptiveItems, setAdaptiveItems] = useState<AdaptiveRecallItem[]>(() =>
//     storageService.getAdaptiveItems()
//   );
//   const [adaptiveLogs, setAdaptiveLogs] = useState<AdaptiveRecallLog[]>(() =>
//     storageService.getAdaptiveLogs()
//   );
//   const [gameScores, setGameScores] = useState<GameScoreRecord[]>(() =>
//     storageService.getGameScores()
//   );
//   const [activityLogs, setActivityLogs] = useState<ActivitySummary[]>(() =>
//     storageService.getActivityLogs()
//   );

//   // Sync sound setting
//   useEffect(() => {
//     soundEffects.enabled = soundEnabled;
//   }, [soundEnabled]);

//   const refreshAllData = () => {
//     setProfile(storageService.getCaregiverProfile());
//     setReminders(storageService.getReminders());
//     setMemories(storageService.getPersonalMemories());
//     setAdaptiveItems(storageService.getAdaptiveItems());
//     setAdaptiveLogs(storageService.getAdaptiveLogs());
//     setGameScores(storageService.getGameScores());
//     setActivityLogs(storageService.getActivityLogs());
//   };

//   // Reminder operations
//   const handleToggleReminder = (id: string) => {
//     storageService.toggleReminder(id);
//     setReminders(storageService.getReminders());
//     setActivityLogs(storageService.getActivityLogs());
//   };

//   const handleAddReminder = (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => {
//     storageService.addReminder(data);
//     setReminders(storageService.getReminders());
//     setActivityLogs(storageService.getActivityLogs());
//   };

//   const handleUpdateReminder = (data: ReminderItem) => {
//     storageService.updateReminder(data);
//     setReminders(storageService.getReminders());
//   };

//   const handleDeleteReminder = (id: string) => {
//     storageService.deleteReminder(id);
//     setReminders(storageService.getReminders());
//   };

//   // Memory operations
//   const handleAddMemory = (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => {
//     storageService.addPersonalMemory(data);
//     setMemories(storageService.getPersonalMemories());
//     setActivityLogs(storageService.getActivityLogs());
//   };

//   const handleUpdateMemory = (data: PersonalMemory) => {
//     storageService.updatePersonalMemory(data);
//     setMemories(storageService.getPersonalMemories());
//   };

//   const handleDeleteMemory = (id: string) => {
//     storageService.deletePersonalMemory(id);
//     setMemories(storageService.getPersonalMemories());
//   };

//   const handleRecordMemoryResult = (id: string, remembered: boolean) => {
//     storageService.recordMemoryRecallResult(id, remembered);
//     setMemories(storageService.getPersonalMemories());
//   };

//   // Adaptive recall operation
//   const handleAdaptiveAttempt = (itemId: string, selectedOptionIndex: number) => {
//     const result = storageService.processAdaptiveAttempt(itemId, selectedOptionIndex);
//     setAdaptiveItems(storageService.getAdaptiveItems());
//     setAdaptiveLogs(storageService.getAdaptiveLogs());
//     setActivityLogs(storageService.getActivityLogs());
//     return result;
//   };

//   const handleFastForwardAllAdaptive = () => {
//     storageService.fastForwardAdaptiveTimers();
//     setAdaptiveItems(storageService.getAdaptiveItems());
//   };

//   // Game score recording
//   // Save game scores locally and to Supabase
// const handleSaveGameScore = async (
//   scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>
// ) => {
//   // Keep the existing local progress tracking
//   storageService.recordGameScore(scoreData);
//   setGameScores(storageService.getGameScores());
//   setActivityLogs(storageService.getActivityLogs());

//   // Get the currently logged-in user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     console.error('Unable to identify the logged-in user:', userError);
//     alert('Your game score was saved locally, but could not be synced to the server.');
//     return;
//   }

//   // Only patients should submit patient game activity
//   if (String(user.user_metadata?.role ?? 'patient') !== 'patient') {
//     return;
//   }

//   // Save the activity against this patient's Supabase user ID
//   const { error: saveError } = await supabase
//     .from('activity_records')
//     .insert({
//       patient_id: user.id,
//       activity_name: scoreData.gameType,
//       score: scoreData.score,
//       game_type: scoreData.gameType,
//       moves: scoreData.moves ?? null,
//       total_pairs: scoreData.totalPairs ?? null,
//       sequence_length: scoreData.sequenceLength ?? null,
//       time_taken_seconds: scoreData.timeTakenSeconds,
//       difficulty: scoreData.difficulty,
//       accuracy_percentage: scoreData.accuracyPercentage,
//     });

//   if (saveError) {
//     console.error('Supabase game score save failed:', saveError);
//     alert(
//       'Your game score was saved locally, but server sync failed. Please check your Supabase permissions.'
//     );
//     return;
//   }

//   console.log('Game score successfully saved to Supabase!');
// };

//   // Profile update
//   const handleUpdateProfile = (newProfile: CaregiverProfile) => {
//     storageService.saveCaregiverProfile(newProfile);
//     setProfile(newProfile);
//   };

//   // Count pending items for badges
//   const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
//   const nowMs = Date.now();
//   const dueAdaptiveCount = adaptiveItems.filter(
//     (item) => new Date(item.nextScheduledAt).getTime() <= nowMs
//   ).length;

//   // Keep the editable profile fields in sync with the signed-in Supabase user.
//   useEffect(() => {
//     setProfileName(String(authUser?.user_metadata?.full_name ?? ''));
//     setProfileRole(String(authUser?.user_metadata?.role ?? 'patient'));
//   }, [authUser]);

//   const handleSaveUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setProfileSaving(true);
//     try {
//       const { error } = await supabase.auth.updateUser({
//         data: { full_name: profileName.trim(), role: profileRole },
//       });
//       if (error) {
//         alert(error.message);
//       } else {
//         alert('Profile updated successfully.');
//         setProfileOpen(false);
//       }
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'Could not update profile. Please try again.');
//     } finally {
//       setProfileSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     setLoggingOut(true);
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) alert(error.message);
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'Could not log out. Please try again.');
//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   const isDoctor = String(authUser?.user_metadata?.role ?? 'patient') === 'doctor';

//   useEffect(() => {
//     if (!authUser || !isDoctor) return;

//     let cancelled = false;
//     const loadDoctorPatients = async () => {
//       setDoctorPatientsLoading(true);
//       setDoctorPatientsError('');
//       try {
//         // The doctor_patients table links a doctor to only the patients assigned to them.
//         const { data: links, error: linksError } = await supabase
//           .from('doctor_patients')
//           .select('patient_id')
//           .eq('doctor_id', authUser.id);

//         if (linksError) throw linksError;
//         const patientIds = [...new Set((links ?? []).map((row: { patient_id: string }) => row.patient_id))];

//         if (patientIds.length === 0) {
//           if (!cancelled) setDoctorPatients([]);
//           return;
//         }

//         const { data: patientProfiles, error: profilesError } = await supabase
//           .from('profiles')
//           .select('id, full_name, email')
//           .in('id', patientIds);
//         if (profilesError) throw profilesError;

//         const { data: activities, error: activitiesError } = await supabase
//           .from('activity_records')
//           .select('patient_id, score, created_at')
//           .in('patient_id', patientIds)
//           .order('created_at', { ascending: false });
//         if (activitiesError) throw activitiesError;

//         const latestByPatient = new Map<string, { score: number | null; created_at: string }>();
//         for (const activity of activities ?? []) {
//           if (!latestByPatient.has(activity.patient_id)) {
//             latestByPatient.set(activity.patient_id, {
//               score: typeof activity.score === 'number' ? activity.score : null,
//               created_at: activity.created_at,
//             });
//           }
//         }

//         const rows: DoctorPatientRow[] = (patientProfiles ?? []).map((patient) => {
//           const latest = latestByPatient.get(patient.id);
//           return {
//             id: patient.id,
//             full_name: patient.full_name || 'Patient',
//             email: patient.email || 'Email unavailable',
//             latest_score: latest?.score ?? null,
//             latest_activity: latest?.created_at ?? null,
//           };
//         });

//         if (!cancelled) setDoctorPatients(rows);
//       } catch (error: unknown) {
//         if (!cancelled) {
//           setDoctorPatientsError(
//             error instanceof Error
//               ? error.message
//               : 'Could not load linked patients. Check the Supabase tables and permissions.'
//           );
//         }
//       } finally {
//         if (!cancelled) setDoctorPatientsLoading(false);
//       }
//     };

//     void loadDoctorPatients();
//     return () => { cancelled = true; };
//   }, [authUser, isDoctor]);

//   // Font size classes
//   const fontSizeContainerClass: Record<'normal' | 'large' | 'xlarge', string> = {
//     normal: 'text-sm sm:text-base',
//     large: 'text-base sm:text-lg',
//     xlarge: 'text-lg sm:text-xl',
//   };

//   if (authLoading) {
//     return <div className="flex min-h-screen items-center justify-center bg-purple-50 text-purple-800">Checking your session...</div>;
//   }

//   if (!authUser) {
//     return <AuthScreen />;
//   }

//   if (isDoctor) {
//     const visiblePatients = doctorPatients.filter((patient) => {
//       const query = patientSearch.trim().toLowerCase();
//       return !query || patient.full_name.toLowerCase().includes(query) || patient.email.toLowerCase().includes(query);
//     });

//     return (
//       <div className="min-h-screen bg-[#FAF8FF] text-gray-800">
//         <header className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4 shadow-sm">
//           <div>
//             <h1 className="text-2xl font-bold text-purple-800">🧠 Smriti-Saathi</h1>
//             <p className="text-sm text-gray-500">Doctor dashboard · Patient progress overview</p>
//           </div>
//           <div className="flex gap-2">
//             <button type="button" onClick={() => setProfileOpen(true)} className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50">My Profile</button>
//             <button type="button" onClick={() => void handleLogout()} disabled={loggingOut} className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60">{loggingOut ? 'Logging out...' : 'Logout'}</button>
//           </div>
//         </header>

//         <main className="mx-auto max-w-7xl p-5 sm:p-8">
//           <section className="mb-7 rounded-2xl bg-gradient-to-r from-purple-800 to-violet-600 p-6 text-white shadow">
//             <p className="text-sm font-medium text-purple-100">WELCOME BACK</p>
//             <h2 className="mt-1 text-2xl font-bold">Dr. {String(authUser.user_metadata?.full_name ?? 'Doctor')}</h2>
//             <p className="mt-2 text-purple-100">Review your assigned patients and their latest recorded activity.</p>
//           </section>

//           <section className="mb-5 grid gap-4 sm:grid-cols-3">
//             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Linked patients</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.length}</p></div>
//             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Patients with activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => p.latest_activity).length}</p></div>
//             <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Awaiting first activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => !p.latest_activity).length}</p></div>
//           </section>

//           <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//               <div><h3 className="text-xl font-bold text-purple-900">My Patients</h3><p className="mt-1 text-sm text-gray-500">Only patients linked to your doctor account appear here.</p></div>
//               <input aria-label="Search patients" value={patientSearch} onChange={(event) => setPatientSearch(event.target.value)} placeholder="Search name or email..." className="w-full rounded-lg border p-3 sm:max-w-xs" />
//             </div>
//             {doctorPatientsLoading ? <p className="py-8 text-center text-gray-500">Loading assigned patients...</p> : null}
//             {doctorPatientsError ? <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700"><p className="font-semibold">Could not load patient list</p><p className="mt-1">{doctorPatientsError}</p><p className="mt-2">Check that the doctor-patient tables and Supabase access policies have been created.</p></div> : null}
//             {!doctorPatientsLoading && !doctorPatientsError && visiblePatients.length === 0 ? <div className="rounded-lg bg-purple-50 p-6 text-center"><p className="font-semibold text-purple-900">No linked patients yet</p><p className="mt-1 text-sm text-gray-600">Once an authorized assignment is added in Supabase, the patient will appear here.</p></div> : null}
//             {visiblePatients.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[640px] text-left text-sm">
//                   <thead><tr className="border-b text-gray-500"><th className="px-3 py-3 font-medium">Patient</th><th className="px-3 py-3 font-medium">Email</th><th className="px-3 py-3 font-medium">Latest score</th><th className="px-3 py-3 font-medium">Last activity</th><th className="px-3 py-3 font-medium">Status</th></tr></thead>
//                   <tbody>{visiblePatients.map((patient) => (
//                     <tr key={patient.id} className="border-b last:border-0 hover:bg-purple-50/50">
//                       <td className="px-3 py-4 font-semibold text-gray-800">{patient.full_name}</td>
//                       <td className="px-3 py-4 text-gray-600">{patient.email}</td>
//                       <td className="px-3 py-4">{patient.latest_score === null ? '—' : `${patient.latest_score}%`}</td>
//                       <td className="px-3 py-4">{patient.latest_activity ? new Date(patient.latest_activity).toLocaleString() : 'No activity yet'}</td>
//                       <td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.latest_activity ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{patient.latest_activity ? 'Active record found' : 'Awaiting activity'}</span></td>
//                     </tr>
//                   ))}</tbody>
//                 </table>
//               </div>
//             ) : null}
//           </section>
//         </main>

//         {profileOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//               <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-purple-800">Doctor Profile</h2><button type="button" onClick={() => setProfileOpen(false)} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100" aria-label="Close profile">✕</button></div>
//               <form className="space-y-4" onSubmit={handleSaveUserProfile}>
//                 <div><label htmlFor="doctor-profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label><input id="doctor-profile-email" value={authUser.email ?? ''} readOnly className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600" /></div>
//                 <div><label htmlFor="doctor-profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label><input id="doctor-profile-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} required className="w-full rounded-lg border p-3" /></div>
//                 <div><label htmlFor="doctor-profile-specialty" className="mb-1 block text-sm font-medium text-gray-700">Specialization (optional)</label><input id="doctor-profile-specialty" placeholder="e.g. Neurology" className="w-full rounded-lg border p-3" /></div>
//                 <p className="text-xs text-gray-500">Name and role are saved to your Supabase auth profile. Specialization will need a separate profile column to be persisted.</p>
//                 <button type="submit" disabled={profileSaving} className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60">{profileSaving ? 'Saving...' : 'Save changes'}</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass[fontSize]}`}>
//       {/* User account actions */}
//       <div className="flex justify-end gap-3 bg-white px-4 py-3 shadow-sm">
//         <button
//           type="button"
//           onClick={() => setProfileOpen(true)}
//           className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50"
//         >
//           Profile
//         </button>
//         <button
//           type="button"
//           onClick={() => void handleLogout()}
//           disabled={loggingOut}
//           className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
//         >
//           {loggingOut ? 'Logging out...' : 'Logout'}
//         </button>
//       </div>

//       {profileOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-purple-800">My Profile</h2>
//               <button
//                 type="button"
//                 onClick={() => setProfileOpen(false)}
//                 className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
//                 aria-label="Close profile"
//               >
//                 ✕
//               </button>
//             </div>
//             <form className="space-y-4" onSubmit={handleSaveUserProfile}>
//               <div>
//                 <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   id="profile-email"
//                   value={authUser?.email ?? ''}
//                   readOnly
//                   className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
//                 <input
//                   id="profile-name"
//                   value={profileName}
//                   onChange={(event) => setProfileName(event.target.value)}
//                   required
//                   className="w-full rounded-lg border p-3"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="profile-role" className="mb-1 block text-sm font-medium text-gray-700">Role</label>
//                 <select
//                   id="profile-role"
//                   value={profileRole}
//                   onChange={(event) => setProfileRole(event.target.value)}
//                   className="w-full rounded-lg border bg-white p-3"
//                 >
//                   <option value="patient">Patient</option>
//                   <option value="caregiver">Caregiver</option>
//                   <option value="doctor">Doctor</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 disabled={profileSaving}
//                 className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60"
//               >
//                 {profileSaving ? 'Saving...' : 'Save changes'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Top Navbar */}
//       <Navbar
//         profile={profile}
//         fontSize={fontSize}
//         onFontSizeChange={setFontSize}
//         soundEnabled={soundEnabled}
//         onToggleSound={() => setSoundEnabled((prev) => !prev)}
//         onOpenEmergency={() => setEmergencyOpen(true)}
//         onOpenSetupGuide={() => setSetupGuideOpen(true)}
//         mobileMenuOpen={mobileMenuOpen}
//         onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
//       />

//       {/* Main Body with Sidebar & Content */}
//       <div className="flex-1 max-w-7xl w-full mx-auto flex">
//         {/* Left Sidebar */}
//         <Sidebar
//           currentPage={currentPage}
//           onNavigate={(page) => {
//             setCurrentPage(page);
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//           }}
//           pendingRemindersCount={pendingRemindersCount}
//           dueAdaptiveCount={dueAdaptiveCount}
//           isOpenMobile={mobileMenuOpen}
//           onCloseMobile={() => setMobileMenuOpen(false)}
//         />

//         {/* Center Main View Area */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
//           {currentPage === 'dashboard' && (
//             <DashboardView
//               profile={profile}
//               reminders={reminders}
//               gameScores={gameScores}
//               adaptiveItems={adaptiveItems}
//               onToggleReminder={handleToggleReminder}
//               onNavigate={(page) => {
//                 setCurrentPage(page);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//             />
//           )}

//           {currentPage === 'games' && (
//             <MemoryGamesView
//               profile={profile}
//               gameScores={gameScores}
//               onSaveScore={handleSaveGameScore}
//             />
//           )}

//           {currentPage === 'adaptive' && (
//             <AdaptiveRecallView
//               items={adaptiveItems}
//               logs={adaptiveLogs}
//               onAttempt={handleAdaptiveAttempt}
//               onFastForwardAll={handleFastForwardAllAdaptive}
//               seniorName={profile.seniorName}
//             />
//           )}

//           {currentPage === 'reminders' && (
//             <RemindersView
//               reminders={reminders}
//               onToggleReminder={handleToggleReminder}
//               onAddReminder={handleAddReminder}
//               onUpdateReminder={handleUpdateReminder}
//               onDeleteReminder={handleDeleteReminder}
//               seniorName={profile.seniorName}
//             />
//           )}

//           {currentPage === 'memories' && (
//             <PersonalMemoriesView
//               memories={memories}
//               onAddMemory={handleAddMemory}
//               onUpdateMemory={handleUpdateMemory}
//               onDeleteMemory={handleDeleteMemory}
//               onRecordResult={handleRecordMemoryResult}
//               profile={profile}
//             />
//           )}

//           {currentPage === 'progress' && (
//             <ProgressView
//               gameScores={gameScores}
//               reminders={reminders}
//               adaptiveItems={adaptiveItems}
//               onNavigate={(page) => {
//                 setCurrentPage(page);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//               seniorName={profile.seniorName}
//             />
//           )}

//           {currentPage === 'caregiver' && (
//             <CaregiverDashboardView
//               profile={profile}
//               reminders={reminders}
//               gameScores={gameScores}
//               adaptiveItems={adaptiveItems}
//               activityLogs={activityLogs}
//               onUpdateProfile={handleUpdateProfile}
//               onRefreshData={refreshAllData}
//             />
//           )}
//         </main>
//       </div>

//       {/* Emergency Helpline Modal */}
//       <EmergencyModal
//         isOpen={emergencyOpen}
//         onClose={() => setEmergencyOpen(false)}
//         profile={profile}
//       />

//       {/* Hackathon Setup & Export Guide Modal */}
//       <SetupGuideModal
//         isOpen={setupGuideOpen}
//         onClose={() => setSetupGuideOpen(false)}
//         onDataImported={refreshAllData}
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import type { User } from '@supabase/supabase-js';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { EmergencyModal } from './components/common/EmergencyModal';
import { SetupGuideModal } from './components/setup/SetupGuideModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { MemoryGamesView } from './components/games/MemoryGamesView';
import { AdaptiveRecallView } from './components/adaptive/AdaptiveRecallView';
import { RemindersView } from './components/reminders/RemindersView';
import { PersonalMemoriesView } from './components/memories/PersonalMemoriesView';
import { ProgressView } from './components/progress/ProgressView';
import { CaregiverDashboardView } from './components/caregiver/CaregiverDashboardView';

import {
  PageId,
  CaregiverProfile,
  ReminderItem,
  PersonalMemory,
  AdaptiveRecallItem,
  AdaptiveRecallLog,
  GameScoreRecord,
  ActivitySummary,
} from './types';
import { storageService } from './services/storage';
import { soundEffects } from './services/sound';

type DoctorPatientRow = {
  id: string;
  full_name: string;
  email: string;
  latest_score: number | null;
  latest_activity: string | null;
};

function AuthScreen() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name, role } },
      });
      if (error) {
        alert(error.message);
      } else {
        alert('Account created. If email confirmation is enabled, please check your inbox to confirm your account.');
        setIsSignup(false);
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Could not create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Could not log in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-purple-800">
          🧠 Smriti-Saathi
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Memory Support & Cognitive Gaming
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`rounded-lg p-3 ${
              isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
            }`}
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`rounded-lg p-3 ${
              !isSignup ? 'bg-purple-700 text-white' : 'bg-gray-100'
            }`}
          >
            Login
          </button>
        </div>

<form
  className="space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();

    if (isSignup) {
      await handleSignup();
    } else {
      await handleLogin();
    }
  }}
>
            {isSignup && (
            <>
              <input
                className="w-full rounded-lg border p-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <select
                className="w-full rounded-lg border bg-white p-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="caregiver">Caregiver</option>
                <option value="doctor">Doctor</option>
              </select>
            </>
          )}

          <input
            type="email"
            className="w-full rounded-lg border p-3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full rounded-lg border p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white"
          
            disabled={submitting}
          >
            {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
    const [authUser, setAuthUser] = useState<User | null>(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileRole, setProfileRole] = useState('patient');
  const [profileSaving, setProfileSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [doctorPatients, setDoctorPatients] = useState<DoctorPatientRow[]>([]);
  const [doctorPatientsLoading, setDoctorPatientsLoading] = useState(false);
  const [doctorPatientsError, setDoctorPatientsError] = useState('');
  const [patientSearch, setPatientSearch] = useState('');


  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [setupGuideOpen, setSetupGuideOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accessibility preferences and daily in-app/browser reminder.
  const [preferredLanguage, setPreferredLanguage] = useState(
    () => localStorage.getItem('smriti-language') || 'en'
  );
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(
    () => localStorage.getItem('smriti-daily-reminder-enabled') !== 'false'
  );
  const [dailyReminderTime, setDailyReminderTime] = useState(
    () => localStorage.getItem('smriti-daily-reminder-time') || '09:00'
  );
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('smriti-language', preferredLanguage);
    document.documentElement.lang = preferredLanguage;
  }, [preferredLanguage]);

  useEffect(() => {
    localStorage.setItem('smriti-daily-reminder-enabled', String(dailyReminderEnabled));
  }, [dailyReminderEnabled]);

  useEffect(() => {
    localStorage.setItem('smriti-daily-reminder-time', dailyReminderTime);
  }, [dailyReminderTime]);

  useEffect(() => {
    if (!dailyReminderEnabled) return;

    const checkDailyReminder = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      if (currentTime !== dailyReminderTime || localStorage.getItem('smriti-reminder-last-shown') === today) return;

      localStorage.setItem('smriti-reminder-last-shown', today);
      setNotificationMessage('It is time for your daily memory exercise.');
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Smriti-Saathi daily reminder', {
          body: 'Take a few minutes for your daily memory exercise.',
          tag: 'smriti-daily-reminder',
        });
      }
    };

    checkDailyReminder();
    const timer = window.setInterval(checkDailyReminder, 30000);
    return () => window.clearInterval(timer);
  }, [dailyReminderEnabled, dailyReminderTime]);

  const requestBrowserNotifications = async () => {
    if (!('Notification' in window)) {
      setNotificationMessage('This browser does not support notifications. In-app reminders will still work while the app is open.');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotificationMessage(
        permission === 'granted'
          ? 'Browser notifications enabled.'
          : 'Notifications were not enabled. In-app reminders will still work while the app is open.'
      );
    } catch {
      setNotificationMessage('Could not request notification permission in this browser.');
    }
  };

  const languageLabels: Record<string, string> = {
    en: 'English', hi: 'हिन्दी', bn: 'বাংলা', mr: 'मराठी', ta: 'தமிழ்', te: 'తెలుగు',
  };


  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error.message);
      }

      if (isMounted) {
        setAuthUser(data.session?.user ?? null);
        setAuthLoading(false);
      }
    };

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // App data state
  const [profile, setProfile] = useState<CaregiverProfile>(() => storageService.getCaregiverProfile());
  const [reminders, setReminders] = useState<ReminderItem[]>(() => storageService.getReminders());
  const [memories, setMemories] = useState<PersonalMemory[]>(() => storageService.getPersonalMemories());
  const [adaptiveItems, setAdaptiveItems] = useState<AdaptiveRecallItem[]>(() =>
    storageService.getAdaptiveItems()
  );
  const [adaptiveLogs, setAdaptiveLogs] = useState<AdaptiveRecallLog[]>(() =>
    storageService.getAdaptiveLogs()
  );
  const [gameScores, setGameScores] = useState<GameScoreRecord[]>(() =>
    storageService.getGameScores()
  );
  const [activityLogs, setActivityLogs] = useState<ActivitySummary[]>(() =>
    storageService.getActivityLogs()
  );

  // Sync sound setting
  useEffect(() => {
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  const refreshAllData = () => {
    setProfile(storageService.getCaregiverProfile());
    setReminders(storageService.getReminders());
    setMemories(storageService.getPersonalMemories());
    setAdaptiveItems(storageService.getAdaptiveItems());
    setAdaptiveLogs(storageService.getAdaptiveLogs());
    setGameScores(storageService.getGameScores());
    setActivityLogs(storageService.getActivityLogs());
  };

  // Reminder operations
  const handleToggleReminder = (id: string) => {
    storageService.toggleReminder(id);
    setReminders(storageService.getReminders());
    setActivityLogs(storageService.getActivityLogs());
  };

  const handleAddReminder = (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => {
    storageService.addReminder(data);
    setReminders(storageService.getReminders());
    setActivityLogs(storageService.getActivityLogs());
  };

  const handleUpdateReminder = (data: ReminderItem) => {
    storageService.updateReminder(data);
    setReminders(storageService.getReminders());
  };

  const handleDeleteReminder = (id: string) => {
    storageService.deleteReminder(id);
    setReminders(storageService.getReminders());
  };

  // Memory operations
  const handleAddMemory = (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => {
    storageService.addPersonalMemory(data);
    setMemories(storageService.getPersonalMemories());
    setActivityLogs(storageService.getActivityLogs());
  };

  const handleUpdateMemory = (data: PersonalMemory) => {
    storageService.updatePersonalMemory(data);
    setMemories(storageService.getPersonalMemories());
  };

  const handleDeleteMemory = (id: string) => {
    storageService.deletePersonalMemory(id);
    setMemories(storageService.getPersonalMemories());
  };

  const handleRecordMemoryResult = (id: string, remembered: boolean) => {
    storageService.recordMemoryRecallResult(id, remembered);
    setMemories(storageService.getPersonalMemories());
  };

  // Adaptive recall operation
  const handleAdaptiveAttempt = (itemId: string, selectedOptionIndex: number) => {
    const result = storageService.processAdaptiveAttempt(itemId, selectedOptionIndex);
    setAdaptiveItems(storageService.getAdaptiveItems());
    setAdaptiveLogs(storageService.getAdaptiveLogs());
    setActivityLogs(storageService.getActivityLogs());
    return result;
  };

  const handleFastForwardAllAdaptive = () => {
    storageService.fastForwardAdaptiveTimers();
    setAdaptiveItems(storageService.getAdaptiveItems());
  };

  // Game score recording
  // Save game scores locally and to Supabase
const handleSaveGameScore = async (
  scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>
) => {
  // Keep the existing local progress tracking
  storageService.recordGameScore(scoreData);
  setGameScores(storageService.getGameScores());
  setActivityLogs(storageService.getActivityLogs());

  // Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Unable to identify the logged-in user:', userError);
    alert('Your game score was saved locally, but could not be synced to the server.');
    return;
  }

  // Only patients should submit patient game activity
  if (String(user.user_metadata?.role ?? 'patient') !== 'patient') {
    return;
  }

  // Save the activity against this patient's Supabase user ID
  const { error: saveError } = await supabase
    .from('activity_records')
    .insert({
      patient_id: user.id,
      activity_name: scoreData.gameType,
      score: scoreData.score,
      game_type: scoreData.gameType,
      moves: scoreData.moves ?? null,
      total_pairs: scoreData.totalPairs ?? null,
      sequence_length: scoreData.sequenceLength ?? null,
      time_taken_seconds: scoreData.timeTakenSeconds,
      difficulty: scoreData.difficulty,
      accuracy_percentage: scoreData.accuracyPercentage,
    });

  if (saveError) {
    console.error('Supabase game score save failed:', saveError);
    alert(
      'Your game score was saved locally, but server sync failed. Please check your Supabase permissions.'
    );
    return;
  }

  console.log('Game score successfully saved to Supabase!');
};

  // Profile update
  const handleUpdateProfile = (newProfile: CaregiverProfile) => {
    storageService.saveCaregiverProfile(newProfile);
    setProfile(newProfile);
  };

  // Count pending items for badges
  const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
  const nowMs = Date.now();
  const dueAdaptiveCount = adaptiveItems.filter(
    (item) => new Date(item.nextScheduledAt).getTime() <= nowMs
  ).length;

  // Keep the editable profile fields in sync with the signed-in Supabase user.
  useEffect(() => {
    setProfileName(String(authUser?.user_metadata?.full_name ?? ''));
    setProfileRole(String(authUser?.user_metadata?.role ?? 'patient'));
  }, [authUser]);

  const handleSaveUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: profileName.trim(), role: profileRole },
      });
      if (error) {
        alert(error.message);
      } else {
        alert('Profile updated successfully.');
        setProfileOpen(false);
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Could not update profile. Please try again.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) alert(error.message);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Could not log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const isDoctor = String(authUser?.user_metadata?.role ?? 'patient') === 'doctor';

  useEffect(() => {
    if (!authUser || !isDoctor) return;

    let cancelled = false;
    const loadDoctorPatients = async () => {
      setDoctorPatientsLoading(true);
      setDoctorPatientsError('');
      try {
        // The doctor_patients table links a doctor to only the patients assigned to them.
        const { data: links, error: linksError } = await supabase
          .from('doctor_patients')
          .select('patient_id')
          .eq('doctor_id', authUser.id);

        if (linksError) throw linksError;
        const patientIds = [...new Set((links ?? []).map((row: { patient_id: string }) => row.patient_id))];

        if (patientIds.length === 0) {
          if (!cancelled) setDoctorPatients([]);
          return;
        }

        const { data: patientProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', patientIds);
        if (profilesError) throw profilesError;

        const { data: activities, error: activitiesError } = await supabase
          .from('activity_records')
          .select('patient_id, score, created_at')
          .in('patient_id', patientIds)
          .order('created_at', { ascending: false });
        if (activitiesError) throw activitiesError;

        const latestByPatient = new Map<string, { score: number | null; created_at: string }>();
        for (const activity of activities ?? []) {
          if (!latestByPatient.has(activity.patient_id)) {
            latestByPatient.set(activity.patient_id, {
              score: typeof activity.score === 'number' ? activity.score : null,
              created_at: activity.created_at,
            });
          }
        }

        const rows: DoctorPatientRow[] = (patientProfiles ?? []).map((patient) => {
          const latest = latestByPatient.get(patient.id);
          return {
            id: patient.id,
            full_name: patient.full_name || 'Patient',
            email: patient.email || 'Email unavailable',
            latest_score: latest?.score ?? null,
            latest_activity: latest?.created_at ?? null,
          };
        });

        if (!cancelled) setDoctorPatients(rows);
      } catch (error: unknown) {
        if (!cancelled) {
          setDoctorPatientsError(
            error instanceof Error
              ? error.message
              : 'Could not load linked patients. Check the Supabase tables and permissions.'
          );
        }
      } finally {
        if (!cancelled) setDoctorPatientsLoading(false);
      }
    };

    void loadDoctorPatients();
    return () => { cancelled = true; };
  }, [authUser, isDoctor]);

  // Font size classes
  const fontSizeContainerClass: Record<'normal' | 'large' | 'xlarge', string> = {
    normal: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
    xlarge: 'text-lg sm:text-xl',
  };

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-purple-50 text-purple-800">Checking your session...</div>;
  }

  if (!authUser) {
    return <AuthScreen />;
  }

  if (isDoctor) {
    const visiblePatients = doctorPatients.filter((patient) => {
      const query = patientSearch.trim().toLowerCase();
      return !query || patient.full_name.toLowerCase().includes(query) || patient.email.toLowerCase().includes(query);
    });

    return (
      <div className="min-h-screen bg-[#FAF8FF] text-gray-800">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-purple-800">🧠 Smriti-Saathi</h1>
            <p className="text-sm text-gray-500">Doctor dashboard · Patient progress overview</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setProfileOpen(true)} className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50">My Profile</button>
            <button type="button" onClick={() => void handleLogout()} disabled={loggingOut} className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60">{loggingOut ? 'Logging out...' : 'Logout'}</button>
          </div>
        </header>


        <section className="ss-preferences" aria-label="Accessibility and reminders">
          <label className="ss-preference-field">
            <span>🌐 Language</span>
            <select value={preferredLanguage} onChange={(event) => setPreferredLanguage(event.target.value)} aria-label="Choose language">
              <option value="en">English</option><option value="hi">हिन्दी</option><option value="bn">বাংলা</option>
              <option value="mr">मराठी</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option>
            </select>
          </label>
          <label className="ss-preference-field ss-reminder-toggle">
            <input type="checkbox" checked={dailyReminderEnabled} onChange={(event) => setDailyReminderEnabled(event.target.checked)} />
            <span>Daily reminder</span>
          </label>
          <label className="ss-preference-field">
            <span>⏰ Reminder time</span>
            <input type="time" value={dailyReminderTime} onChange={(event) => setDailyReminderTime(event.target.value)} disabled={!dailyReminderEnabled} />
          </label>
          <button type="button" className="ss-notification-button" onClick={() => void requestBrowserNotifications()}>
            🔔 Enable notifications
          </button>
          {notificationMessage && <p className="ss-notification-status" role="status">{notificationMessage}</p>}
        </section>

        <main className="mx-auto max-w-7xl p-5 sm:p-8">
          <section className="mb-7 rounded-2xl bg-gradient-to-r from-purple-800 to-violet-600 p-6 text-white shadow">
            <p className="text-sm font-medium text-purple-100">WELCOME BACK</p>
            <h2 className="mt-1 text-2xl font-bold">Dr. {String(authUser.user_metadata?.full_name ?? 'Doctor')}</h2>
            <p className="mt-2 text-purple-100">Review your assigned patients and their latest recorded activity.</p>
          </section>

          <section className="mb-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Linked patients</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.length}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Patients with activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => p.latest_activity).length}</p></div>
            <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Awaiting first activity</p><p className="mt-2 text-3xl font-bold text-purple-800">{doctorPatients.filter((p) => !p.latest_activity).length}</p></div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div><h3 className="text-xl font-bold text-purple-900">My Patients</h3><p className="mt-1 text-sm text-gray-500">Only patients linked to your doctor account appear here.</p></div>
              <input aria-label="Search patients" value={patientSearch} onChange={(event) => setPatientSearch(event.target.value)} placeholder="Search name or email..." className="w-full rounded-lg border p-3 sm:max-w-xs" />
            </div>
            {doctorPatientsLoading ? <p className="py-8 text-center text-gray-500">Loading assigned patients...</p> : null}
            {doctorPatientsError ? <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700"><p className="font-semibold">Could not load patient list</p><p className="mt-1">{doctorPatientsError}</p><p className="mt-2">Check that the doctor-patient tables and Supabase access policies have been created.</p></div> : null}
            {!doctorPatientsLoading && !doctorPatientsError && visiblePatients.length === 0 ? <div className="rounded-lg bg-purple-50 p-6 text-center"><p className="font-semibold text-purple-900">No linked patients yet</p><p className="mt-1 text-sm text-gray-600">Once an authorized assignment is added in Supabase, the patient will appear here.</p></div> : null}
            {visiblePatients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead><tr className="border-b text-gray-500"><th className="px-3 py-3 font-medium">Patient</th><th className="px-3 py-3 font-medium">Email</th><th className="px-3 py-3 font-medium">Latest score</th><th className="px-3 py-3 font-medium">Last activity</th><th className="px-3 py-3 font-medium">Status</th></tr></thead>
                  <tbody>{visiblePatients.map((patient) => (
                    <tr key={patient.id} className="border-b last:border-0 hover:bg-purple-50/50">
                      <td className="px-3 py-4 font-semibold text-gray-800">{patient.full_name}</td>
                      <td className="px-3 py-4 text-gray-600">{patient.email}</td>
                      <td className="px-3 py-4">{patient.latest_score === null ? '—' : `${patient.latest_score}%`}</td>
                      <td className="px-3 py-4">{patient.latest_activity ? new Date(patient.latest_activity).toLocaleString() : 'No activity yet'}</td>
                      <td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.latest_activity ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{patient.latest_activity ? 'Active record found' : 'Awaiting activity'}</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            ) : null}
          </section>
        </main>

        {profileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-purple-800">Doctor Profile</h2><button type="button" onClick={() => setProfileOpen(false)} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100" aria-label="Close profile">✕</button></div>
              <form className="space-y-4" onSubmit={handleSaveUserProfile}>
                <div><label htmlFor="doctor-profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label><input id="doctor-profile-email" value={authUser.email ?? ''} readOnly className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600" /></div>
                <div><label htmlFor="doctor-profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label><input id="doctor-profile-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} required className="w-full rounded-lg border p-3" /></div>
                <div><label htmlFor="doctor-profile-specialty" className="mb-1 block text-sm font-medium text-gray-700">Specialization (optional)</label><input id="doctor-profile-specialty" placeholder="e.g. Neurology" className="w-full rounded-lg border p-3" /></div>
                <p className="text-xs text-gray-500">Name and role are saved to your Supabase auth profile. Specialization will need a separate profile column to be persisted.</p>
                <button type="submit" disabled={profileSaving} className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60">{profileSaving ? 'Saving...' : 'Save changes'}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass[fontSize]}`}>
      
        <section className="ss-preferences" aria-label="Accessibility and reminders">
          <label className="ss-preference-field">
            <span>🌐 Language</span>
            <select value={preferredLanguage} onChange={(event) => setPreferredLanguage(event.target.value)} aria-label="Choose language">
              <option value="en">English</option><option value="hi">हिन्दी</option><option value="bn">বাংলা</option>
              <option value="mr">मराठी</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option>
            </select>
          </label>
          <label className="ss-preference-field ss-reminder-toggle">
            <input type="checkbox" checked={dailyReminderEnabled} onChange={(event) => setDailyReminderEnabled(event.target.checked)} />
            <span>Daily reminder</span>
          </label>
          <label className="ss-preference-field">
            <span>⏰ Reminder time</span>
            <input type="time" value={dailyReminderTime} onChange={(event) => setDailyReminderTime(event.target.value)} disabled={!dailyReminderEnabled} />
          </label>
          <button type="button" className="ss-notification-button" onClick={() => void requestBrowserNotifications()}>
            🔔 Enable notifications
          </button>
          {notificationMessage && <p className="ss-notification-status" role="status">{notificationMessage}</p>}
        </section>
      {/* User account actions */}
      <div className="flex justify-end gap-3 bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className="rounded-lg border border-purple-200 px-4 py-2 font-medium text-purple-800 hover:bg-purple-50"
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={loggingOut}
          className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-purple-800">My Profile</h2>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
                aria-label="Close profile"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSaveUserProfile}>
              <div>
                <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="profile-email"
                  value={authUser?.email ?? ''}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
                />
              </div>
              <div>
                <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                <input
                  id="profile-name"
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>
              <div>
                <label htmlFor="profile-role" className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  id="profile-role"
                  value={profileRole}
                  onChange={(event) => setProfileRole(event.target.value)}
                  className="w-full rounded-lg border bg-white p-3"
                >
                  <option value="patient">Patient</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={profileSaving}
                className="w-full rounded-lg bg-purple-700 p-3 font-semibold text-white disabled:opacity-60"
              >
                {profileSaving ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        profile={profile}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenEmergency={() => setEmergencyOpen(true)}
        onOpenSetupGuide={() => setSetupGuideOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          pendingRemindersCount={pendingRemindersCount}
          dueAdaptiveCount={dueAdaptiveCount}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Center Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentPage === 'dashboard' && (
            <DashboardView
              profile={profile}
              reminders={reminders}
              gameScores={gameScores}
              adaptiveItems={adaptiveItems}
              onToggleReminder={handleToggleReminder}
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentPage === 'games' && (
            <MemoryGamesView
              profile={profile}
              gameScores={gameScores}
              onSaveScore={handleSaveGameScore}
            />
          )}

          {currentPage === 'adaptive' && (
            <AdaptiveRecallView
              items={adaptiveItems}
              logs={adaptiveLogs}
              onAttempt={handleAdaptiveAttempt}
              onFastForwardAll={handleFastForwardAllAdaptive}
              seniorName={profile.seniorName}
            />
          )}

          {currentPage === 'reminders' && (
            <RemindersView
              reminders={reminders}
              onToggleReminder={handleToggleReminder}
              onAddReminder={handleAddReminder}
              onUpdateReminder={handleUpdateReminder}
              onDeleteReminder={handleDeleteReminder}
              seniorName={profile.seniorName}
            />
          )}

          {currentPage === 'memories' && (
            <PersonalMemoriesView
              memories={memories}
              onAddMemory={handleAddMemory}
              onUpdateMemory={handleUpdateMemory}
              onDeleteMemory={handleDeleteMemory}
              onRecordResult={handleRecordMemoryResult}
              profile={profile}
            />
          )}

          {currentPage === 'progress' && (
            <ProgressView
              gameScores={gameScores}
              reminders={reminders}
              adaptiveItems={adaptiveItems}
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              seniorName={profile.seniorName}
            />
          )}

          {currentPage === 'caregiver' && (
            <CaregiverDashboardView
              profile={profile}
              reminders={reminders}
              gameScores={gameScores}
              adaptiveItems={adaptiveItems}
              activityLogs={activityLogs}
              onUpdateProfile={handleUpdateProfile}
              onRefreshData={refreshAllData}
            />
          )}
        </main>
      </div>

      {/* Emergency Helpline Modal */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        profile={profile}
      />

      {/* Hackathon Setup & Export Guide Modal */}
      <SetupGuideModal
        isOpen={setupGuideOpen}
        onClose={() => setSetupGuideOpen(false)}
        onDataImported={refreshAllData}
      />
    </div>
  );
}
