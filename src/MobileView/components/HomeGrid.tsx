import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface AppTile {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

export interface BusinessCardData {
  name: string;
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  links?: { label: string; href: string }[];
}

const HomeGrid = ({
  apps,
  businessCard,
}: {
  apps: AppTile[];
  businessCard?: BusinessCardData;
}) => {
  const initials = (name?: string) =>
    (name || '')
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <Wrapper>
      {businessCard && (
        <Widget role="region" aria-label="Business card">
          <Avatar>
            {businessCard.avatarUrl ? (
              <img
                src={businessCard.avatarUrl}
                alt={`${businessCard.name} avatar`}
              />
            ) : (
              <span>{initials(businessCard.name)}</span>
            )}
          </Avatar>
          <CardText>
            <Name>{businessCard.name}</Name>
            <Title>{businessCard.title}</Title>
            {businessCard.subtitle && (
              <Subtitle>{businessCard.subtitle}</Subtitle>
            )}
            {!!businessCard.links?.length && (
              <Links>
                {businessCard.links.map((l) => {
                  const label = l.label.toLowerCase();
                  if (label.includes('github')) {
                    return (
                      <IconLink
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                      >
                        <FaGithub />
                      </IconLink>
                    );
                  }
                  if (label.includes('linkedin')) {
                    return (
                      <IconLink
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                      >
                        <FaLinkedin />
                      </IconLink>
                    );
                  }
                  return (
                    <LinkButton
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label}
                    </LinkButton>
                  );
                })}
              </Links>
            )}
          </CardText>
        </Widget>
      )}
      <Grid>
        {apps.map((app) => (
          <Tile key={app.id} onClick={app.onOpen}>
            <Icon $bg={gradientFromSeed(app.id || app.label)}>{app.icon}</Icon>
            <Label>{app.label}</Label>
          </Tile>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default HomeGrid;

// Generate a deterministic gradient from a string seed
const gradientFromSeed = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const h1 = h % 360;
  const h2 = (h >> 8) % 360;
  return `linear-gradient(135deg, hsl(${h1} 80% 55%) 0%, hsl(${h2} 80% 55%) 100%)`;
};

const Wrapper = styled.div`
  padding: 20px 16px 24px;
  display: grid;
  gap: 16px;
`;

const Widget = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 18px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  outline: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(12px) saturate(120%);
  color: var(--on-glass);
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.85);
  display: grid;
  place-items: center;
  color: var(--text-main);
  font-weight: 700;
  font-size: 18px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
`;

const CardText = styled.div`
  display: grid;
  gap: 4px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
`;

const Title = styled.div`
  font-size: 13px;
  opacity: 0.95;
`;

const Subtitle = styled.div`
  font-size: 12px;
  opacity: 0.85;
`;

const Links = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 8px;
`;

const LinkButton = styled.a`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.15);
  color: var(--on-glass);
  text-decoration: none;
  backdrop-filter: blur(8px);
`;

const IconLink = styled.a`
  width: 32px;
  height: 32px;
  display: inline-grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.15);
  color: var(--on-glass);
  text-decoration: none;
  backdrop-filter: blur(8px);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 12px;
`;

const Tile = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  display: grid;
  justify-items: center;
  gap: 6px;
`;

const Icon = styled.div<{ $bg: string }>`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: ${(p) => p.$bg};
  display: grid;
  place-items: center;
  font-size: 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const Label = styled.span`
  font-size: 12px;
  color: var(--text-main);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;
