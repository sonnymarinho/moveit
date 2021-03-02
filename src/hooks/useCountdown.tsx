import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import challanges from '../../challenges.json';
import { useChallanges } from "./useChallanges";


interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProps {
  children?: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

const CountdownContext = createContext({} as CountdownContextData);

function CountdownProvider ({ children }: CountdownProps) {
  const { startNewChallange } = useChallanges();

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => Math.floor(time / 60), [ time ]);
  const seconds = useMemo(() => time % 60, [ time ]);

  const startCountDown = useCallback(() => {
      setIsActive(true);
    },[],
  );

  const resetCountDown = useCallback(() => {
      clearTimeout(countdownTimeout);
      setTime(25 * 60);
      setIsActive(false);
      setHasFinished(false);
    },[],
  );

  useEffect(() => {
    
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time -1);
      }, 1000)
    };

    if (time ===0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallange();
    };

  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
         minutes,
         seconds,
         hasFinished,
         isActive,
         startCountDown,
         resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )

};


function useCountdown(): CountdownContextData {
  const context = useContext(CountdownContext);

  if (!context) {
    throw new Error('CountdownContext must be used within an CountdownProvider');
  }

  return context;
}

export { useCountdown, CountdownProvider };