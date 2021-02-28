import React from 'react';
import Head from 'next/head';
import { ExperienceBar, Profile, CountDown, ChallangeBox } from '../components';
import CompletedChallenges from '../components/CompletedChallenges';

import { Container, Content, LeftContainer, RightContainer } from '../styles/pages/Home.style';
import { CountdownProvider } from '../hooks/useCountdown';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <CountdownProvider>
        <Content>
          <LeftContainer>
            <Profile />
            <CompletedChallenges />
            <CountDown />
          </LeftContainer>

          <RightContainer>
            <ChallangeBox />
          </RightContainer>
        </Content>
      </CountdownProvider>
    </Container>
  )
}