import { GlobalStyles } from '../styles/GlobalStyles';
import { Window } from './components/Window';
import { Dock } from './components/Dock';
import { useWindowStore } from '../store/windowStore';
import {
  FaUser,
  FaCode,
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import styled from 'styled-components';
import StatusBar from './components/StatusBar';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Contact } from '../sections/Contact';
import { default as avatarImage } from '../assets/portrait-me.png';

export default function DesktopView() {
  const { windows } = useWindowStore();

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

  return (
    <Desktop id="desktop">
      <GlobalStyles />
      <StatusBar />
      <BusinessCard>
        <Avatar>
          <img src={avatarImage} alt="Stephany Nusch avatar" />
        </Avatar>
        <CardText>
          <Name>Stephany Nusch</Name>
          <Title>Software Engineer</Title>
          <Subtitle>React • TypeScript • UX</Subtitle>
          <Links>
            <IconLink
              href="https://www.linkedin.com/in/stephanynusch"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin />
            </IconLink>
            <IconLink
              href="https://github.com/snuschdev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub />
            </IconLink>
          </Links>
        </CardText>
      </BusinessCard>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          initialPosition={window.position}
          initialSize={window.size}
        >
          {window.content}
        </Window>
      ))}
      <Dock
        sections={sections}
        socialLinks={{
          linkedin: 'https://www.linkedin.com/in/stephanynusch',
          github: 'https://github.com/snuschdev',
        }}
      />
    </Desktop>
  );
}

const Desktop = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const BusinessCard = styled.section`
  position: absolute;
  top: 48px; /* slightly below status bar */
  left: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 18px;
  padding: 18px 20px;
  width: 380px; /* slightly bigger than mobile */
  border-radius: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  outline: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(14px) saturate(120%);
  color: var(--on-glass);
`;

const Avatar = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const CardText = styled.div`
  display: grid;
  gap: 6px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  font-size: 14px;
  opacity: 0.95;
`;

const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.85;
`;

const Links = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
`;

const IconLink = styled.a`
  width: 34px;
  height: 34px;
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
