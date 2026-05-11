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
        <section className="flex flex-col items-center pt-12 pb-10 text-center sm:pt-16 lg:pt-24">
          <h1 className="font-heading text-6xl font-bold tracking-tight text-sif-green sm:text-7xl lg:text-[90px]">
            Sifabnab
          </h1>
          <p className="font-heading mt-4 max-w-3xl text-lg font-bold leading-relaxed text-sif-muted sm:text-xl lg:text-[26px] lg:leading-[1.75]">
            Your guide to all CCA classes! Find the content, teachers, and more!
            Also, review classes and see the opinions of your peers.
          </p>
        </section>

        <section className="pt-6 pb-20 sm:pt-10">
          <h2 className="font-heading text-center text-4xl font-bold text-sif-green sm:text-5xl lg:text-[70px]">
            Choose by category:
          </h2>

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:mt-14 lg:grid-cols-4 lg:gap-7">
            {categories.map((cat) => (
              <li key={cat.label}>
                <button
                  type="button"
                  onClick={() => pickCategory(cat.label)}
                  className="group flex aspect-[276/229] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[15px] bg-sif-mint p-6 text-white transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-sif-green/30"
                >
                  <cat.Icon
                    className="size-12 sm:size-14 lg:size-16"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="font-ui text-xl font-bold sm:text-2xl lg:text-[30px]">
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
