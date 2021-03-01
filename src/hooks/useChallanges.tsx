import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie';
import challanges from '../../challenges.json';
import { LevelUpModal } from "../components";

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
  closeLevelUpModal: () => void;
}

interface ChallangesContextProps {
  children?: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}


const EXPERIENCE_FACTOR = 4;

const ChallangesContext = createContext({} as ChallangesContextData);

function ChallangesProvider ({ children, ...rest}: ChallangesContextProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challangesCompleted, setChallangesCompleted] = useState(rest.challangesCompleted ?? 0);
  const [activeChallange, setActiveChallange] = useState(undefined);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const levelUp = useCallback(
    () => {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
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
    [challanges],
  );

  const resetChallange = useCallback(
    () => {
      setActiveChallange(undefined);
    },
    [],
  );
  
  const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * EXPERIENCE_FACTOR, 2), [level]);
  
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

  const closeLevelUpModal = useCallback(
    () => {
      setIsLevelUpModalOpen(false)
    },
    [],
  );

  useEffect(() => {
    Notification.requestPermission(); 
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challangesCompleted', String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);


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
          closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal /> }
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