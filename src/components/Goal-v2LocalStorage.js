import { MdDone, MdDelete, MdEdit } from "react-icons/md";
import { useGoalsLocalStorage } from "../contexts/GoalsContextLocalStorage";
export default function GoalLocalStorage({ goal }) {
  const { deleteGoal, completeGoal, setCurrentEditGoal } =
    useGoalsLocalStorage();

  async function handleDeleteGoal(e) {
    deleteGoal(goal);
  }

  async function handleEditGoal(e) {
    // updateGoal(goal)
    window.scrollTo(0, document.body.scrollHeight);
    setCurrentEditGoal(goal);
  }

  async function handleCompleteGoal(e) {
    completeGoal(goal);
  }

  const deadline = new Date(goal.deadline).toDateString();
  const isCompletedStyle = goal.isCompleted ? "grey-out" : "";

  return (
    <div className={`goal ${isCompletedStyle} good-prediction-2`}>
      <h5>{goal.goal}</h5>
      <h6>Deadline: {deadline}</h6>
      <div className='icons-div'>
        <MdDelete onClick={handleDeleteGoal} className='icon-2' />
        {!goal.isCompleted ? (
          <>
            <MdDone onClick={handleCompleteGoal} className='icon-2' />
            <MdEdit onClick={handleEditGoal} className='icon-2' />
          </>
        ) : null}
      </div>
    </div>
  );
}
