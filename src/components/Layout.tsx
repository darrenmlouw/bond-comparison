import SidePanel from '@/components/SidePanel';
import TopBar from '@/components/TopBar';
import SidePanelContext from '@/contexts/SidePanelContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	const { sidePanelState, toggleSidePanel } = useContext(SidePanelContext);

	return (
		<div className="flex flex-row h-full w-full">
			<SidePanel />
			<div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
				<TopBar />
				<div className="flex flex-1 overflow-y-auto overflow-x-hidden w-full h-full">
					<Outlet />
				</div>
			</div>
			{sidePanelState === 'expanded' ? (
				<div className="w-full h-full backdrop-blur-[3px] bg-black bg-opacity-20 absolute top-0 left-0 z-10" onClick={
					() => {
						toggleSidePanel();
					}
				}/>
			) : null}
		</div>
	);
};

export default Layout;
