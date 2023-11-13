import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login-v2";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { GoalsContextProvider } from "./contexts/GoalsContext";
import { GoalsLocalStorageContextProvider } from "./contexts/GoalsContextLocalStorage";

function App() {
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
                    <GoalsLocalStorageContextProvider>
                      <AppLayout />
                    </GoalsLocalStorageContextProvider>
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
