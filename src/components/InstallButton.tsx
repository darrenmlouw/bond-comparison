import React, { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const InstallButton: React.FC = () => {
  const { installApp, isInstallable } = usePWAInstall();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Detect the browser or platform
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isAndroid = /Android/i.test(navigator.userAgent);

  // Instructional content based on browser/platform
  const getInstallationInstructions = () => {
    if (isSafari || isIOS) {
      return (
        <p>
          Open this app in <strong>Safari</strong>, tap the <strong>"Share"</strong> icon, and select{' '}
          <strong>"Add to Home Screen"</strong>.
        </p>
      );
    }
    if (isMacOS) {
      return (
        <p>
          In <strong>Chrome</strong>, click the <strong>"Install"</strong> icon in the address bar or use the menu to
          add this app. In Safari, drag the URL to your Dock for quick access.
        </p>
      );
    }
    if (isAndroid) {
      return (
        <p>
          Open this app in <strong>Chrome</strong>, tap the <strong>"Menu"</strong> (three dots) icon, and select{' '}
          <strong>"Install App"</strong>.
        </p>
      );
    }
    return <p>Your browser does not support PWA installation.</p>;
  };

  const handleInstall = () => {
    if (isInstallable) {
      installApp();
    } else {
      setPopoverOpen(true);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <motion.button
          layout
          whileHover={{
            scale: 1.1,
            rotate: [0, 10, -10, 0],
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleInstall}
          className="group rounded-full backdrop-blur-sm outline outline-1 outline-foreground/20 bg-transparent active:outline-1 active:bg-transparent hover:outline-1 hover:bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Install App"
          title="Install App"
        >
          <motion.div
            layout
            key="download-icon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.5 }}
          >
            <Download className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-yellow-300" />
          </motion.div>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        {isInstallable ? (
          <p>Click the button to install this app on your device.</p>
        ) : (
          getInstallationInstructions()
        )}
      </PopoverContent>
    </Popover>
  );
};

export default InstallButton;
