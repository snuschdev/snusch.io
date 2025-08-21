import styled from 'styled-components';
import { useEffect, useState } from 'react';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';

const StatusBar = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(i);
  }, []);

  const time = now.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Bar role="navigation">
      <Left>
        <Apple>
          <DesktopMacIcon fontSize="small" />
        </Apple>
        <Strong>Stephany Nusch - Software Engineer</Strong>
      </Left>
      <Center />
      <Right>
        <span>{time}</span>
      </Right>
    </Bar>
  );
};

export default StatusBar;

const Bar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0 10px;
  color: var(--bar-text);
  backdrop-filter: blur(16px) saturate(120%);
  background: var(--bar-bg);
  border-bottom: 1px solid var(--bar-border);
  outline: 1px solid var(--panel-outline);
  z-index: 2000;
`;

const Left = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Center = styled.div`
  justify-self: center;
  opacity: 0.8;
`;

const Right = styled.div`
  justify-self: end;
  opacity: 0.9;
`;

const Apple = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const Strong = styled.span`
  font-weight: 600;
`;
