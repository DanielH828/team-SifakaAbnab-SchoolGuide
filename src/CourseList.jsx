import './CourseList.css'
import ListCard from './ListCard.jsx'


function CourseList() {
  

  return (
    <>
      <div className="cardContainer">
        {items.map((item) => (
          <ListCard 
            key={item.id}
            courseName2={item.class}
            courseSubject={item.subject}
          />
        ))}
      </div>
    </>
  )
}

export default CourseList
