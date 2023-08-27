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
