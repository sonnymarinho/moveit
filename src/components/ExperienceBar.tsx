import React from 'react';

import { Container, PercentBar } from '../styles/components/ExperienceBar';

const ExperienceBar: React.FC = () => {
  return (
    <Container>
      <span>0px</span>

          <PercentBar>
            <div style={{ width: "50%" }}/>
            <span style={{ left: "50%" }}>300px</span>
          </PercentBar>

      <span>600px</span>
    </Container>
  );
}

export default ExperienceBar;