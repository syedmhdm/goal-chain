# Goal Chain

Add goals and its deadline, This project helps you in predicting the time to achieve a particular goal.

When you add a goal and it's deadline date and you mark the goal as completed near the deadline date, then it's a good prediction of the deadline date in accordance with the goal.

If you mark the goal as completed too soon or if you change the goal's deadline date then it's a bad prediction.

## Ideologies

you can only do one thing at a time.
you can not change the past.

### Some Random Data

const accuracyPercentage = 75; if "allocatedDays" is greater than 100 days then setting "isCompleted" to true within last 25 days of deadline will also set "isGoodPrediction" to true

// only the current goal's date range is editable

// user entered data
// goal: "complete react js course",
// deadline: "Tue Oct 31 2023",
// isCompleted: false,

### New Feature Idea

Editing a goal results in updating:

Currently editing goal: if (current goal)
goal
deadline
previousAllocatedDays [13,32,42...] (add new property)
allocatedDays
isGoodPrediction false
isDeadlineUpdated: true (false if deadline is not updated)

goalAfterEditGoal:
deadline

data and logic is done for this feature, UI is work remains
new feature idea:
in info popup:
edit date history
goal edit history
dead line edit history
allocatedDays history
reason for good or bad prediction.

delete need to be completed

// multitasking is ineffeciant so,
// idel mind is devil's home so,
// goal "make money..." and goal "buy bike..." are overlaping from "date" to "date" (info)
// updating this goal's deadline will result in changing the remaining goal deadlines as well. Are you sure?
