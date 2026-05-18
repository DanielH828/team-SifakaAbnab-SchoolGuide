import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import CourseProfile from './CourseProfile.jsx'
import CourseList from './CourseList.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Homepage from './components/Homepage.jsx'
// import ProfileOverlay from './ProfileOverlay.jsx'
import Error from './Error.jsx'
import ReviewCard from './Reviewcard.jsx'

function App() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState('Homepage')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const itemsCollection = collection(db, 'placeholderID')

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollection)
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getItems()
  }, [])

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
        <Homepage toggleOverlay={toggleOverlay} 
        goToCourseList={goToCourseList} />
      )}
      {page === 'CourseList' && (
        <CourseList
          items={items}
          openCourse={openCourse}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      {page === 'courseProfile' && selectedCourse && (
        <>
          <CourseProfile
            setPage={setPage}
            courseName={selectedCourse.class || 'Nonesssssssssssssssss'}
            courseDesc={selectedCourse.desc || 'None'}
            prereqs={selectedCourse.prereq || 'None'}
            subject={selectedCourse.subject || 'Uncategorized'}
            teachers={selectedCourse.teacher || 'TBD'}
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
