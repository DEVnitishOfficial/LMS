import { Route,Routes } from "react-router-dom"

import RequireAuth from "./components/Auth/RequireAuth"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Course/Contact"
import CourseDescription from "./pages/Course/CourseDescription"
import CourseList from "./pages/Course/CourseList"
import CreateCourse from "./pages/Course/CreateCourse"
import Denied from "./pages/Denied"
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import UserProfile from "./pages/User/userProfile"

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

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
      <Route path="/course/create" element={<CreateCourse />}> </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
      <Route path="/user/profile" element={<UserProfile />} />
      </Route>

      <Route path="/courses" element={<CourseList/>}> </Route>



      <Route path="*" element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
