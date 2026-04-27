import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CourseProfile from './CourseProfile.jsx'
import CourseList from './CourseList.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("courseProfile")

  return (
    <>
      <CourseProfile 
        setPage={setPage}
        courseName="Human Computer Interactions" 
        courseDesc="fake course derection" 
        prereqs="Computer Science Foundations or Intro to Game Design" 
        subject="Comptuer Science"
        difficulty="4.6/10"
        hwTime="0 Hrs"
        teachers="Mr. Hare"
      />
      {page === "courseList" && <CourseList />}
      {page === "courseProfile" && <CourseProfile />}
    </>
  )
}

export default App
