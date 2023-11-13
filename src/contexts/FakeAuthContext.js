import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknow Action");
  }
}

const FAKE_USER = {
  name: "Muzzammil",
  email: "jack@example.com",
  password: "qwerty@842",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (
      email === process.env.REACT_APP_FAKE_LOGIN_EMAIL &&
      password === process.env.REACT_APP_FAKE_LOGIN_PASSWORD
    ) {
      dispatch({
        type: "login",
        payload: {
          ...FAKE_USER,
          email: process.env.REACT_APP_FAKE_LOGIN_EMAIL,
          password: process.env.REACT_APP_FAKE_LOGIN_PASSWORD,
        },
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
