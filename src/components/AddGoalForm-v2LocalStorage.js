import { useEffect, useState } from "react";
import styles from "../pages/Login.module.css";
import Button from "../components/Button";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGoalsLocalStorage } from "../contexts/GoalsContextLocalStorage";

export default function AddGoalFormLocalStorage() {
  const [goal, setGoal] = useState("New Goal");
  const [deadline, setDeadline] = useState("");
  const {
    createGoal,
    isLoading,
    currentEditGoal,
    updateGoal,
    setCurrentEditGoal,
  } = useGoalsLocalStorage();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    if (goal.trim().length > 2 && deadline) {
      const newGoal = {
        goal,
        deadline,
        isCompleted: false,
        id: crypto.randomUUID(),
      };
      if (currentEditGoal.id) {
        const updatedGoal = { ...currentEditGoal, goal, deadline };
        await updateGoal(updatedGoal);
        setCurrentEditGoal({});
      } else {
        await createGoal(newGoal);
      }
      setGoal("");
      setDeadline("");
    }
  }

  useEffect(
    function () {
      if (currentEditGoal.id) {
        setGoal(currentEditGoal.goal);
        setDeadline(new Date(currentEditGoal.deadline));
      }
    },
    [currentEditGoal.goal, currentEditGoal.deadline, currentEditGoal.id]
  );

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
          <Button type={"primary"}>
            {currentEditGoal.id ? "Update Goal" : "Add Goal"}
          </Button>
        </div>
      </form>
    </main>
  );
}
