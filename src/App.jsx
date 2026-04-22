import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CourseProfile from './CourseProfile.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CourseProfile 
        courseName="Human Computer Interactions" 
        courseDesc="fake course derection" 
        prereqs="Computer Science Foundations or Intro to Game Design" 
        subject="Comptuer Science"
        difficulty="4.6/10"
        hwTime="0 Hrs"
      />
    </>
  )
}

export default App
