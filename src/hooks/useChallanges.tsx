import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import challanges from '../../challenges.json';

interface Challange {
  type: 'eye' | 'body';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challangesCompleted: number;
  startNewChallange: () => void;
  activeChallange: Challange;
  resetChallange: () => void;
  experienceToNextLevel: number;
  completeChallange: () => void;
}

interface ChallangesContextProps {
  children?: ReactNode;
}

const EXPERIENCE_FACTOR = 4;

const ChallangesContext = createContext({} as ChallangesContextData);

function ChallangesProvider ({ children }: ChallangesContextProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompleted] = useState(0);
  const [activeChallange, setActiveChallange] = useState(undefined);

  const levelUp = useCallback(
    () => {
      setLevel(level + 1);
    },
    [level],
  );


  const startNewChallange = useCallback(
    () => {
      const randomChallangeIndex = Math.floor( Math.random() * challanges.length);
      const challange = challanges[randomChallangeIndex];

      setActiveChallange(challange);

      if (Notification.permission === 'granted') {
        new Notification('Novo Desafio 🎉', { 
          body: `Valendo ${challange.amount}xp!`,
        });

        new Audio('/notification.mp3').play();
      }
    },
    [],
  );

    const resetChallange = useCallback(
      () => {
        setActiveChallange(undefined);
      },
      [],
    );
    
    const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * EXPERIENCE_FACTOR, 2), []);
    
    const completeChallange = useCallback(
      () => {
        if(!activeChallange) return;

        const { amount } = activeChallange

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel;
          levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallange(undefined);
        setChallangesCompleted(challangesCompleted + 1);

      },
      [activeChallange, currentExperience, experienceToNextLevel, levelUp],
    );

      useEffect(() => {
        Notification.requestPermission(); 
      }, []);

  return (
    <ChallangesContext.Provider
      value={{
          level,
          levelUp,
          currentExperience,
          challangesCompleted,
          startNewChallange,
          activeChallange,
          resetChallange,
          experienceToNextLevel,
          completeChallange,
      }}
    >
      {children}
    </ChallangesContext.Provider>
  )

};


function useChallanges(): ChallangesContextData {
  const context = useContext(ChallangesContext);

  if (!context) {
    throw new Error('ChallangesContext must be used within an ChallangesProvider');
  }

  return context;
}

export { useChallanges, ChallangesProvider };