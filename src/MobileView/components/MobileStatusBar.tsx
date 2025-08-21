import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FaWifi, FaSignal, FaBatteryThreeQuarters } from 'react-icons/fa';

const MobileStatusBar = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(i);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Bar>
      <Notch aria-hidden />
      <Left>{time}</Left>
      <Right>
        <FaSignal />
        <FaWifi />
        <Battery>
          <FaBatteryThreeQuarters />
        </Battery>
      </Right>
    </Bar>
  );
};

export default MobileStatusBar;

const Bar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 12px;
  color: var(--bar-text);
  z-index: 3000;
  pointer-events: none;
`;

const Notch = styled.div`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 24px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 16px;
`;

const Left = styled.div`
  font-weight: 600;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

const Right = styled.div`
  justify-self: end;
  display: inline-grid;
  grid-auto-flow: column;
  gap: 10px;
  align-items: center;
  font-size: 14px;
`;

const Battery = styled.span`
  display: inline-flex;
  align-items: center;
`;
