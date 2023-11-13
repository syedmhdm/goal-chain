import { useGoalsLocalStorage } from "../contexts/GoalsContextLocalStorage";
import GoalLocalStorage from "./Goal-v2LocalStorage";

function GoalListLocalStorage() {
  const { goals } = useGoalsLocalStorage();

  return (
    <div className='goal-chain'>
      <h1 className='heading-main'>Goal Chain</h1>

      <div className='goals'>
        {goals.map((goal) => (
          <GoalLocalStorage key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default GoalListLocalStorage;
