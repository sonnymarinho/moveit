import { useChallanges } from '../hooks/useChallanges';
import { Container } from '../styles/components/CompletedChallenges.styled';

export default function CompletedChallenges() {
  const { challangesCompleted } = useChallanges();

  return (
    <Container>
      <span>Desafios Completos</span>
      <span>{challangesCompleted}</span>
    </Container>
  );  
}