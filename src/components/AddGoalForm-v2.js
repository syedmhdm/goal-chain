import { useState } from "react";
import styles from "../pages/Login.module.css";
import Button from "../components/Button";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGoals } from "../contexts/GoalsContext";

export default function AddGoalForm() {
  const [goal, setGoal] = useState("New Goal");
  const [deadline, setDeadline] = useState("");
  const { createGoal, isLoading } = useGoals();

  async function handleSubmit(e) {
    e.preventDefault();
    if (goal.trim().length > 2 && deadline) {
      const newGoal = {
        goal,
        deadline,
      };
      await createGoal(newGoal);
    }
  }

  return (
    <main className={styles.login}>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor='goal'>Goal</label>
          <input
            type='text'
            id='goal'
            maxLength={100}
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='deadline'>Deadline</label>
          <Datepicker
            id='deadline'
            onChange={(date) => setDeadline(date)}
            selected={deadline}
            dateFormat={"dd/MM/yyyy"}
            className={styles["deadline-date"]}
          />
          {/* onKeyDown={(e) => e.preventDefault()} */}
        </div>
        <div>
          <Button type={"primary"}>Add Goal</Button>
        </div>
      </form>
    </main>
  );
}
