import './ListCard.css'

function ListCard({ courseName2, courseDescription, difficulty, workload, onClick }) {
  return (
    <div id="listCard"
      className="courseCard"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <h2 className="Name">{courseName2}</h2>
      <p className="desc">{courseDescription}</p>
      <p className="load">{workload}</p>
      <p className="diffic">{difficulty}</p>
    </div>
  )
}

export default ListCard
