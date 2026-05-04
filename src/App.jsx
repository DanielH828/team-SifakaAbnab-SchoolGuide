import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CourseProfile from './CourseProfile.jsx'
import CourseList from './CourseList.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Homepage from './components/Homepage.jsx'
import ProfileOverlay from './ProfileOverlay.jsx'

import Error from './Error.jsx'
import ReviewCard from './Reviewcard.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("Homepage")
  const [open, setOpen] = useState(false)
  const toggleOverlay = () => (console.log("Toggle Clicked"), setOpen(!open))

  return (
    <>
      <Navbar></Navbar>
      {page === "Homepage" && <Homepage toggleOverlay={toggleOverlay} />}
      {page === "CourseList" && <CourseList />}
      {page === "error" && <Error />}
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
      )}
      
      </>
  )
}

export default App