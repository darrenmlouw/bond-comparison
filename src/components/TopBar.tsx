import { Button } from '@/components/ui/button';
import ThemeContext from '@/contexts/ThemeContext';
import { SunIcon } from '@radix-ui/react-icons';
import { MoonIcon } from 'lucide-react';
import { useContext } from 'react';

const TopBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="absolute top-2 right-2 flex justify-between items-center p-1 bg-transparent ">
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
        className="rounded-full"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default TopBar;
