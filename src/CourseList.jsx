import './CourseList.css'
import ListCard from './ListCard.jsx'



function CourseList({ items = [], openCourse }) {
  return (
    <>
      <div className="cardContainer">
        {items.map((item) => (
          <ListCard 
            key={item.id}
            courseName2={item.class}
            courseSubject={item.subject}
            onClick={() => openCourse(item)}
          />
        ))}
      </div>
    </>
  )
}

export default CourseList
