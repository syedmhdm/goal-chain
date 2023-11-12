import { Link, useNavigate } from "react-router-dom";

import GoalChain from "../GoalChain";
import Logout from "../Logout";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/Button";
import AddGoalForm from "../components/AddGoalForm-v2";
import GoalList from "../components/GoalList";

function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <GoalList />

      <AddGoalForm />

      <p style={{ fontSize: "1.2rem" }}>
        <strong>Email:</strong> {user.email}
      </p>
      <Button type={"back"} onClick={handleClick}>
        Log Out
      </Button>
    </div>
  );

  return (
    <GoalChain
    // goalList={goalList}
    // editGoalId={editGoalId}
    // setGoalList={setGoalList}
    // handleEditGoal={handleEditGoal}
    // getGoals={getGoals}
    // database={database}
    >
      app
      {/* <AddGoalForm
        goal={goal}
        setGoal={setGoal}
        deadline={deadline}
        goalList={goalList}
        setDeadline={setDeadline}
        onHandleAddGoal={handleAddGoal}
      /> */}
      <Logout />
    </GoalChain>
  );
}

export default AppLayout;
