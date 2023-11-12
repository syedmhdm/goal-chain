// import { deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { useState } from "react";
import { MdDone, MdDelete, MdEdit, MdSave } from "react-icons/md";
// import { db } from "./firebase";
export default function Goal({ goal }) {
  // const [editGoal, setEditGoal] = useState(goal.goal);
  // const [editDeadline, setEditDeadline] = useState(
  //   new Date(
  //     new Date(goal.deadline).setDate(new Date(goal.deadline).getDate() + 1)
  //   )
  //     .toISOString()
  //     .split("T")[0]
  // );

  // const previousGoal = goalList.find(
  //   (isPreviousGoal) => isPreviousGoal.id === goal.previousGoalId
  // );

  async function handleDeleteGoal(e) {
    if (goal.previousGoalId) {
      // const goalDoc = doc(db, database, goal.previousGoalId);
      // const newFields = { nextGoalId: goal.nextGoalId };
      // await updateDoc(goalDoc, newFields);
    }
    if (goal.nextGoalId) {
      let curGoal = false;
      if (goal.isCurrentGoal) {
        curGoal = true;
      }
      // const goalDoc = doc(db, database, goal.nextGoalId);
      // const newFields = {
      //   previousGoalId: goal.previousGoalId,
      //   isCurrentGoal: curGoal,
      // };
      // await updateDoc(goalDoc, newFields);
    }

    // const goalDoc = doc(db, database, goal.id);
    // await deleteDoc(goalDoc);
    // getGoals();
  }

  async function handleUpdateGoal(e) {
    // if (!editGoal.trim() || !editDeadline) return;
    // if (goalList.length > 0) {
    //   const goalDoc = doc(db, database, goal.id);
    //   const newFields = { goal: editGoal, deadline: editDeadline };
    //   await updateDoc(goalDoc, newFields);
    //   getGoals();
    // }
    // onEditGoal("");
  }

  async function handleCompleteGoal(e) {
    // if (goalList.length > 0) {
    //   const goalDoc = doc(db, database, goal.id);
    //   const newFields = {
    //     isCompleted: true,
    //     isCurrentGoal: false,
    //     goalCompletedOn: new Date().toDateString(),
    //   };
    //   await updateDoc(goalDoc, newFields);
    //   if (goal.nextGoalId) {
    //     const goalDoc2 = doc(db, database, goal.nextGoalId);
    //     const newFields2 = { isCurrentGoal: true };
    //     await updateDoc(goalDoc2, newFields2);
    //   }
    //   getGoals();
    // }
  }

  const deadline = new Date(goal.deadline).toDateString();
  return (
    <div
      className={`goal 
      ${true ? "good-prediction" : ""} 
      ${false ? "bad-prediction" : ""} 
      ${true ? "current-goal" : "grey-out"}`}
    >
      {/* {editGoalId === goal.id ? (
        <input
          className='edit-input'
          type='text'
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
          maxLength={100}
        />
      ) : (
        <h5>{goal.goal}</h5>
      )} */}
      {/* {editGoalId === goal.id ? (
        <input
          className='edit-input picker'
          type='date'
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
          min={
            goal.isCurrentGoal
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
      ) : goal.goalCompletedOn ? (
        <>
          <h6>Deadline: {goal.deadline}</h6>
          <h6>Completed on: {goal.goalCompletedOn}</h6>
        </>
      ) : (
        <h6>Deadline: {goal.deadline}</h6>
        )} */}
      <h5>{goal.goal}</h5>
      <h6>Deadline: {deadline}</h6>
      <div className='icons-div'>
        <MdDelete onClick={handleDeleteGoal} className='icon-danger' />
        <MdDone onClick={handleCompleteGoal} className='icon' />
        <MdSave onClick={handleUpdateGoal} className='icon-edit' />
        <MdEdit className='icon-edit' />
      </div>
    </div>
  );
}
