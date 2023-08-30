// add goal form old logic
//            goalList.length === 0
// ? new Date(new Date().setDate(new Date().getDate() + 1))
// .toISOString()
// .split("T")[0]
// : new Date(
// new Date(goalList.at(-1).deadline).setDate(
//   new Date(goalList.at(-1).deadline).getDate() + 3
// )
// )
// .toISOString()
// .split("T")[0]

// multitasking is ineffeciant so,
// idel mind is devil's home so,
// goal "make money..." and goal "buy bike..." are overlaping from "date" to "date" (info)
// updating this goal's deadline will result in changing the remaining goal deadlines as well. Are you sure?

// goalCreatedAt: new Date(
//   new Date().setDate(new Date().getDate() - 4)
// ).toDateString(),

// if setting the first goal then
// new Date(new Date().setDate(new Date().getDate() + 1))
// .toISOString()
// .split("T")[0]
import {
  MdDone,
  MdDelete,
  MdEdit,
  MdInfoOutline,
  MdSave,
} from "react-icons/md";
import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
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
  const [editGoalId, setEditGoalId] = useState("");

  function handleEditGoal(goalId) {
    setEditGoalId(goalId);
  }
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
            <Goal
              key={goal.id}
              goal={goal}
              onEditGoal={handleEditGoal}
              editGoalId={editGoalId}
              setGoalList={setGoalList}
              goalList={goalList}
            />
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
                  new Date().setDate(
                    Math.ceil(new Date(goalList.at(-1).deadline).getDate() + 2)
                  )
                )
                  .toISOString()
                  .split("T")[0]
          }
          onChange={(e) => setDeadline(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />
        {/* <DatePicker /> */}
        <Button onClick={handleAddGoal}>Add Goal</Button>
      </form>
    </div>
  );
}

function Goal({ goal, editGoalId, onEditGoal, setGoalList, goalList }) {
  const [editGoal, setEditGoal] = useState(goal.goal);
  const [editDeadline, setEditDeadline] = useState(
    new Date(
      new Date(goal.deadline).setDate(new Date(goal.deadline).getDate() + 1)
    )
      .toISOString()
      .split("T")[0]
  );

  const previousGoal = goalList.find(
    (isPreviousGoal) => isPreviousGoal.id === goal.previousGoalId
  );

  function handleUpdateGoal(e) {
    setGoalList((previousGoalList) => {
      let goalAfterEditGoal = false;
      let editGoalPreviousDeadline;

      const updatedGoalList = previousGoalList.map((everyGoal) => {
        let updatedGoal = { ...everyGoal };
        if (everyGoal.isCompleted === true) {
          return updatedGoal;
        } else if (editGoalId === everyGoal.id) {
          goalAfterEditGoal = true;
          updatedGoal.goal = editGoal;
          editGoalPreviousDeadline = everyGoal.deadline;
          updatedGoal.deadline = editDeadline;
        } else if (goalAfterEditGoal) {
          // new Date(
          //   new Date().setDate(
          //     Math.ceil(new Date(goalList.at(-1).deadline).getDate() + 2)
          //   )
          // )
          //   .toISOString()
          //   .split("T")[0]
          const plusOrMinusDays = editDeadline - editGoalPreviousDeadline;
          updatedGoal.deadline = new Date(
            new Date(everyGoal.deadline).setDate(
              new Date(everyGoal.deadline).getDate() + plusOrMinusDays
            )
          ).toDateString();
        }
        return updatedGoal;
      });
      return updatedGoalList;
    });
    onEditGoal("");
  }

  return (
    <div
      className={`goal 
      ${goal.isGoodPrediction === true ? "good-prediction" : ""} 
      ${goal.isGoodPrediction === false ? "bad-prediction" : ""} 
      ${goal.currentGoal === true ? "current-goal" : ""}`}
    >
      {editGoalId === goal.id ? (
        <input
          className='edit-input'
          type='text'
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
        />
      ) : (
        <h5>{goal.goal}</h5>
      )}
      {editGoalId === goal.id ? (
        <input
          className='edit-input'
          type='date'
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
          min={
            goal.currentGoal
              ? new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              : previousGoal
              ? new Date(
                  new Date(previousGoal.deadline).setDate(
                    new Date(previousGoal.deadline).getDate() + 3
                  )
                )
                  .toISOString()
                  .split("T")[0]
              : new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
          }
        />
      ) : (
        <h6>Deadline: {goal.deadline}</h6>
      )}
      <h6>Remaining Days: {goal.remainingDays}</h6>

      <div className='icons-div'>
        {goal.currentGoal ? (
          <MdDone className='icon' />
        ) : (
          <MdInfoOutline className='icon' />
        )}
        {goal.isCompleted === false ? (
          editGoalId !== goal.id ? (
            <MdEdit onClick={() => onEditGoal(goal.id)} className='icon-edit' />
          ) : (
            <MdSave onClick={handleUpdateGoal} className='icon-edit' />
          )
        ) : null}
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
