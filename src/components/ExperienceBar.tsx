import React, { useMemo } from 'react';
import { useChallanges } from '../hooks/useChallanges';

import { Container, PercentBar } from '../styles/components/ExperienceBar.styled';

const ExperienceBar: React.FC = () => {

  const { currentExperience, experienceToNextLevel } = useChallanges();

  const percentToNextLevel = useMemo(() =>
    Math.round((currentExperience * 100)) / experienceToNextLevel,
  [currentExperience, experienceToNextLevel]);  

  return (
    <Container>
      <span>0px</span>

          <PercentBar>
            <div style={{ width: `${percentToNextLevel}%` }}/>
            <span style={{ left: `${percentToNextLevel}%` }}>{currentExperience}px</span>
          </PercentBar>

      <span>{experienceToNextLevel}px</span>
    </Container>
  );
}

export default ExperienceBar;