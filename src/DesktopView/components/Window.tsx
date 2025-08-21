import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowMinimize, FaWindowMaximize, FaTimes } from 'react-icons/fa';
import { useWindowStore } from '../../store/windowStore';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

export const Window = ({
  id,
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 300 },
}: WindowProps) => {
  const {
    windows,
    activeWindow,
    toggleMinimize,
    toggleMaximize,
    removeWindow,
    setActiveWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const window = windows.find((w) => w.id === id);
  if (!window) return null;

  const isActive = activeWindow === id;
  const { isMinimized, isMaximized, zIndex } = window;

  const handleDragStop = (_: any, d: { x: number; y: number }) => {
    updateWindowPosition(id, { x: d.x, y: d.y });
  };

  const handleResize = (_: any, _direction: any, ref: any) => {
    updateWindowSize(id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <Rnd
          style={{ zIndex }}
          default={{
            x: initialPosition.x,
            y: initialPosition.y,
            width: initialSize.width,
            height: initialSize.height,
          }}
          minWidth={200}
          minHeight={100}
          bounds="#desktop"
          dragHandleClassName="window-handle"
          onDragStop={handleDragStop}
          onResize={handleResize}
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          size={
            isMaximized
              ? { width: '100%', height: `100%` }
              : { width: window.size.width, height: window.size.height }
          }
          position={
            isMaximized
              ? { x: 0, y: 29 }
              : { x: window.position.x, y: window.position.y }
          }
          onMouseDown={() => setActiveWindow(id)}
        >
          <WindowContainer
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            $isActive={isActive}
          >
            <WindowHeader
              className="window-handle"
              onDoubleClick={() => toggleMaximize(id)}
            >
              <WindowControls>
                <WindowButton onClick={() => removeWindow(id)} $type="close">
                  <FaTimes />
                </WindowButton>
                <WindowButton
                  onClick={() => toggleMinimize(id)}
                  $type="minimize"
                >
                  <FaWindowMinimize />
                </WindowButton>
                <WindowButton
                  onClick={() => toggleMaximize(id)}
                  $type="maximize"
                >
                  <FaWindowMaximize />
                </WindowButton>
              </WindowControls>
              <WindowTitle>{title}</WindowTitle>
            </WindowHeader>
            <WindowContent>{children}</WindowContent>
          </WindowContainer>
        </Rnd>
      )}
    </AnimatePresence>
  );
};

const WindowContainer = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  outline: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WindowHeader = styled.div`
  height: 36px;
  background: linear-gradient(
    180deg,
    rgba(245, 245, 245, 0.9) 0%,
    rgba(230, 230, 230, 0.7) 100%
  );
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 10px;
  position: relative;
  user-select: none;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const WindowButton = styled.button<{
  $type: 'close' | 'minimize' | 'maximize';
}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $type }) =>
    $type === 'close'
      ? '#ff5f56'
      : $type === 'minimize'
      ? '#ffbd2e'
      : '#27c93f'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: transparent;
  transition: color 0.2s;

  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  svg {
    width: 8px;
    height: 8px;
  }
`;

const WindowTitle = styled.div`
  justify-self: center;
  color: #333;
  font-size: 13px;
  font-weight: 600;
`;

const WindowContent = styled.div`
  color: #333;
  flex: 1;
  overflow: auto;
  padding: 16px;
`;
