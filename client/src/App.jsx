import { Route,Routes } from "react-router-dom"

import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Course/Contact"
import CourseDescription from "./pages/Course/CourseDescription"
import CourseList from "./pages/Course/CourseList"
import Denied from "./pages/Denied"
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <>
    <Routes >
      <Route path="/" element={<HomePage/>}> </Route>
      <Route path="/about" element={<AboutUs/>}> </Route>
      <Route path="/signup" element={<SignUp/>}> </Route>
      <Route path="/login" element={<LogIn/>}> </Route>
      <Route path="/contact" element={<Contact/>}> </Route>
      <Route path="/denied" element={<Denied/>}> </Route>

      <Route path="/course/description" element={<CourseDescription />}></Route>

      <Route path="/courses" element={<CourseList/>}> </Route>



      <Route path="*" element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
