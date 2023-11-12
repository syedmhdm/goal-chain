import { useEffect, useState } from "react";
import AddGoalForm from "./AddGoalForm";
import GoalChain from "./GoalChain";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login-v2";
import Logout from "./Logout";
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "./ForgotPassword";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { GoalsContextProvider } from "./contexts/GoalsContext";

function App() {
  // const [goal, setGoal] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [editGoalId, setEditGoalId] = useState("");
  // const [goalList, setGoalList] = useState([]);
  // const { currentUser } = useAuth();
  // let database = "goals";
  // if (currentUser?.email === "muzzammilcareer21@gmail.com") {
  //   database = "my-goals";
  // }
  // const goalsCollectionRef = collection(db, database);

  // const getGoals = async () => {
  //   let addDaysToGoals = 0;
  //   const data = await getDocs(goalsCollectionRef);
  //   setGoalList(
  //     data.docs
  //       .map((doc) => {
  //         let updatedGoal = { ...doc.data(), id: doc.id };
  //         let newDeadline = updatedGoal.deadline;
  //         if (
  //           updatedGoal.isCurrentGoal &&
  //           Math.round(
  //             (new Date(updatedGoal.deadline) - new Date()) /
  //               (1000 * 60 * 60 * 24)
  //           ) < 0
  //         ) {
  //           addDaysToGoals =
  //             new Date() / (1000 * 60 * 60 * 24) -
  //             new Date(updatedGoal.deadline) / (1000 * 60 * 60 * 24);
  //           updatedGoal.allocatedDays = Math.round(
  //             updatedGoal.allocatedDays + addDaysToGoals
  //           );
  //           updatedGoal.isDeadlineUpdated = true;
  //         }
  //         if (addDaysToGoals !== 0) {
  //           newDeadline = new Date(
  //             new Date(updatedGoal.deadline).setDate(
  //               new Date(updatedGoal.deadline).getDate() + addDaysToGoals
  //             )
  //           ).toDateString();
  //           updatedGoal.deadline = newDeadline;
  //         }
  //         return updatedGoal;
  //       })
  //       .sort(function (a, b) {
  //         return new Date(a.deadline) - new Date(b.deadline);
  //       })
  //   );
  // };
  // useEffect(() => {
  //   getGoals();
  // }, []);

  // function handleEditGoal(goalId) {
  //   setEditGoalId(goalId);
  // }
  // async function handleAddGoal(e) {
  //   e.preventDefault();
  //   if (!goal.trim() || !deadline) return;

  //   const previousGoalId = goalList.at(-1)?.id ? goalList.at(-1)?.id : null;
  //   const previousGoalDeadline = goalList.at(-1)?.deadline
  //     ? goalList.at(-1)?.deadline
  //     : null;
  //   const previousGoalIsCompleted = goalList.at(-1)?.isCompleted
  //     ? goalList.at(-1)?.isCompleted
  //     : null;
  //   const curGoal = previousGoalIsCompleted ? true : !previousGoalId;

  //   let newGoal = {
  //     goal: goal,
  //     deadline: new Date(deadline).toDateString(),
  //     isCompleted: false,
  //     goalCreatedAt: new Date().toDateString(),
  //     previousGoalId: previousGoalId,
  //     nextGoalId: null,
  //     allocatedDays: previousGoalDeadline
  //       ? Math.round(
  //           new Date(deadline) / (1000 * 60 * 60 * 24) -
  //             new Date(previousGoalDeadline) / (1000 * 60 * 60 * 24)
  //         )
  //       : Math.round(
  //           new Date(deadline) / (1000 * 60 * 60 * 24) -
  //             new Date() / (1000 * 60 * 60 * 24)
  //         ),
  //     completedInDays: null,
  //     isGoodPrediction: null,
  //     isDeadlineUpdated: false,
  //     isCurrentGoal: curGoal,
  //   };

  //   const newlyAddedDocId = await (
  //     await addDoc(goalsCollectionRef, newGoal)
  //   ).id;
  //   if (goalList.length > 0) {
  //     const goalDoc = doc(db, database, previousGoalId);
  //     const newFields = { nextGoalId: newlyAddedDocId };
  //     await updateDoc(goalDoc, newFields);
  //   }
  //   setGoalList((currGoalList) => {
  //     const previousGoalId = currGoalList.at(-1)?.id;
  //     const previousGoalIsCompleted = currGoalList.at(-1)?.isCompleted;
  //     const previousGoalDeadline = currGoalList.at(-1)?.deadline;
  //     const curGoal = previousGoalIsCompleted ? true : !previousGoalId;
  //     const id = crypto.randomUUID();
  //     let updatedGoalList = [...currGoalList];
  //     if (updatedGoalList.length > 0) {
  //       updatedGoalList[updatedGoalList.length - 1].nextGoalId = id;
  //     }
  //     return [
  //       ...updatedGoalList,
  //       {
  //         id: id,
  //         goal: goal,
  //         deadline: new Date(deadline).toDateString(),
  //         isCompleted: false,
  //         goalCreatedAt: new Date().toDateString(),
  //         previousGoalId: previousGoalId,
  //         nextGoalId: null,
  //         allocatedDays: previousGoalDeadline
  //           ? Math.round(
  //               new Date(deadline) / (1000 * 60 * 60 * 24) -
  //                 new Date(previousGoalDeadline) / (1000 * 60 * 60 * 24)
  //             )
  //           : Math.round(
  //               new Date(deadline) / (1000 * 60 * 60 * 24) -
  //                 new Date() / (1000 * 60 * 60 * 24)
  //             ),
  //         completedInDays: null,
  //         isGoodPrediction: null,
  //         isDeadlineUpdated: false,
  //         isCurrentGoal: curGoal,
  //       },
  //     ];
  //   });
  //   getGoals();
  //   setGoal("");
  //   setDeadline("");
  // }

  return (
    <div className='app'>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "100vh", fontSize: "1.8rem" }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to={"login"} />} />
            <Route path='/login' element={<Login />} />
            <Route
              exact
              path='/app'
              element={
                <ProtectedRoute>
                  <GoalsContextProvider>
                    <AppLayout />
                  </GoalsContextProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
