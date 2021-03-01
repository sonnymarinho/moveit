import React from 'react';
import Head from 'next/head';
import { ExperienceBar, Profile, CountDown, ChallangeBox } from '../components';
import CompletedChallenges from '../components/CompletedChallenges';

import { Container, Content, LeftContainer, RightContainer } from '../styles/pages/Home.style';
import { CountdownProvider } from '../hooks/useCountdown';
import { ChallangesProvider } from '../hooks/useChallanges';
import { GetServerSideProps } from 'next';

interface HomeProps {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export default function Home({ level, currentExperience, challangesCompleted}: HomeProps) {
  return (
    <Container>
      <ChallangesProvider 
        level={level}
        currentExperience={currentExperience}
        challangesCompleted={challangesCompleted}
      >
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
      </ChallangesProvider>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challangesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challangesCompleted: Number(challangesCompleted),
    }
  }
}