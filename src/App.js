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
import { MdDone, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
let initialGoalList = [
  {
    id: 1,
    goal: "complete react js course",
    deadline: "Sun Aug 20 2023",
    isCompleted: true,
    goalCompletedOn: "Sun Aug 20 2023",
    goalCreatedAt: "Tue Aug 01 2023",
    previousGoalId: null,
    nextGoalId: 2,
    allocatedDays: 19,
    completedInDays: 19,
    isGoodPrediction: true,
    isDeadlineUpdated: false, // true means bad prediction
  },
  {
    id: 2,
    goal: "Create a banger resume",
    deadline: "Sat Aug 26 2023",
    goalCompletedOn: "Wed Aug 23 2023",
    isCompleted: true,
    goalCreatedAt: "Wed Aug 16 2023",
    previousGoalId: 1,
    nextGoalId: 3,
    allocatedDays: 6,
    completedInDays: 3,
    isGoodPrediction: false,
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
    allocatedDays: 19,
    completedInDays: null,
    isGoodPrediction: null,
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
    isDeadlineUpdated: false,
  },
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

      const curGoal = previousGoalIsCompleted ? true : !previousGoalId;

      const id = crypto.randomUUID();
      let updatedGoalList = [...currGoalList];
      if (updatedGoalList.length > 0) {
        updatedGoalList[updatedGoalList.length - 1].nextGoalId = id;
      }
      return [
        ...updatedGoalList,
        {
          id: id,
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
  // const remainingDays = Math.round(
  //   (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  // );

  const previousGoal = goalList.find(
    (isPreviousGoal) => isPreviousGoal.id === goal.previousGoalId
  );

  function handleDeleteGoal(e) {
    // alert (are you sure that "this goal" is not your cup of tea?)
    setGoalList((otherGoals) => {
      const newGoals = otherGoals.map((el) => {
        let newEl = { ...el };
        if (goal.previousGoalId === el.id) {
          newEl.nextGoalId = goal.nextGoalId;
        }
        if (goal.nextGoalId === el.id) {
          newEl.previousGoalId = goal.previousGoalId;
          if (goal.currentGoal) {
            newEl.currentGoal = true;
          }
        }
        return newEl;
      });
      return newGoals.filter((el) => el.id !== goal.id);
    });
  }

  function handleUpdateGoal(e) {
    if (!editGoal.trim() || !editDeadline) return;

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

  function handleCompleteGoal(e) {
    setGoalList((previousGoalList) => {
      const updatedGoals = previousGoalList.map((singleGoal) => {
        if (singleGoal.isCompleted) {
          return singleGoal;
        } else if (
          goal.id === singleGoal.id &&
          singleGoal.currentGoal &&
          !singleGoal.isCompleted
        ) {
          let completedInDays = 1;
          let isGoodPrediction = true;
          let hlpr = Math.ceil(goal.allocatedDays / 4);
          if (hlpr > 25) {
            hlpr = 25;
          }
          let goalStartDate = goal.goalCreatedAt;
          if (previousGoal) {
            goalStartDate = previousGoal.goalCompletedOn;
          }
          completedInDays = Math.round(
            new Date() / (1000 * 60 * 60 * 24) -
              new Date(goalStartDate) / (1000 * 60 * 60 * 24)
          );
          if (goal.isDeadlineUpdated) {
            isGoodPrediction = false;
          } else if (goal.allocatedDays - completedInDays > hlpr) {
            isGoodPrediction = false;
          }
          return {
            ...singleGoal,
            isCompleted: true,
            goalCompletedOn: new Date().toDateString(),
            completedInDays: completedInDays,
            isGoodPrediction: isGoodPrediction,
            currentGoal: false,
          };
        } else if (goal.id === singleGoal.previousGoalId) {
          const addDays =
            new Date() / (1000 * 60 * 60 * 24) -
            new Date(goal.deadline) / (1000 * 60 * 60 * 24);

          return {
            ...singleGoal,
            currentGoal: true,
            deadline: new Date(
              new Date(singleGoal.deadline).setDate(
                new Date(singleGoal.deadline).getDate() + addDays
              )
            ).toDateString(),
          };
        } else if (!singleGoal.isCompleted) {
          const addDays =
            new Date() / (1000 * 60 * 60 * 24) -
            new Date(goal.deadline) / (1000 * 60 * 60 * 24);

          return {
            ...singleGoal,
            deadline: new Date(
              new Date(singleGoal.deadline).setDate(
                new Date(singleGoal.deadline).getDate() + addDays
              )
            ).toDateString(),
          };
        } else {
          return singleGoal;
        }
      });
      return updatedGoals;
    });
  }

  return (
    <div
      className={`goal 
      ${goal.isGoodPrediction === true ? "good-prediction" : ""} 
      ${goal.isGoodPrediction === false ? "bad-prediction" : ""} 
      ${goal.currentGoal === true ? "current-goal" : "grey-out"}`}
    >
      {editGoalId === goal.id ? (
        <input
          className='edit-input'
          type='text'
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
          maxLength={100}
        />
      ) : (
        <h5>{goal.goal}</h5>
      )}
      {editGoalId === goal.id ? (
        <input
          className='edit-input picker'
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
      ) : goal.isCompleted ? (
        <h6>Completed on: {goal.goalCompletedOn}</h6>
      ) : (
        <h6>Deadline: {goal.deadline}</h6>
      )}
      {goal.isCompleted ? (
        <h6>
          You thought you needed {goal.allocatedDays} days, but you completed In{" "}
          {goal.completedInDays} Days{" "}
          {goal.isDeadlineUpdated ? "(updated deadline)" : null}
        </h6>
      ) : (
        <h6>
          Remaining Days:{" "}
          {Math.round(
            (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          )}
        </h6>
      )}

      <div className='icons-div'>
        <MdDelete onClick={handleDeleteGoal} className='icon-danger' />
        {goal.currentGoal ? (
          <MdDone onClick={handleCompleteGoal} className='icon' />
        ) : null}
        {goal.isCompleted === false ? (
          editGoalId !== goal.id ? (
            <MdEdit onClick={() => onEditGoal(goal.id)} className='icon-edit' />
          ) : (
            <MdSave onClick={handleUpdateGoal} className='icon-edit' />
          )
        ) : null}
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
