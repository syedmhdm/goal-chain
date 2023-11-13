import styles from "./AppLayout.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/Button";
import AddGoalForm from "../components/AddGoalForm-v2";
import GoalList from "../components/GoalList";
import { useGoals } from "../contexts/GoalsContext";
import GoalListLocalStorage from "../components/GoalListLocalStorage";
import AddGoalFormLocalStorage from "../components/AddGoalForm-v2LocalStorage";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const { user, logout } = useAuth();
  const { isLocalStorageGoals, setIsLocalStorageGoals } = useGoals();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div style={{ position: "relative" }}>
      {isLocalStorageGoals ? <GoalListLocalStorage /> : <GoalList />}
      <div className={styles.useloacalstorage}>
        use local storage &nbsp;
        <label className={styles.switch}>
          <input
            type='checkbox'
            value={isLocalStorageGoals}
            onChange={(e) => setIsLocalStorageGoals((val) => !val)}
          />
          <span className={styles.slider + " " + styles.round}></span>
        </label>
      </div>
      {isLocalStorageGoals ? <AddGoalFormLocalStorage /> : <AddGoalForm />}
      <p style={{ fontSize: "1.2rem" }}>
        <strong>Email:</strong> {user.email}
      </p>
      <Button type={"back"} onClick={handleClick}>
        Log Out
      </Button>
    </div>
  );
}

export default AppLayout;
