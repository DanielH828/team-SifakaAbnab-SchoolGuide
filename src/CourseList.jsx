import './CourseList.css'
import ListCard from './ListCard.jsx'
import { useMemo } from 'react'
import { normalizeCourse, CATEGORY_LABELS } from './data/normalizeCourse.js'

function matchesQuery(item, q) {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    (item.class || '').toLowerCase().includes(needle) ||
    (item.desc || '').toLowerCase().includes(needle) ||
    (item.teacher || '').toLowerCase().includes(needle) ||
    (item.subject || '').toLowerCase().includes(needle)
  )
}

function CourseList({
  items = [],
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  openCourse,
}) {
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!matchesQuery(item, searchQuery)) return false
      if (!selectedCategory) return true
      const { categories } = normalizeCourse(item.id, item)
      return categories.includes(selectedCategory)
    })
  }, [items, selectedCategory, searchQuery])

  return (
    <>
      <ul className="filterThing">
        <li
          className={!selectedCategory ? 'active' : ''}
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

      <div className="cardContainer">
        {filtered.length === 0 && (
          <p className="emptyState">No classes match.</p>
        )}
        {filtered.map((item) => (
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
