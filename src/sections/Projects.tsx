import { SectionShell } from './SectionShell';
import { EXPERIENCES } from './experiences';

export const Projects = () => (
  <SectionShell>
    {EXPERIENCES.map((item, index) => (
      <div key={index}>
        <h2>{item.title}</h2>
        <p>{item.company}</p>
        <p>{item.duration}</p>
        <div>{item.description}</div>
      </div>
    ))}
  </SectionShell>
);
