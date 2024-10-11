import { Button } from '@/components/ui/button';
import ThemeContext from '@/contexts/ThemeContext';
import { SunIcon } from '@radix-ui/react-icons';
import { MoonIcon } from 'lucide-react';
import { useContext } from 'react';

const TopBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed top-1.5 right-1.5 md:top-1 md:right-1 lg:top-1 lg:right-1 flex justify-between items-center z-50">
      <Button
        size="icon"
        onClick={toggleTheme}
        className="group rounded-full backdrop-blur-sm outline outline-1 outline-foreground/20 bg-transparent active:outline-1 active:bg-transparent hover:outline-1 hover:bg-transparent"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-yellow-300" />
        ) : (
          <MoonIcon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-110 text-foreground/70 group-hover:text-foreground" />
        )}
      </Button>
    </div>
  );
};

export default TopBar;
