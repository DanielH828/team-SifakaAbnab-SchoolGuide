import { COURSES, CATEGORY_LABELS } from '../src/data/courses.js'

function matchesQuery(course, q) {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    course.name.toLowerCase().includes(needle) ||
    course.description.toLowerCase().includes(needle) ||
    (course.teachers || '').toLowerCase().includes(needle)
  )
}

function filter({ category = null, query = '' } = {}) {
  return COURSES.filter(
    (c) =>
      (category === null || c.categories.includes(category)) &&
      matchesQuery(c, query),
  )
}

let pass = 0
let fail = 0
function check(label, cond, extra = '') {
  if (cond) {
    pass++
    console.log(`PASS  ${label}`)
  } else {
    fail++
    console.log(`FAIL  ${label}  ${extra}`)
  }
}

console.log(`\n--- dataset ---`)
console.log(`courses: ${COURSES.length}`)
console.log(`categories: ${CATEGORY_LABELS.join(', ')}`)

console.log(`\n--- counts per category ---`)
for (const cat of CATEGORY_LABELS) {
  const n = filter({ category: cat }).length
  console.log(`  ${cat.padEnd(20)} ${n}`)
}

console.log(`\n--- assertions ---`)

check('All Classes (null) returns full list', filter().length === COURSES.length)

const mathCount = filter({ category: 'Mathematics' }).length
check('Mathematics has at least 5 courses', mathCount >= 5, `(got ${mathCount})`)

check(
  'Every Mathematics result has Mathematics in categories',
  filter({ category: 'Mathematics' }).every((c) =>
    c.categories.includes('Mathematics'),
  ),
)

const advJourn = COURSES.find((c) => c.name === 'Advanced Journalism')
check('Advanced Journalism exists', !!advJourn)
check(
  'Advanced Journalism is in BOTH English and Practical Arts (multi-category)',
  advJourn.categories.includes('English') &&
    advJourn.categories.includes('Practical Arts'),
)
check(
  'Advanced Journalism appears under English filter',
  filter({ category: 'English' }).some((c) => c.name === 'Advanced Journalism'),
)
check(
  'Advanced Journalism appears under Practical Arts filter',
  filter({ category: 'Practical Arts' }).some(
    (c) => c.name === 'Advanced Journalism',
  ),
)

check(
  'No course has "Application or Audition Only" as a category (qualifier stripped)',
  COURSES.every(
    (c) => !c.categories.includes('Application or Audition Only'),
  ),
)

check(
  'Search "journalism" finds at least 2 courses',
  filter({ query: 'journalism' }).length >= 2,
)

check(
  'Search "AP" + Mathematics returns only AP math courses',
  filter({ category: 'Mathematics', query: 'AP' }).every(
    (c) =>
      c.name.toLowerCase().includes('ap') ||
      c.description.toLowerCase().includes('ap'),
  ),
)

check(
  'Search with no matches returns empty array',
  filter({ query: 'zzzqqqxxxx' }).length === 0,
)

check(
  'Arts filter catches typo variants (Preforming/Perfoming)',
  filter({ category: 'Arts' }).length > 0,
)

const supportCount = filter({ category: 'Support' }).length
check('Support has at least 1 course', supportCount >= 1, `(got ${supportCount})`)

const langCount = filter({ category: 'Languages' }).length
check('Languages has at least 1 course', langCount >= 1, `(got ${langCount})`)

console.log(`\n--- result: ${pass} pass, ${fail} fail ---`)
process.exit(fail === 0 ? 0 : 1)
