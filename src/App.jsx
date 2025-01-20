import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./Pages/SignUpPage/SignUp";
import Quiz from "./Pages/Quiz/Quiz";
import LogIn from "./Pages/LogIn/LogIn";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Verification from "./Pages/Verification/Verification";
import Error from "./Pages/404Page/Error";
import { UserProvider } from './ContextAPI/UserContext';
import { PointsProvider } from "./ContextAPI/PointsContext";

function App() {
  return (
    <>
      {/* Wrapping the app with both UserProvider and PointsProvider */}
      <UserProvider>
        <PointsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/menu" element={<LandingPage />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </PointsProvider>
      </UserProvider>
    </>
  );
}

export default App;
