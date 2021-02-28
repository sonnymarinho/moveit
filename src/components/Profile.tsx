import { useChallanges } from '../hooks/useChallanges';
import { Container } from '../styles/components/Profile.styled';

export default function Profile() {

  const { level } = useChallanges();

  return (
    <Container>
      <img src="https://github.com/sonnymarinho.png" alt="Sonny Marinho"/>
      <div>
        <strong>Sonny Marinho</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </Container>
  )
}