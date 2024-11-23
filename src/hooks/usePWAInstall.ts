import { useState, useEffect } from 'react';

// Define a type for the beforeinstallprompt event
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export const usePWAInstall = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // Prevent the mini-info bar from appearing
      setInstallPromptEvent(event as BeforeInstallPromptEvent); // Cast the event to the correct type
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (installPromptEvent) {
      await installPromptEvent.prompt(); // Show the install prompt
      const choiceResult = await installPromptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      setInstallPromptEvent(null); // Reset the event
    }
  };

  return { installApp, isInstallable: !!installPromptEvent };
};
