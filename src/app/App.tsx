import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { StatusToast } from '../components/StatusToast';
import { GameProvider, useGameApp } from './GameProvider';
import { GameScreen } from '../screens/GameScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { MainMenuScreen } from '../screens/MainMenuScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SessionEndScreen } from '../screens/SessionEndScreen';
import { SignalsScreen } from '../screens/SignalsScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const AppContent = () => {
  const { screen, t, toast } = useGameApp();

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'menu':
        return <MainMenuScreen />;
      case 'game':
        return <GameScreen />;
      case 'results':
        return <SessionEndScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'signals':
        return <SignalsScreen />;
      default:
        return <MainMenuScreen />;
    }
  };

  return (
    <AppErrorBoundary
      body={t('fallback.errorBody')}
      retryLabel={t('fallback.reload')}
      title={t('fallback.errorTitle')}
    >
      {renderScreen()}
      {toast ? <StatusToast message={toast.message} tone={toast.tone} /> : null}
    </AppErrorBoundary>
  );
};

export default function App() {
  return (
    <GameProvider>
      <div className="app-shell">
        <AppContent />
      </div>
    </GameProvider>
  );
}
