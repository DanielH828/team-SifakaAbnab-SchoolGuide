import './CourseList.css'
import ListCard from './ListCard.jsx'
import { useMemo } from 'react'
import { CATEGORY_LABELS } from './data/normalizeCourse.js'

function matchesQuery(course, q) {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    course.name.toLowerCase().includes(needle) ||
    course.description.toLowerCase().includes(needle) ||
    (course.teachers || '').toLowerCase().includes(needle)
  )
}

function CourseList({
  courses,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  openCourse,
}) {
  const filtered = useMemo(() => {
    return (courses || []).filter(
      (c) =>
        (selectedCategory === null || c.categories.includes(selectedCategory)) &&
        matchesQuery(c, searchQuery),
    )
  }, [courses, selectedCategory, searchQuery])

  return (
    <>
      <ul className="filterThing">
        <li
          className={selectedCategory === null ? 'active' : ''}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </li>
        {CATEGORY_LABELS.map((label) => (
          <li
            key={label}
            className={selectedCategory === label ? 'active' : ''}
            onClick={() =>
              setSelectedCategory(selectedCategory === label ? null : label)
            }
          >
            {label}
          </li>
        ))}
      </ul>

      {searchQuery && (
        <div className="searchBanner">
          Showing results for "{searchQuery}"{' '}
          <button onClick={() => setSearchQuery('')}>clear</button>
        </div>
      )}

      <div className="listCard">
        {courses === null && <p className="emptyState">Loading classes…</p>}
        {courses !== null && filtered.length === 0 && (
          <p className="emptyState">No classes match.</p>
        )}
        {filtered.map((course) => (
          <ListCard
            key={course.id}
            courseName2={course.name}
            difficulty={course.categories.join(', ') || '—'}
            workload={course.prereq ? `Prereq: ${course.prereq}` : 'No prereqs'}
            onClick={() => openCourse(course)}
          />
        ))}
      </div>
    </>
  )
}

export default CourseList
