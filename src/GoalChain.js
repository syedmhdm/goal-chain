import Goal from "./Goal";

export default function GoalChain({
  goalList,
  editGoalId,
  setGoalList,
  handleEditGoal,
  children,
}) {
  return (
    <div className='goal-chain'>
      <h1 className='heading-main'>Goal Chain</h1>

      <div className='goals'>
        {goalList.map((goal) => (
          <Goal
            key={goal.id}
            goal={goal}
            onEditGoal={handleEditGoal}
            editGoalId={editGoalId}
            setGoalList={setGoalList}
            goalList={goalList}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
