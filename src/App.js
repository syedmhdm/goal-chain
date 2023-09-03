import { useState } from "react";
import AddGoalForm from "./AddGoalForm";
import GoalChain from "./GoalChain";
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
      <GoalChain
        goalList={goalList}
        editGoalId={editGoalId}
        setGoalList={setGoalList}
        handleEditGoal={handleEditGoal}
      >
        <AddGoalForm
          goal={goal}
          setGoal={setGoal}
          deadline={deadline}
          goalList={goalList}
          setDeadline={setDeadline}
          onHandleAddGoal={handleAddGoal}
        />
      </GoalChain>
    </div>
  );
}

export default App;
