import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import type { ReactNode } from 'react';

interface MobileAppViewProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onDismiss: () => void;
}

const swipeThreshold = 120; // px upward
const velocityThreshold = -500; // px/s upward

export default function MobileAppView({
  title,
  children,
  open,
  onDismiss,
}: MobileAppViewProps) {
  const handleDragEnd = (
    _: any,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    if (
      info.offset.y < -swipeThreshold ||
      info.velocity.y < velocityThreshold
    ) {
      onDismiss();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AppContainer
            as={motion.div}
            initial={{ y: 20, opacity: 0.98 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <AppHeader>
              <Title>{title}</Title>
            </AppHeader>
            <Content>{children}</Content>
            <HomeGesture
              as={motion.div}
              drag="y"
              dragElastic={0.2}
              dragConstraints={{ top: -200, bottom: 0 }}
              onDragEnd={handleDragEnd}
            >
              <HomeIndicator />
              <Hint>Swipe up to close</Hint>
            </HomeGesture>
          </AppContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4000;
  backdrop-filter: blur(6px) saturate(120%);
`;

const AppContainer = styled.div`
  position: absolute;
  inset: 0;
  background: var(--panel-bg);
  color: var(--text-main);
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 0;
  overflow: hidden;
`;

const AppHeader = styled.div`
  height: 52px;
  display: grid;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--panel-outline);
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
`;

const Content = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
  background: transparent;
`;

const HomeGesture = styled.div`
  display: grid;
  justify-items: center;
  padding: 10px 0 18px;
`;

const HomeIndicator = styled.div`
  width: 120px;
  height: 5px;
  background: var(--home-indicator);
  opacity: 0.2;
  border-radius: 3px;
`;

const Hint = styled.div`
  margin-top: 6px;
  font-size: 11px;
  opacity: 0.5;
`;
