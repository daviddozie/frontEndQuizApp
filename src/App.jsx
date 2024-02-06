import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage/LandingPage"
import Quiz from "./Pages/Quiz/Quiz"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
