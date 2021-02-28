import { Container } from '../styles/components/Profile';

export default function Profile() {
  return (
    <Container>
      <img src="https://github.com/sonnymarinho.png" alt="Sonny Marinho"/>
      <div>
        <strong>Sonny Marinho</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </Container>
  )
}