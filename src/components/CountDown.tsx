import React, { useCallback, useEffect, useMemo } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Container, CountDownElement, CountDownButton } from '../styles/components/CountDown.styled';


export default function CountDown() {

  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown
  } = useCountdown();

  const [minuteLeft, minuteRight] = useMemo(
    () => String(minutes).padStart(2, '0').split('')
    , [ minutes ]);

  const [secondLeft, secondRight] = useMemo(
    () => String(seconds).padStart(2, '0').split('')
    , [ seconds ]);

  return (
    <Container>
      <CountDownElement>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
        </CountDownElement>

        { hasFinished ? (
          <CountDownButton disabled>
            Ciclo Encerrado <img src="icons/check_circle.svg" alt="Check"/>
          </CountDownButton>
        ): (
          isActive ?
          (
            <CountDownButton onClick={resetCountDown}>
              Encerrar um ciclo
            </CountDownButton>
          ) : (
            <CountDownButton isActive onClick={startCountDown}>
              Iniciar um ciclo
            </CountDownButton>
          )
        )}
    </Container>
  );
}