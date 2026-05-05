import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CourseProfile from './CourseProfile.jsx'
import CourseList from './CourseList.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'

import Error from './Error.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("courseProfile")

  return (
    <>
      {page === "courseList" && <CourseList />}
      
      {page === "courseProfile" && (
        <> {/* Added this Fragment to wrap the two components */}
          <Navbar />
          <CourseProfile 
            setPage={setPage}
            courseId = "3"
          />
        </>
      )}
    </>
  )
}

export default App
