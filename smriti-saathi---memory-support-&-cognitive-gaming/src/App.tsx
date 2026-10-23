import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [setupGuideOpen, setSetupGuideOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const handleSaveGameScore = (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => {
    storageService.recordGameScore(scoreData);
    setGameScores(storageService.getGameScores());
    setActivityLogs(storageService.getActivityLogs());
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

  // Font size classes
  const fontSizeContainerClass = {
    normal: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
    xlarge: 'text-lg sm:text-xl',
  }[fontSize];

  return (
    <div className={`min-h-screen bg-[#FAF8FF] flex flex-col ${fontSizeContainerClass}`}>
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
