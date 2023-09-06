import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { MdDone, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { db } from "./firebase";
export default function Goal({
  goal,
  editGoalId,
  onEditGoal,
  setGoalList,
  goalList,
  getGoals,
  database,
}) {
  const [editGoal, setEditGoal] = useState(goal.goal);
  const [editDeadline, setEditDeadline] = useState(
    new Date(
      new Date(goal.deadline).setDate(new Date(goal.deadline).getDate() + 1)
    )
      .toISOString()
      .split("T")[0]
  );

  const previousGoal = goalList.find(
    (isPreviousGoal) => isPreviousGoal.id === goal.previousGoalId
  );

  async function handleDeleteGoal(e) {
    // alert (are you sure that "this goal" is not your cup of tea?)
    // setGoalList((otherGoals) => {
    //   const newGoals = otherGoals.map((el) => {
    //     let newEl = { ...el };
    //     if (goal.previousGoalId === el.id) {
    //       newEl.nextGoalId = goal.nextGoalId;
    //     }
    //     if (goal.nextGoalId === el.id) {
    //       newEl.previousGoalId = goal.previousGoalId;
    //       if (goal.isCurrentGoal) {
    //         newEl.isCurrentGoal = true;
    //       }
    //     }
    //     return newEl;
    //   });
    //   return newGoals.filter((el) => el.id !== goal.id);
    // });

    if (goal.previousGoalId) {
      const goalDoc = doc(db, database, goal.previousGoalId);
      const newFields = { nextGoalId: goal.nextGoalId };
      await updateDoc(goalDoc, newFields);
    }
    if (goal.nextGoalId) {
      let curGoal = false;
      if (goal.isCurrentGoal) {
        curGoal = true;
      }
      const goalDoc = doc(db, database, goal.nextGoalId);
      const newFields = {
        previousGoalId: goal.previousGoalId,
        isCurrentGoal: curGoal,
      };
      await updateDoc(goalDoc, newFields);
    }

    const goalDoc = doc(db, database, goal.id);
    await deleteDoc(goalDoc);
    getGoals();
  }

  async function handleUpdateGoal(e) {
    if (!editGoal.trim() || !editDeadline) return;

    // setGoalList((previousGoalList) => {
    //   let goalAfterEditGoal = false;
    //   let editGoalPreviousDeadline;

    //   const updatedGoalList = previousGoalList.map((everyGoal) => {
    //     let updatedGoal = { ...everyGoal };
    //     if (everyGoal.isCompleted === true) {
    //       return updatedGoal;
    //     } else if (editGoalId === everyGoal.id) {
    //       updatedGoal.goal = editGoal;

    //       if (everyGoal.deadline !== new Date(editDeadline).toDateString()) {
    //         goalAfterEditGoal = true;
    //         editGoalPreviousDeadline = everyGoal.deadline;
    //         updatedGoal.deadline = new Date(editDeadline).toDateString();
    //         updatedGoal.isDeadlineUpdated = true;
    //         updatedGoal.allocatedDays = previousGoal
    //           ? Math.round(
    //               new Date(editDeadline) / (1000 * 60 * 60 * 24) -
    //                 new Date(previousGoal.goalCompletedOn) /
    //                   (1000 * 60 * 60 * 24)
    //             )
    //           : Math.round(
    //               new Date(editDeadline) / (1000 * 60 * 60 * 24) -
    //                 new Date(goal.goalCreatedAt) / (1000 * 60 * 60 * 24)
    //             );
    //       }
    //     } else if (goalAfterEditGoal) {
    //       const plusOrMinusDays =
    //         new Date(editDeadline) / (1000 * 60 * 60 * 24) -
    //         new Date(editGoalPreviousDeadline) / (1000 * 60 * 60 * 24);
    //       updatedGoal.deadline = new Date(
    //         new Date(everyGoal.deadline).setDate(
    //           new Date(everyGoal.deadline).getDate() + plusOrMinusDays
    //         )
    //       ).toDateString();
    //     }
    //     return updatedGoal;
    //   });
    //   return updatedGoalList;
    // });

    if (goalList.length > 0) {
      const goalDoc = doc(db, database, goal.id);
      const newFields = { goal: editGoal, deadline: editDeadline };
      await updateDoc(goalDoc, newFields);
      getGoals();
    }

    onEditGoal("");
  }

  async function handleCompleteGoal(e) {
    // setGoalList((previousGoalList) => {
    //   const updatedGoals = previousGoalList.map((singleGoal) => {
    //     if (singleGoal.isCompleted) {
    //       return singleGoal;
    //     } else if (
    //       goal.id === singleGoal.id &&
    //       singleGoal.isCurrentGoal &&
    //       !singleGoal.isCompleted
    //     ) {
    //       let completedInDays = 1;
    //       let isGoodPrediction = true;
    //       let hlpr = Math.ceil(goal.allocatedDays / 4);
    //       if (hlpr > 25) {
    //         hlpr = 25;
    //       }
    //       let goalStartDate = goal.goalCreatedAt;
    //       if (previousGoal) {
    //         goalStartDate = previousGoal.goalCompletedOn;
    //       }
    //       completedInDays = Math.round(
    //         new Date() / (1000 * 60 * 60 * 24) -
    //           new Date(goalStartDate) / (1000 * 60 * 60 * 24)
    //       );
    //       if (goal.isDeadlineUpdated) {
    //         isGoodPrediction = false;
    //       } else if (goal.allocatedDays - completedInDays > hlpr) {
    //         isGoodPrediction = false;
    //       }
    //       return {
    //         ...singleGoal,
    //         isCompleted: true,
    //         goalCompletedOn: new Date().toDateString(),
    //         completedInDays: completedInDays,
    //         isGoodPrediction: isGoodPrediction,
    //         isCurrentGoal: false,
    //       };
    //     } else if (goal.id === singleGoal.previousGoalId) {
    //       const addDays =
    //         new Date() / (1000 * 60 * 60 * 24) -
    //         new Date(goal.deadline) / (1000 * 60 * 60 * 24);
    //       return {
    //         ...singleGoal,
    //         isCurrentGoal: true,
    //         deadline: new Date(
    //           new Date(singleGoal.deadline).setDate(
    //             new Date(singleGoal.deadline).getDate() + addDays
    //           )
    //         ).toDateString(),
    //       };
    //     } else if (!singleGoal.isCompleted) {
    //       const addDays =
    //         new Date() / (1000 * 60 * 60 * 24) -
    //         new Date(goal.deadline) / (1000 * 60 * 60 * 24);
    //       return {
    //         ...singleGoal,
    //         deadline: new Date(
    //           new Date(singleGoal.deadline).setDate(
    //             new Date(singleGoal.deadline).getDate() + addDays
    //           )
    //         ).toDateString(),
    //       };
    //     } else {
    //       return singleGoal;
    //     }
    //   });
    //   return updatedGoals;
    // });

    if (goalList.length > 0) {
      const goalDoc = doc(db, database, goal.id);
      const newFields = {
        isCompleted: true,
        isCurrentGoal: false,
        goalCompletedOn: new Date().toDateString(),
      };
      await updateDoc(goalDoc, newFields);
      if (goal.nextGoalId) {
        const goalDoc2 = doc(db, database, goal.nextGoalId);
        const newFields2 = { isCurrentGoal: true };
        await updateDoc(goalDoc2, newFields2);
      }
      getGoals();
    }
  }

  return (
    <div
      className={`goal 
      ${goal.isGoodPrediction === true ? "good-prediction" : ""} 
      ${goal.isGoodPrediction === false ? "bad-prediction" : ""} 
      ${goal.isCurrentGoal === true ? "current-goal" : "grey-out"}`}
    >
      {editGoalId === goal.id ? (
        <input
          className='edit-input'
          type='text'
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
          maxLength={100}
        />
      ) : (
        <h5>{goal.goal}</h5>
      )}
      {editGoalId === goal.id ? (
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
      )}

      <div className='icons-div'>
        <MdDelete onClick={handleDeleteGoal} className='icon-danger' />
        {goal.isCurrentGoal && editGoalId !== goal.id ? (
          <MdDone onClick={handleCompleteGoal} className='icon' />
        ) : null}
        {goal.isCompleted === false ? (
          editGoalId === goal.id ? (
            <MdSave onClick={handleUpdateGoal} className='icon-edit' />
          ) : (
            <MdEdit onClick={() => onEditGoal(goal.id)} className='icon-edit' />
          )
        ) : null}
      </div>
    </div>
  );
}
