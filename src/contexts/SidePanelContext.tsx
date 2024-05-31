import {
	createContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import SidePanelState from '@/enums/SidePanelState';

const SidePanelContext = createContext({
	sidePanelState: SidePanelState.Condensed,
	toggleSidePanel: () => {},
});

interface SidePanelProviderProps {
	children: ReactNode;
}

export const SidePanelProvider = ({ children }: SidePanelProviderProps) => {
	// const [theme, toggleTheme] = useDarkMode();
	const [sidePanelState, setSidePanelState] = useState<SidePanelState>(
		SidePanelState.Condensed
	);
	const mqSmall = window.matchMedia('(max-width: 767px)');

	useEffect(() => {
		
    const handleResize = () => {
      // Automatically set to closed on small screens, and condensed on larger screens.
      setSidePanelState(mqSmall.matches ? SidePanelState.Closed : SidePanelState.Condensed);
    };

    handleResize(); // Initial check
    mqSmall.addEventListener('change', handleResize);
    return () => mqSmall.removeEventListener('change', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSidePanel = () => {
    setSidePanelState((prevState : SidePanelState) => {
      // If it's small screen, keep it closed or allow opening if not already expanded.
      if (mqSmall.matches) {
        return prevState === SidePanelState.Expanded ? SidePanelState.Closed : SidePanelState.Expanded;
      } else {
        // Toggle between condensed and expanded on larger screens.
        return prevState === SidePanelState.Expanded ? SidePanelState.Condensed : SidePanelState.Expanded;
      }
    });
  };

	return (
		<SidePanelContext.Provider
			value={{ sidePanelState, toggleSidePanel }}
		>
			{children}
		</SidePanelContext.Provider>
	);
};

export default SidePanelContext;