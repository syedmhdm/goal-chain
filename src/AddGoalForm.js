import Button from "./Button";

export default function AddGoalForm({
  goal,
  setGoal,
  deadline,
  goalList,
  setDeadline,
  onHandleAddGoal,
}) {
  return (
    <form className='form-add-friend'>
      <h2 className='heading'>Add New Goal</h2>
      <label>Enter Goal</label>
      <input
        type='text'
        value={goal}
        maxLength={100}
        onChange={(e) => setGoal(e.target.value)}
      />
      <label>Select Deadline</label>
      <input
        className='picker'
        type='date'
        value={deadline}
        min={
          goalList.length === 0
            ? new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0]
            : new Date(
                new Date(goalList.at(-1).deadline).setDate(
                  new Date(goalList.at(-1).deadline).getDate() + 3
                )
              )
                .toISOString()
                .split("T")[0]
        }
        onChange={(e) => setDeadline(e.target.value)}
        onKeyDown={(e) => e.preventDefault()}
      />
      <Button onClick={onHandleAddGoal}>Add Goal</Button>
    </form>
  );
}
