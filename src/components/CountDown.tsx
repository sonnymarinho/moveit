import React, { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Container, CountDownElement, StartCountDownButton } from '../styles/components/CountDown';


export default function CountDown() {
  const [time, setTime] = useState(25*60);
  const [isActive, setIsActive] = useState(false);

  const minutes = useMemo(() => Math.floor(time / 60), [ time ]);
  const seconds = useMemo(() => time % 60, [ time ]);

  const [minuteLeft, minuteRight] = useMemo(
    () => String(minutes).padStart(2, '0').split('')
    , [ minutes ]);

  const [secondLeft, secondRight] = useMemo(
    () => String(seconds).padStart(2, '0').split('')
    , [ seconds ]);

  const startCountDown = useCallback(() => {
      setIsActive(true);
    },[],
  );

  useEffect(() => {
    
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time -1);
      }, 1000)
    }

  }, [isActive, time]);

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
      <StartCountDownButton
        onClick={startCountDown}
      >
        Iniciar um ciclo
      </StartCountDownButton>
    </Container>
  );
}