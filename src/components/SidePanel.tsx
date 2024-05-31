import { Link, useLocation } from 'react-router-dom';
import TopBarContext from '@/contexts/SidePanelContext';
import logo from '@/assets/Logo.png';
import { LayersIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import SidePanelState from '../enums/SidePanelState';
import { useContext } from 'react';

function SidePanel() {
	const location = useLocation();
	const { sidePanelState } = useContext(TopBarContext);

	const renderButtonContent = (
		IconComponent: React.ElementType,
		text: string
	) => (
		<>
			<IconComponent
				className={`${sidePanelState === 'expanded' ? 'mr-4' : ''} h-6 w-6`}
			/>
			{sidePanelState === 'expanded' && text}
		</>
	);

	return (
		<div
			className={`transition-width z-20 flex flex-col space-y-2 items-center ${
				sidePanelState === 'expanded'
					? 'w-64'
					: sidePanelState === 'condensed'
					? 'w-24'
					: 'w-0 disabled:opacity-0 disabled:cursor-not-allowed'
			} bg-card rounded-tr-xl rounded-br-lg`}
		>
			<div className='flex  flex-col p-4 overflow-hidden w-full justify-center items-center'>
				<div className="">
					<img src={logo} alt="Logo" className="mb-4" />
				</div>
				{[{ to: '/Comparison', icon: LayersIcon, text: 'Comparison' }].map(
					({ to, icon: Icon, text }) => (
						<Link to={to} key={text} className="w-full">
							<Button
								variant={location.pathname === to ? 'default' : 'ghost'}
								size={sidePanelState === 'expanded' ? 'default' : 'icon'}
								className={`rounded-lg w-full overflow-hidden ${
									sidePanelState === SidePanelState.Expanded
										? 'justify-start'
										: 'justify-center'
								}`}
							>
								{renderButtonContent(Icon, text)}
							</Button>
						</Link>
					)
				)}
			</div>
		</div>
	);
}

export default SidePanel;
