import styled from 'styled-components';
import { FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import HomeGrid from './components/HomeGrid';
import MobileStatusBar from './components/MobileStatusBar';
import { useWindowStore } from '../store/windowStore';
import { GlobalStyles } from '../styles/GlobalStyles';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Contact } from '../sections/Contact';
import MobileAppView from './components/MobileAppView';
import { default as avatarImage } from '../assets/portrait-me.png';

export default function MobileView() {
  const { windows, addWindow, setActiveWindow, toggleMinimize, removeWindow } =
    useWindowStore();

  const sections = [
    { id: 'about', title: 'About Me', icon: <FaUser />, content: <About /> },
    { id: 'skills', title: 'Skills', icon: <FaCode />, content: <Skills /> },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FaBriefcase />,
      content: <Projects />,
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <FaEnvelope />,
      content: <Contact />,
    },
  ];

  const openOrFocus = (id: string) => {
    const existing = windows.find((w) => w.id === id);
    if (!existing) {
      const section = sections.find((s) => s.id === id)!;
      addWindow({
        id: section.id,
        title: section.title,
        content: section.content,
        isOpen: true,
        isMinimized: false,
        isMaximized: true, // mobile: open full-screen overlay
        position: { x: 0, y: 0 },
        size: { width: window.innerWidth, height: window.innerHeight },
      });
      return;
    }
    if (existing.isMinimized) toggleMinimize(existing.id);
    setActiveWindow(existing.id);
  };

  const apps = sections.map((s) => ({
    id: s.id,
    label: s.title,
    icon: s.icon,
    onOpen: () => openOrFocus(s.id),
  }));

  const businessCard = {
    name: 'Stephany Nusch',
    title: 'Software Engineer',
    subtitle: 'React • TypeScript • UX',
    avatarUrl: avatarImage,
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stephanynusch' },
      { label: 'GitHub', href: 'https://github.com/snuschdev' },
    ],
  };

  return (
    <Phone>
      <GlobalStyles />
      <MobileStatusBar />
      <HomeGrid apps={apps} businessCard={businessCard} />
      {windows.map((w) => (
        <MobileAppView
          key={w.id}
          title={w.title}
          open={!w.isMinimized}
          onDismiss={() => removeWindow(w.id)}
        >
          {w.content}
        </MobileAppView>
      ))}
    </Phone>
  );
}

const Phone = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
