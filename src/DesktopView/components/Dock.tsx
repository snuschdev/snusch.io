import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isOpen?: boolean;
}

// simple deterministic hash -> two hues -> gradient
const gradientFromSeed = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const h1 = h % 360;
  const h2 = (h >> 8) % 360;
  return `linear-gradient(135deg, hsl(${h1} 80% 55%) 0%, hsl(${h2} 80% 55%) 100%)`;
};

const DockItem = ({ icon, label, onClick, isOpen }: DockItemProps) => (
  <DockItemContainer
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.95 }}
  >
    <IconWrapper $bg={gradientFromSeed(label)}>
      {icon}
      {isOpen && <DockDot />}
    </IconWrapper>
    <DockTooltip>{label}</DockTooltip>
  </DockItemContainer>
);

interface DockProps {
  sections: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }>;
  socialLinks?: {
    linkedin: string;
    github: string;
  };
}

export const Dock = ({ sections, socialLinks }: DockProps) => {
  const { windows, addWindow, toggleMinimize, setActiveWindow } =
    useWindowStore();

  const links = {
    linkedin:
      socialLinks?.linkedin ?? 'https://www.linkedin.com/in/stephanynusch',
    github: socialLinks?.github ?? 'https://github.com/snuschdev',
  };

  const handleOpenWindow = (section: (typeof sections)[0]) => {
    const existing = windows.find((w) => w.id === section.id);
    if (!existing) {
      addWindow({
        id: section.id,
        title: section.title,
        content: section.content,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: Math.random() * (window.innerWidth - 400),
          y: Math.random() * (window.innerHeight - 300),
        },
        size: { width: 400, height: 300 },
      });
    } else if (existing.isMinimized) {
      // Restore if minimized
      toggleMinimize(existing.id);
      setActiveWindow(existing.id);
    } else {
      // Focus existing window
      setActiveWindow(existing.id);
    }
  };

  // desktop-only dock

  return (
    <DockContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <DockContent>
        {sections.map((section) => (
          <DockItem
            key={section.id}
            icon={section.icon}
            label={section.title}
            onClick={() => handleOpenWindow(section)}
            isOpen={windows.some((w) => w.id === section.id && !w.isMinimized)}
          />
        ))}
        <DockDivider />
        <DockLink
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open LinkedIn profile"
        >
          <IconWrapper $bg={gradientFromSeed('LinkedIn')}>
            <FaLinkedin />
          </IconWrapper>
          <DockTooltip>LinkedIn</DockTooltip>
        </DockLink>
        <DockLink
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open GitHub profile"
        >
          <IconWrapper $bg={gradientFromSeed('GitHub')}>
            <FaGithub />
          </IconWrapper>
          <DockTooltip>GitHub</DockTooltip>
        </DockLink>
      </DockContent>
    </DockContainer>
  );
};

const DockContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) !important;
  z-index: 1000;
`;

const DockContent = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(18px) saturate(120%);
  border-radius: 16px;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
`;

const DockDivider = styled.div`
  width: 1px;
  height: 42px;
  background: rgba(0, 0, 0, 0.08);
  border-right: 1px solid var(--glass-border);
  margin: 0 6px;
`;

const DockItemContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: bottom center;
`;

const DockLink = styled(motion.a)`
  position: relative;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  position: relative;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
`;

const DockDot = styled.div`
  position: absolute;
  bottom: -4px;
  width: 4px;
  height: 4px;
  background: #007aff;
  border-radius: 50%;
`;

const DockTooltip = styled.span`
  position: absolute;
  top: -30px;
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;

  ${DockItemContainer}:hover & {
    opacity: 1;
  }
`;
