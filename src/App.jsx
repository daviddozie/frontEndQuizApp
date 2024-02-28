import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage/LandingPage"
import SignUp from "./Pages/SignUpPage/SignUp"
import Quiz from "./Pages/Quiz/Quiz"
import LogIn from "./Pages/LogIn/LogIn"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import Verification from "./Pages/Verification/Verification"
import Error from "./Pages/404Page/Error"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/meun' element={<LandingPage />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
