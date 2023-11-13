import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const initialState = {
  goals: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "goals/loaded": {
      if (action.payload?.length) {
        return {
          ...state,
          isLoading: false,
          goals: action.payload,
        };
      } else {
        localStorage.setItem("goals", JSON.stringify([]));
        return {
          ...state,
          isLoading: false,
          goals: JSON.parse(localStorage.getItem("goals")),
        };
      }
    }
    case "goal/created":
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals, action.payload],
      };
    case "goal/deleted": {
      return {
        ...state,
        isLoading: false,
        goals: action.payload,
      };
    }
    case "goal/completed": {
      return {
        ...state,
        isLoading: false,
        goals: action.payload,
      };
    }
    case "goal/updated": {
      return {
        ...state,
        isLoading: false,
        goals: action.payload,
      };
    }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const GoalsLocalStorageContext = createContext();

function GoalsLocalStorageContextProvider({ children }) {
  const [currentEditGoal, setCurrentEditGoal] = useState({});
  const [isLocalStorageGoals, setIsLocalStorageGoals] = useState(false);
  const [{ goals, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchGoals() {
      dispatch({ type: "loading" });
      try {
        const data = JSON.parse(localStorage.getItem("goals"));
        dispatch({ type: "goals/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading goals...",
        });
      }
    }
    fetchGoals();
  }, []);

  async function createGoal(newGoal) {
    dispatch({ type: "loading" });
    try {
      localStorage.setItem("goals", JSON.stringify([...goals, newGoal]));
      dispatch({ type: "goal/created", payload: newGoal });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating goal.",
      });
    }
  }
  async function deleteGoal(goal) {
    dispatch({ type: "loading" });
    try {
      const data = goals.filter((el) => el.id !== goal.id);

      localStorage.setItem("goals", JSON.stringify(data));

      dispatch({ type: "goal/deleted", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting goal.",
      });
    }
  }
  async function completeGoal(goal) {
    dispatch({ type: "loading" });
    try {
      const data = goals.map((el) => {
        if (el.id === goal.id) {
          return { ...el, isCompleted: true };
        }
        return el;
      });

      localStorage.setItem("goals", JSON.stringify(data));

      dispatch({ type: "goal/completed", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error completing goal.",
      });
    }
  }
  async function updateGoal(goal) {
    dispatch({ type: "loading" });
    try {
      const data = goals.map((el) => {
        if (el.id === goal.id) {
          return goal;
        }
        return el;
      });

      localStorage.setItem("goals", JSON.stringify(data));

      dispatch({ type: "goal/updated", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error updating goal.",
      });
    }
  }
  return (
    <GoalsLocalStorageContext.Provider
      value={{
        createGoal,
        isLoading,
        goals,
        deleteGoal,
        completeGoal,
        updateGoal,
        error,
        currentEditGoal,
        setCurrentEditGoal,
        isLocalStorageGoals,
        setIsLocalStorageGoals,
      }}
    >
      {children}
    </GoalsLocalStorageContext.Provider>
  );
}

function useGoalsLocalStorage() {
  const context = useContext(GoalsLocalStorageContext);
  if (context === undefined)
    throw new Error(
      "Goals context can not be accessed GoalsLocalStorageContextProvider"
    );
  return context;
}

export { GoalsLocalStorageContextProvider, useGoalsLocalStorage };
