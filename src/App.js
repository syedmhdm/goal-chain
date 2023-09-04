import { useEffect, useState } from "react";
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editGoalId, setEditGoalId] = useState("");
  const [goalList, setGoalList] = useState([]);
  const goalsCollectionRef = collection(db, "goals");

  useEffect(() => {
    const getGoals = async () => {
      let addDaysToGoals = 0;
      const data = await getDocs(goalsCollectionRef);
      setGoalList(
        data.docs
          .map((doc) => {
            let updatedGoal = { ...doc.data(), id: doc.id };
            let newDeadline = updatedGoal.deadline;
            if (
              updatedGoal.isCurrentGoal &&
              Math.round(
                (new Date(updatedGoal.deadline) - new Date()) /
                  (1000 * 60 * 60 * 24)
              ) < 0
            ) {
              addDaysToGoals =
                new Date() / (1000 * 60 * 60 * 24) -
                new Date(updatedGoal.deadline) / (1000 * 60 * 60 * 24);
              updatedGoal.allocatedDays = Math.round(
                updatedGoal.allocatedDays + addDaysToGoals
              );
              updatedGoal.isDeadlineUpdated = true;
            }
            newDeadline = new Date(
              new Date(updatedGoal.deadline).setDate(
                new Date(updatedGoal.deadline).getDate() + addDaysToGoals
              )
            ).toDateString();
            updatedGoal.deadline = newDeadline;
            return updatedGoal;
          })
          .sort(function (a, b) {
            return new Date(a.deadline) - new Date(b.deadline);
          })
      );
    };
    getGoals();
  }, []);

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
          isCurrentGoal: curGoal,
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
