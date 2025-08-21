import DesktopView from './DesktopView';
import MobileView from './MobileView';
import { useIsMobile } from './hooks/useIsMobile';
import { useThemeStore } from './store/themeStore';
import { useEffect } from 'react';
import styled from 'styled-components';

function App() {
  const isMobile = useIsMobile(768);
  const { mode, toggle } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <>
      {isMobile ? <MobileView /> : <DesktopView />}
      <ThemeToggle onClick={toggle} aria-label="Toggle theme">
        {mode === 'light' ? '🌙' : '☀️'}
      </ThemeToggle>
    </>
  );
}

export default App;

const ThemeToggle = styled.button`
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 5000;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(12px) saturate(120%);
  color: var(--on-glass);
  font-size: 18px;
`;
