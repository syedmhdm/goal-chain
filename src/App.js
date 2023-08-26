import { useState } from "react";
const accuracyPercentage = 75; // if "allocatedDays" is greater than 100 days then setting "isCompleted" to true within last 25 days of deadline will also set "isGoodPrediction" to true

// only the current goal's date range is editable

// user entered data
// goal: "complete react js course",
// deadline: "Tue Oct 31 2023",
// isCompleted: false,
let initialGoalList = [
  {
    id: crypto.randomUUID(),
    goal: "complete react js course",
    deadline: "Tue Oct 31 2023",
    isCompleted: false,
    goalCreatedAt: new Date().toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
    allocatedDays: "",
    completedInDays: "",
    isGoodPrediction: true,
    isYourCupOfTea: true, // alert
    isDeadlineUpdated: false, // true means bad prediction
  },
  {
    id: crypto.randomUUID(),
    goal: "Create a banger resume",
    deadline: "Tue Nov 7 2023",
    completed: false,
    goalCreatedAt: new Date(
      new Date().setDate(new Date().getDate() - 6)
    ).toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
  },
  {
    id: crypto.randomUUID(),
    goal: "apply for remote jobs",
    deadline: "Tue Oct 31 2023",
    completed: false,
    goalCreatedAt: new Date(
      new Date().setDate(new Date().getDate() - 11)
    ).toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
  },
  {
    id: crypto.randomUUID(),
    goal: "prepare for interviews",
    deadline: "Tue Oct 31 2023",
    completed: false,
    goalCreatedAt: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
  },
  {
    id: crypto.randomUUID(),
    goal: "update github and linkedin profile",
    deadline: "Tue Oct 31 2023",
    completed: false,
    goalCreatedAt: new Date(
      new Date().setDate(new Date().getDate() - 16)
    ).toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
  },
  {
    id: crypto.randomUUID(),
    goal: "make schedule for youtube and stuff after geting a remote job",
    deadline: "Tue Oct 31 2023",
    completed: false,
    goalCreatedAt: new Date(
      new Date().setDate(new Date().getDate() - 3)
    ).toDateString(),
    preRequisiteGoalId: crypto.randomUUID(),
    postRequisiteGoalId: crypto.randomUUID(),
  },
];

function App() {
  initialGoalList = initialGoalList.map((goal) => ({
    ...goal,
    remainingDays: Math.round(
      (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    ),
  }));

  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalList, setGoalList] = useState([]);

  console.log(initialGoalList);

  return (
    <div style={{ marginLeft: "5rem" }}>
      <h3>Add New Goal</h3>

      <label>Enter Goal</label>
      <br />
      <input
        type='text'
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <br />
      <br />

      <label>Select Deadline</label>
      <br />
      <input
        type='date'
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br />
      <br />

      <button>Add Goal</button>

      <br />
      <br />
      <h3>Goal List</h3>
    </div>
  );
}

export default App;
