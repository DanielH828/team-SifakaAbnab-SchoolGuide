import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import CourseProfile from './CourseProfile.jsx'
import CourseList from './CourseList.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Homepage from './components/Homepage.jsx'
// import ProfileOverlay from './ProfileOverlay.jsx'
import Error from './Error.jsx'
import ReviewCard from './Reviewcard.jsx'

function App() {
  const [page, setPage] = useState('Homepage')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const toggleOverlay = () => setOverlayOpen((v) => !v)

  const goToCourseList = ({ category = null, query = '' } = {}) => {
    setSelectedCategory(category)
    setSearchQuery(query)
    setPage('CourseList')
  }

  const openCourse = (course) => {
    setSelectedCourse(course)
    setPage('courseProfile')
  }

  return (
    <>
      <Navbar 
        goToCourseList={goToCourseList}
        // toggleOverlay={toggleOverlay}
        setPage={setPage}
        user={user}
        />
      {overlayOpen && <ProfileOverlay userName="Guest" setPage={(p) => { setOverlayOpen(false); setPage(p) }} />}
      {page === 'Homepage' && (
        <Homepage toggleOverlay={toggleOverlay} goToCourseList={goToCourseList} />
      )}
      {page === 'CourseList' && (
        <CourseList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openCourse={openCourse}
        />
      )}
      {page === 'courseProfile' && selectedCourse && (
        <>
          <CourseProfile
            setPage={setPage}
            courseName={selectedCourse.name}
            courseDesc={selectedCourse.description}
            prereqs={selectedCourse.prereq || 'None'}
            subject={selectedCourse.categories.join(', ') || 'Uncategorized'}
            difficulty="—"
            hwTime="—"
            teachers={selectedCourse.teachers || 'TBD'}
          />
          <ReviewCard
            selectedCourse={selectedCourse.id}
          />
        </>
      )}
      {page === 'error' && <Error />}
    </>
  )
}

export default App
