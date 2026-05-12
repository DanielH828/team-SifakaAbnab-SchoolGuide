function ListCard({ courseName2, courseSubject, onClick }) {
  return (
    <div
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
      <p className="subject">{courseSubject}</p>
    </div>
  )
}

export default ListCard
