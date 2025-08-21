import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* base defaults (dark) */
    --text-main: #eaeaf0;
    --text-muted: rgba(234, 234, 240, 0.75);
    --on-glass: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.16);
    --glass-border: rgba(255, 255, 255, 0.28);
    --panel-bg: rgba(20, 22, 40, 0.92);
    --panel-border: rgba(255, 255, 255, 0.08);
    --panel-outline: rgba(0, 0, 0, 0.35);
    --header-start: rgba(245, 245, 245, 0.08);
    --header-end: rgba(230, 230, 230, 0.06);
    --bar-bg: rgba(20, 22, 40, 0.6);
    --bar-text: #eaeaf0;
    --bar-border: rgba(255, 255, 255, 0.1);
    --tooltip-bg: rgba(0, 0, 0, 0.8);
    --tooltip-text: #ffffff;
    --home-indicator: #ffffff;
    --accent: #007aff;
  }

  [data-theme='light'] {
    --text-main: #111318;
    --text-muted: rgba(17, 19, 24, 0.75);
    --on-glass: #111318;
    --glass-bg: rgba(255, 255, 255, 0.55);
    --glass-border: rgba(255, 255, 255, 0.75);
    --panel-bg: rgba(255, 255, 255, 0.96);
    --panel-border: rgba(255, 255, 255, 0.6);
    --panel-outline: rgba(0, 0, 0, 0.06);
    --header-start: rgba(245, 245, 245, 0.9);
    --header-end: rgba(230, 230, 230, 0.7);
    --bar-bg: rgba(250, 250, 250, 0.7);
    --bar-text: #0c0c0c;
    --bar-border: rgba(255, 255, 255, 0.5);
    --tooltip-bg: rgba(0, 0, 0, 0.85);
    --tooltip-text: #ffffff;
    --home-indicator: #111111;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--text-main);
    overflow: hidden;
  }

  /* Dark theme background */
  [data-theme='dark'] body {
    background: radial-gradient(1200px 800px at 20% 0%, #8ec5ff 0%, transparent 60%),
      radial-gradient(1000px 700px at 100% 100%, #ffb4e6 0%, transparent 60%),
      linear-gradient(180deg, #0f1025 0%, #1a1c3a 100%);
  }

  /* Light theme background */
  [data-theme='light'] body {
    background:
      radial-gradient(1200px 800px at 20% -10%, rgba(160, 200, 255, 0.9) 0%, rgba(160, 200, 255, 0) 60%),
      radial-gradient(1000px 700px at 110% 110%, rgba(255, 190, 230, 0.9) 0%, rgba(255, 190, 230, 0) 60%),
      radial-gradient(900px 600px at -10% 100%, rgba(190, 255, 230, 0.85) 0%, rgba(190, 255, 230, 0) 60%),
      linear-gradient(180deg, #f5f8ff 0%, #ffffff 60%, #f7f7fb 100%);
  }

  #root {
    position: relative;
  }
`;
