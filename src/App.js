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
  // {
  //   id: 1,
  //   goal: "complete react js course",
  //   deadline: "Sun Aug 20 2023",
  //   isCompleted: true,
  //   goalCreatedAt: "Tue Aug 01 2023",
  //   previousGoalId: null,
  //   nextGoalId: 2,
  //   allocatedDays: 19,
  //   completedInDays: 17,
  //   isGoodPrediction: true,
  //   isYourCupOfTea: true, // alert
  //   isDeadlineUpdated: false, // true means bad prediction
  // },
  // {
  //   id: 2,
  //   goal: "Create a banger resume",
  //   deadline: "Sat Aug 26 2023",
  //   isCompleted: true,
  //   goalCreatedAt: "Wed Aug 16 2023",
  //   previousGoalId: 1,
  //   nextGoalId: 3,
  //   allocatedDays: 6,
  //   completedInDays: 3,
  //   isGoodPrediction: false,
  //   isYourCupOfTea: true,
  //   isDeadlineUpdated: false,
  // },
  // {
  //   id: 3,
  //   goal: "apply for remote jobs",
  //   deadline: "Mon Sep 11 2023",
  //   isCompleted: false,
  //   goalCreatedAt: new Date().toDateString(),
  //   previousGoalId: 2,
  //   nextGoalId: 4,
  //   allocatedDays: 14,
  //   completedInDays: null,
  //   isGoodPrediction: null,
  //   isYourCupOfTea: true,
  //   isDeadlineUpdated: false,
  //   currentGoal: true,
  // },
  // {
  //   id: 4,
  //   goal: "prepare for interviews",
  //   deadline: "Sat Sep 23 2023",
  //   isCompleted: false,
  //   goalCreatedAt: new Date().toDateString(),
  //   previousGoalId: 3,
  //   nextGoalId: 5,
  //   allocatedDays: 12,
  //   completedInDays: null,
  //   isGoodPrediction: null,
  //   isYourCupOfTea: true,
  //   isDeadlineUpdated: false,
  // },
  // {
  //   id: 5,
  //   goal: "update github and linkedin profile",
  //   deadline: "Sun Oct 01 2023",
  //   isCompleted: false,
  //   goalCreatedAt: new Date().toDateString(),
  //   previousGoalId: 4,
  //   nextGoalId: 6,
  //   allocatedDays: 8,
  //   completedInDays: null,
  //   isGoodPrediction: null,
  //   isYourCupOfTea: true,
  //   isDeadlineUpdated: false,
  // },
  // {
  //   id: 6,
  //   goal: "make schedule for youtube and stuff after geting a remote job",
  //   deadline: "Tue Oct 31 2023",
  //   isCompleted: false,
  //   goalCreatedAt: new Date().toDateString(),
  //   previousGoalId: 5,
  //   nextGoalId: null,
  //   allocatedDays: 30,
  //   completedInDays: null,
  //   isGoodPrediction: null,
  //   isYourCupOfTea: true,
  //   isDeadlineUpdated: false,
  // },
];

function App() {
  let addDaysToGoals = 0;
  initialGoalList = initialGoalList.map((goal) => {
    let updatedGoal = { ...goal };

    let newDeadline = goal.deadline;
    if (
      goal.currentGoal &&
      Math.round(
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      ) < 0
    ) {
      addDaysToGoals =
        new Date() / (1000 * 60 * 60 * 24) -
        new Date(goal.deadline) / (1000 * 60 * 60 * 24);

      updatedGoal.allocatedDays = Math.round(
        goal.allocatedDays + addDaysToGoals
      );
      updatedGoal.isDeadlineUpdated = true;
    }
    newDeadline = new Date(
      new Date(goal.deadline).setDate(
        new Date(goal.deadline).getDate() + addDaysToGoals
      )
    ).toDateString();

    updatedGoal.deadline = newDeadline;

    return updatedGoal;
  });

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
      const previousGoalId = currGoalList.at(-1)?.id;
      const previousGoalIsCompleted = currGoalList.at(-1)?.isCompleted;
      const previousGoalDeadline = currGoalList.at(-1)?.deadline;

      const curGoal = previousGoalIsCompleted
        ? true
        : !previousGoalId
        ? true
        : false;

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
          allocatedDays: previousGoalDeadline
            ? Math.round(
                new Date(deadline) / (1000 * 60 * 60 * 24) -
                  new Date(previousGoalDeadline) / (1000 * 60 * 60 * 24)
              )
            : Math.round(
                new Date(deadline) / (1000 * 60 * 60 * 24) -
                  new Date() / (1000 * 60 * 60 * 24)
              ),
          completedInDays: null,
          isGoodPrediction: null,
          isYourCupOfTea: true,
          isDeadlineUpdated: false,
          currentGoal: curGoal,
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
          {goalList.map((goal) =>
            goal.isYourCupOfTea ? (
              <Goal
                key={goal.id}
                goal={goal}
                onEditGoal={handleEditGoal}
                editGoalId={editGoalId}
                setGoalList={setGoalList}
                goalList={goalList}
              />
            ) : null
          )}
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
  const remainingDays =
    Math.round((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)) <
    0
      ? 0
      : Math.round(
          (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );

  const previousGoal = goalList.find(
    (isPreviousGoal) => isPreviousGoal.id === goal.previousGoalId
  );

  function handleDeleteGoal(e) {
    // alert (are you sure that "this goal" is not your cup of tea?)
    setGoalList((otherGoals) => {
      let help = false;
      const newGoals = otherGoals.map((otherGoal) => {
        let newOtherGoal = { ...otherGoal };
        if (otherGoal.id === goal.id) {
          if (goal.currentGoal) {
            help = true;
          }
          newOtherGoal.isYourCupOfTea = false;
        } else if (otherGoal.id === goal.previousGoalId) {
          newOtherGoal.nextGoalId = goal.nextGoalId;
        } else if (otherGoal.id === goal.nextGoalId) {
          if (!otherGoal.currentGoal) {
            newOtherGoal.currentGoal = help;
          }
          newOtherGoal.previousGoal = goal.previousGoalId;
        }
        return newOtherGoal;
      });
      return newGoals;
    });
  }

  function handleUpdateGoal(e) {
    setGoalList((previousGoalList) => {
      let goalAfterEditGoal = false;
      let editGoalPreviousDeadline;

      const updatedGoalList = previousGoalList.map((everyGoal) => {
        let updatedGoal = { ...everyGoal };
        if (everyGoal.isCompleted === true) {
          return updatedGoal;
        } else if (editGoalId === everyGoal.id) {
          updatedGoal.goal = editGoal;

          if (everyGoal.deadline !== new Date(editDeadline).toDateString()) {
            goalAfterEditGoal = true;
            editGoalPreviousDeadline = everyGoal.deadline;
            updatedGoal.deadline = new Date(editDeadline).toDateString();
            // updatedGoal.isGoodPrediction = false; (only when marked completed)
            updatedGoal.isDeadlineUpdated = true; // (false if deadline is not updated)
            updatedGoal.previousAllocatedDays = everyGoal.previousAllocatedDays
              ? [...everyGoal.previousAllocatedDays, everyGoal.allocatedDays]
              : [everyGoal.allocatedDays];

            updatedGoal.allocatedDays = previousGoal
              ? Math.round(
                  new Date(editDeadline) / (1000 * 60 * 60 * 24) -
                    new Date(previousGoal.deadline) / (1000 * 60 * 60 * 24)
                )
              : Math.round(
                  new Date(editDeadline) / (1000 * 60 * 60 * 24) -
                    new Date() / (1000 * 60 * 60 * 24)
                );
          }
        } else if (goalAfterEditGoal) {
          const plusOrMinusDays =
            new Date(editDeadline) / (1000 * 60 * 60 * 24) -
            new Date(editGoalPreviousDeadline) / (1000 * 60 * 60 * 24);
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
      <h6>Remaining Days: {remainingDays}</h6>

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
        <MdDelete onClick={handleDeleteGoal} className='icon-danger' />
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
