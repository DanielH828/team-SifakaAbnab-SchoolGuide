import './CourseList.css'
import ListCard from './ListCard.jsx'
import { useMemo } from 'react'
import { COURSES, CATEGORY_LABELS } from './data/courses.js'
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Volleyball,
  Hammer,
  Globe,
  Palette,
  Languages,
  Users,
  LayoutGrid,
} from 'lucide-react'

const CATEGORY_ICONS = {
  Mathematics: Calculator,
  English: BookOpen,
  Science: FlaskConical,
  'Phys. Ed.': Volleyball,
  'Practical Arts': Hammer,
  'Social Studies': Globe,
  Arts: Palette,
  Languages: Languages,
  Support: Users,
}

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
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  openCourse,
}) {
  const filtered = useMemo(() => {
    return COURSES.filter(
      (c) =>
        (selectedCategory === null || c.categories.includes(selectedCategory)) &&
        matchesQuery(c, searchQuery),
    )
  }, [selectedCategory, searchQuery])

  return (
    <>
      <div className="sticky top-14 z-[5] -mx-4 bg-white/85 px-4 py-3 backdrop-blur-md sm:top-[3.75rem] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="filter-fade">
          <ul
            className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-4 px-1 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
            role="tablist"
            aria-label="Filter by category"
          >
            {[null, ...CATEGORY_LABELS].map((label) => {
              const isActive = selectedCategory === label
              const Icon = label === null ? LayoutGrid : CATEGORY_ICONS[label]
              const displayLabel = label === null ? 'All' : label
              return (
                <li key={label ?? '__all'} className="snap-start">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() =>
                      setSelectedCategory(isActive && label !== null ? null : label)
                    }
                    className={[
                      'font-ui group inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-200',
                      'focus:outline-none focus-visible:ring-4 focus-visible:ring-sif-green/30',
                      isActive
                        ? 'scale-[1.03] border-sif-green bg-sif-green text-white shadow-md shadow-sif-green/30'
                        : 'border-sif-green/20 bg-white text-sif-green hover:border-sif-green/40 hover:bg-sif-mint/30',
                    ].join(' ')}
                  >
                    {Icon && (
                      <Icon
                        className={[
                          'size-4 transition-transform duration-200',
                          isActive ? 'scale-110' : 'group-hover:scale-110',
                        ].join(' ')}
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    )}
                    {displayLabel}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {searchQuery && (
        <div className="searchBanner">
          Showing results for "{searchQuery}"{' '}
          <button onClick={() => setSearchQuery('')}>clear</button>
        </div>
      )}

      <div className="listCard">
        {filtered.length === 0 && <p className="emptyState">No classes match.</p>}
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
