import { useState } from 'react'
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
  Search,
  Filter,
} from 'lucide-react'

const categories = [
  { label: 'Mathematics', Icon: Calculator },
  { label: 'English', Icon: BookOpen },
  { label: 'Science', Icon: FlaskConical },
  { label: 'Phys. Ed.', Icon: Volleyball },
  { label: 'Practical Arts', Icon: Hammer },
  { label: 'Social Studies', Icon: Globe },
  { label: 'Arts', Icon: Palette },
  { label: 'Languages', Icon: Languages },
  { label: 'Support', Icon: Users },
  { label: 'All Classes', Icon: LayoutGrid },
]



export default function Homepage({ toggleOverlay, goToCourseList }) {
  const [query, setQuery] = useState('')

  const submitSearch = () => {
    goToCourseList({ query: query.trim() })
  }

  const pickCategory = (label) => {
    goToCourseList({ category: label === 'All Classes' ? null : label })
  }

  return (
    <div className="font-ui min-h-svh bg-white text-sif-green">
      <main className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center pt-8 pb-6 text-center sm:pt-16 sm:pb-10 lg:pt-24">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-sif-green sm:text-7xl lg:text-[90px]">
            Sifabnab
          </h1>
          <p className="font-heading mt-3 max-w-3xl text-sm font-bold leading-snug text-sif-muted sm:mt-4 sm:text-xl sm:leading-relaxed lg:text-[26px] lg:leading-[1.75]">
            Your guide to all CCA classes! Find the content, teachers, and more!
            Also, review classes and see the opinions of your peers.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submitSearch()
            }}
            className="mt-5 flex w-full max-w-2xl items-center gap-2 rounded-full bg-sif-search px-4 py-2 sm:mt-10 sm:gap-3 sm:px-5 sm:py-4"
          >
            <Search className="size-4 shrink-0 text-sif-green sm:size-6" strokeWidth={2.5} />
            <input
              type="search"
              aria-label="Search classes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="font-ui flex-1 bg-transparent text-sm text-sif-green placeholder:text-sif-green/60 outline-none sm:text-lg"
            />
            <button
              type="submit"
              aria-label="Search"
              className="shrink-0 cursor-pointer rounded-full p-1 text-sif-green hover:bg-black/5"
            >
              <Filter className="size-4 sm:size-6" strokeWidth={2.5} />
            </button>
          </form>
        </section>

        <section className="pt-2 pb-12 sm:pt-10 sm:pb-20">
          <h2 className="font-heading text-center text-2xl font-bold text-sif-green sm:text-5xl lg:text-[70px]">
            Choose by category:
          </h2>

          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:mt-12 lg:grid-cols-5">
            {categories.map((cat) => (
              <li key={cat.label}>
                <button
                  type="button"
                  onClick={() => pickCategory(cat.label)}
                  className="group flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[10px] bg-sif-mint p-2 text-white transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-sif-green/30 sm:gap-2 sm:rounded-[12px] sm:p-3"
                >
                  <cat.Icon
                    className="size-6 sm:size-8 lg:size-9"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="font-ui text-[11px] font-bold leading-tight sm:text-base lg:text-lg">
                    {cat.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
