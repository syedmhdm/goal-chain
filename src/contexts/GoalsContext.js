import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";
const initialState = {
  goals: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "goals/loaded":
      return {
        ...state,
        isLoading: false,
        goals: action.payload,
      };
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
        goals: state.goals.filter((el) => el.id !== action.payload.id),
      };
    }
    case "goal/completed": {
      return {
        ...state,
        isLoading: false,
        goals: state.goals.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, isCompleted: true };
          }
          return el;
        }),
      };
    }
    case "goal/updated": {
      return {
        ...state,
        isLoading: false,
        goals: state.goals.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
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

const GoalsContext = createContext();

function GoalsContextProvider({ children }) {
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
        const res = await fetch(`${BASE_URL}/goals`);
        const data = await res.json();
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
      const res = await fetch(`${BASE_URL}/goals`, {
        method: "POST",
        body: JSON.stringify(newGoal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "goal/created", payload: data });
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
      await fetch(`${BASE_URL}/goals/${goal.id}`, {
        method: "DELETE",
      });

      dispatch({ type: "goal/deleted", payload: goal });
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
      await fetch(`${BASE_URL}/goals/${goal.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...goal,
          isCompleted: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "goal/completed", payload: goal });
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
      await fetch(`${BASE_URL}/goals/${goal.id}`, {
        method: "PUT",
        body: JSON.stringify(goal),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "goal/updated", payload: goal });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error updating goal.",
      });
    }
  }
  return (
    <GoalsContext.Provider
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
    </GoalsContext.Provider>
  );
}

function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined)
    throw new Error("Goals context can not be accessed GoalsContextProvider");
  return context;
}

export { GoalsContextProvider, useGoals };
