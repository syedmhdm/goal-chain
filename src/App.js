import { useState } from "react";
import AddGoalForm from "./AddGoalForm";
import GoalChain from "./GoalChain";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "./ForgotPassword";

let initialGoalList = [];

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
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh", fontSize: "1.8rem" }}
      >
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route
                    exact
                    path='/'
                    element={
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
                        <Logout />
                      </GoalChain>
                    }
                  />
                </Route>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
