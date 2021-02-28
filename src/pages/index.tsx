import React from 'react';
import Head from 'next/head';
import { ExperienceBar, Profile, CountDown } from '../components';
import CompletedChallenges from '../components/CompletedChallenges';

import { Container, Content, LeftContainer, RightContainer } from '../styles/pages/Home.style';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <Content>
        <LeftContainer>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </LeftContainer>

        <RightContainer>

        </RightContainer>
      </Content>
    </Container>
  )
}