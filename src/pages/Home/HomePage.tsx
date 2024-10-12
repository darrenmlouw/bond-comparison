// src/pages/Home/HomePage.tsx

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowTo from '@/components/HowTo';
import Socials from '@/components/Socials';
import PageTracker from '@/components/PageTracker';
import TestPage from '@/pages/Test/TestPage';
import { FaCalculator, FaChartLine, FaHome } from 'react-icons/fa';

const featuresData = [
  {
    id: 1,
    title: 'Salary Calculator',
    subtitle: 'Calculate your net salary after taxes and deductions.',
    description: 'Description 1',
    icon: <FaCalculator />,
    initialGradient: "radial-gradient(circle at top left, #ff99cc, #cc66ff, #9966cc)",
  },
  {
    id: 2,
    title: 'Capital Gains Tax',
    subtitle: 'Calculate potential capital gains tax when selling your property.',
    description: 'Description 2',
    icon: <FaChartLine />,
    initialGradient: "radial-gradient(circle at top left, #6699ff, #6666ff, #9933ff)",
  },
  {
    id: 3,
    title: 'Rent vs Buy Calculator',
    subtitle: 'Analyze and compare the long-term costs of renting versus buying a home.',
    description: 'Description 3',
    icon: <FaHome />,
    initialGradient: "radial-gradient(circle at top left, #ff6699, #ff3366, #cc0066)",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col z-10">
      <PageTracker />
      <Hero />
      <TestPage items={featuresData}/>
      <Features />
      <HowTo />
      <Socials />
    </div>
  );
};

export default HomePage;
