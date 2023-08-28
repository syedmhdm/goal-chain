// goalCreatedAt: new Date(
//   new Date().setDate(new Date().getDate() - 4)
// ).toDateString(),

// if setting the first goal then
// new Date(new Date().setDate(new Date().getDate() + 1))
// .toISOString()
// .split("T")[0]
import { MdDone, MdDelete, MdEdit, MdInfoOutline } from "react-icons/md";
import { useState } from "react";

let initialGoalList = [
  {
    id: 1,
    goal: "complete react js course",
    deadline: "Sun Aug 20 2023",
    isCompleted: true,
    goalCreatedAt: "Tue Aug 01 2023",
    previousGoalId: null,
    nextGoalId: 2,
    allocatedDays: 19,
    completedInDays: 17,
    isGoodPrediction: true,
    isYourCupOfTea: true, // alert
    isDeadlineUpdated: false, // true means bad prediction
  },
  {
    id: 2,
    goal: "Create a banger resume",
    deadline: "Sat Aug 26 2023",
    isCompleted: true,
    goalCreatedAt: "Wed Aug 16 2023",
    previousGoalId: 1,
    nextGoalId: 3,
    allocatedDays: 6,
    completedInDays: 3,
    isGoodPrediction: false,
    isYourCupOfTea: true,
    isDeadlineUpdated: false,
  },
  {
    id: 3,
    goal: "apply for remote jobs",
    deadline: "Mon Sep 11 2023",
    isCompleted: false,
    goalCreatedAt: new Date().toDateString(),
    previousGoalId: 2,
    nextGoalId: 4,
    allocatedDays: 14,
    completedInDays: null,
    isGoodPrediction: null,
    isYourCupOfTea: null,
    isDeadlineUpdated: false,
    currentGoal: true,
  },
  {
    id: 4,
    goal: "prepare for interviews",
    deadline: "Sat Sep 23 2023",
    isCompleted: false,
    goalCreatedAt: new Date().toDateString(),
    previousGoalId: 3,
    nextGoalId: 5,
    allocatedDays: 12,
    completedInDays: null,
    isGoodPrediction: null,
    isYourCupOfTea: null,
    isDeadlineUpdated: false,
  },
  {
    id: 5,
    goal: "update github and linkedin profile",
    deadline: "Sun Oct 01 2023",
    isCompleted: false,
    goalCreatedAt: new Date().toDateString(),
    previousGoalId: 4,
    nextGoalId: 6,
    allocatedDays: 8,
    completedInDays: null,
    isGoodPrediction: null,
    isYourCupOfTea: null,
    isDeadlineUpdated: false,
  },
  {
    id: 6,
    goal: "make schedule for youtube and stuff after geting a remote job",
    deadline: "Tue Oct 31 2023",
    isCompleted: false,
    goalCreatedAt: new Date().toDateString(),
    previousGoalId: 5,
    nextGoalId: null,
    allocatedDays: 30,
    completedInDays: null,
    isGoodPrediction: null,
    isYourCupOfTea: null,
    isDeadlineUpdated: false,
  },
];

function App() {
  initialGoalList = initialGoalList.map((goal) => ({
    ...goal,
    remainingDays:
      Math.round(
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      ) < 0
        ? 0
        : Math.round(
            (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          ),
  }));

  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalList, setGoalList] = useState(initialGoalList);

  function handleAddGoal(e) {
    e.preventDefault();

    if (!goal.trim() || !deadline) return;

    setGoalList((currGoalList) => {
      const previousGoalId = currGoalList.at(-1).previousGoalId;
      const previousGoalDeadline = currGoalList.at(-1).deadline;

      return [
        ...currGoalList,
        {
          id: crypto.randomUUID(),
          goal: goal,
          deadline: new Date(deadline).toDateString(),
          isCompleted: false,
          goalCreatedAt: new Date().toDateString(),
          previousGoalId: previousGoalId,
          nextGoalId: null,
          allocatedDays: Math.round(
            new Date(deadline) -
              new Date(previousGoalDeadline) / (1000 * 60 * 60 * 24)
          ),
          completedInDays: null,
          isGoodPrediction: null,
          isYourCupOfTea: null,
          isDeadlineUpdated: false,
          remainingDays:
            Math.round(
              (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
            ) < 0
              ? 0
              : Math.round(
                  (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
                ),
        },
      ];
    });

    setGoal("");
    setDeadline("");
  }

  return (
    <div className='app'>
      <div className='goal-chain'>
        <h1 className='heading-main'>Goal Chain</h1>

        <div className='goals'>
          {goalList.map((goal) => (
            <Goal key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
      <form className='form-add-friend'>
        <h2 className='heading'>Add New Goal</h2>
        <label>Enter Goal</label>
        <input
          type='text'
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <label>Select Deadline</label>
        <input
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
        />
        <Button onClick={handleAddGoal}>Add Goal</Button>
      </form>
    </div>
  );
}

function Goal({ goal }) {
  return (
    <div
      className={`goal 
      ${goal.isGoodPrediction === true ? "good-prediction" : ""} 
      ${goal.isGoodPrediction === false ? "bad-prediction" : ""} 
      ${goal.currentGoal === true ? "current-goal" : ""}`}
    >
      <h5>{goal.goal}</h5>
      <h6>Deadline: {goal.deadline}</h6>
      <h6>Remaining Days: {goal.remainingDays}</h6>

      <div className='icons-div'>
        {goal.currentGoal ? (
          <MdDone className='icon' />
        ) : (
          <MdInfoOutline className='icon' />
        )}
        {goal.isCompleted === false ? <MdEdit className='icon-edit' /> : null}
        <MdDelete className='icon-danger' />
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className='button'>
      {children}
    </button>
  );
}

export default App;
