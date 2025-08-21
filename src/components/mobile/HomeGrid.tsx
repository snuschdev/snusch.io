import styled from 'styled-components';

interface AppTile {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

export const HomeGrid = ({ apps }: { apps: AppTile[] }) => (
  <Grid>
    {apps.map((app) => (
      <Tile key={app.id} onClick={app.onOpen}>
        <Icon>{app.icon}</Icon>
        <Label>{app.label}</Label>
      </Tile>
    ))}
  </Grid>
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 12px;
  padding: 20px 16px 90px; /* extra bottom for dock */
`;

const Tile = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  display: grid;
  justify-items: center;
  gap: 6px;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
  font-size: 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const Label = styled.span`
  font-size: 12px;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;
