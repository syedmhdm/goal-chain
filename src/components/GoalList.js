import Goal from "../components/Goal-v2";
import { useGoals } from "../contexts/GoalsContext";

function GoalList() {
  const { goals } = useGoals();

  return (
    <div className='goal-chain'>
      <h1 className='heading-main'>Goal Chain</h1>

      <div className='goals'>
        {goals.map((goal) => (
          <Goal key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default GoalList;
