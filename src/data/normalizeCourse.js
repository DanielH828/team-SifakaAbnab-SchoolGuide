// Translates raw Firebase course docs into the shape the course list/filter
// expects. Firebase docs look like:
//   { class, subject, teacher, prereq, suggested_req, desc }
// and `subject` is a single raw string with typo variants, so it gets mapped
// to canonical category labels here.

const SUBJECT_ALIASES = {
  Mathematics: ['Math'],
  English: ['English'],
  Science: ['Science'],
  'Phys. Ed.': ['Physical Education'],
  'Practical Arts': ['Practical Arts', 'Pratical Arts'],
  'Social Studies': ['Social Studies'],
  Arts: [
    'Visual and Performing Arts',
    'Visual and Preforming Arts',
    'Visual and Perfoming Arts',
    'Visual and Preforming',
  ],
  Languages: ['Foreign Language'],
  Support: ['Student Support Classes'],
}

export const CATEGORY_LABELS = Object.keys(SUBJECT_ALIASES)

const aliasToCanonical = new Map()
for (const [canonical, aliases] of Object.entries(SUBJECT_ALIASES)) {
  for (const alias of aliases) aliasToCanonical.set(alias.toLowerCase(), canonical)
}

function toCategories(subjectRaw) {
  const categories = []
  for (const piece of String(subjectRaw || '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)) {
    const canonical = aliasToCanonical.get(piece.toLowerCase())
    if (canonical && !categories.includes(canonical)) categories.push(canonical)
  }
  return categories
}

export function normalizeCourse(id, doc) {
  const prereq = (doc.prereq || '').trim()
  return {
    id,
    name: (doc.class || '').trim(),
    categories: toCategories(doc.subject),
    description: doc.desc || '',
    teachers: doc.teacher || '',
    prereq: prereq && prereq.toLowerCase() !== 'none' ? prereq : '',
  }
}
