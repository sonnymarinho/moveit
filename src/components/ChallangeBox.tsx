import { useCallback, useState } from 'react';
import { useChallanges } from '../hooks/useChallanges';
import { useCountdown } from '../hooks/useCountdown';
import { Container, ChallangeActive, ChallangeNotActive } from '../styles/components/ChallangeBox.styled';

export default function ChallangeBox () {
  const { activeChallange, resetChallange, completeChallange } = useChallanges();
  const { resetCountDown } = useCountdown();

  const handleChallangesSucceded = useCallback(
    () => {
      completeChallange();
      resetCountDown();
    },
    [completeChallange, resetCountDown],
  );

  const handleChallangesFailed = useCallback(
    () => {
      resetChallange();
      resetCountDown();
    },
    [resetChallange, resetCountDown],
  );

  return (
    <Container>
      { activeChallange ? (
        <ChallangeActive>
          <header>Ganhe {activeChallange.amount}xp</header>

          <main>
            <img src={`icons/${activeChallange.type}.svg`}/>
            <strong>Novo Desafio</strong>
            <p>{activeChallange.description}</p>
          </main>

          <footer>
            <button
              type="button" 
              className="failedButton"
              onClick={handleChallangesFailed}
            >
              Falhei
            </button>
            <button
              type="button" 
              className="succededButton"
              onClick={handleChallangesSucceded}
            >
              Completei
            </button>
          </footer>
        </ChallangeActive>
      ) : (
        <ChallangeNotActive>
        <strong>
          Finalize um ciclo para receber um desafio
        </strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          <p>Avance de level completando desafios.</p>
        </p>
      </ChallangeNotActive>
      )}
    </Container>
  );
}