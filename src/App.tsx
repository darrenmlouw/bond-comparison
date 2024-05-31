import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { SidePanelProvider } from '@/contexts/SidePanelContext';
import Comparison from '@/pages/Comparison/Comparison';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { SalaryProvider } from '@/contexts/SalaryContext';

function App() {
	const location = useLocation();

	return (
		<ThemeProvider>
			<SidePanelProvider>
				<SalaryProvider>
					<div className={cn('App', 'w-screen h-screen')}>
						<Routes location={location}>
							<Route path="/" element={<Layout />}>
								<Route path="/Comparison" element={<Comparison />} />
							</Route>
						</Routes>
					</div>
				</SalaryProvider>
			</SidePanelProvider>
		</ThemeProvider>
	);
}

export default App;
