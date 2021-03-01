import React from 'react';
import { useChallanges } from '../hooks/useChallanges';
import { Overlay, Container } from '../styles/components/LevelUpModal.styled';

export default function LevelUpModal() {

  const { level, closeLevelUpModal } = useChallanges();

  return (
    <Overlay>
      <Container>
        <header>{level}</header>
        <strong>Parabéns</strong>

        <p>Você alcançou um novo level</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="Close Modal Icon"/>
        </button>
      </Container>
    </Overlay>
  )
}