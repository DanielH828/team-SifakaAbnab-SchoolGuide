import {
  Home,
  Search,
  SlidersHorizontal,
  CircleUserRound,
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
import profileOverlay from '../ProfileOverlay.jsx'
import App from '../App.jsx'

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

function SearchField({ className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full bg-sif-search px-5 py-3 ${className}`}
    >
      <Search className="size-5 text-sif-green shrink-0" strokeWidth={2.5} />
      <input
        type="search"
        placeholder="Search classes, teachers..."
        className="font-ui flex-1 bg-transparent text-base text-sif-green placeholder:text-sif-green/60 outline-none"
      />
      <button
        type="button"
        aria-label="Filters"
        className="shrink-0 cursor-pointer rounded-full p-1 text-sif-green hover:bg-black/5"
      >
        <SlidersHorizontal className="size-5" strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default function Homepage({ toggleOverlay }) {
  return (
    <div className="font-ui min-h-svh bg-white text-sif-green">
      <header className="sticky top-0 z-10 bg-sif-green">
        <div className="mx-auto flex max-w-[1512px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <a
            href="#"
            aria-label="Home"
            className="grid size-11 shrink-0 place-items-center rounded-full text-white hover:bg-white/10 sm:size-12"
          >
            <Home className="size-6 sm:size-7" strokeWidth={2} />
          </a>

          <div className="hidden flex-1 md:block">
            <SearchField className="mx-auto max-w-2xl" />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-[11px] bg-sif-green-accent px-4 py-2 text-sm font-bold text-white hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-base"
            >
              Log in
            </button>
            <a
              href="#"
              className="hidden font-bold text-white hover:underline sm:inline"
            >
              Sign up
            </a>
            <button onClick={() => toggleOverlay()}
              type="button"
              aria-label="Account"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:size-12"
            >
              <CircleUserRound className="size-7 sm:size-8" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1512px] px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center pt-12 pb-10 text-center sm:pt-16 lg:pt-24">
          <h1 className="font-heading text-6xl font-bold tracking-tight text-sif-green sm:text-7xl lg:text-[90px]">
            Sifabnab
          </h1>
          <p className="font-heading mt-4 max-w-3xl text-lg font-bold leading-relaxed text-sif-muted sm:text-xl lg:text-[26px] lg:leading-[1.75]">
            Your guide to all CCA classes! Find the content, teachers, and more!
            Also, review classes and see the opinions of your peers.
          </p>

          <SearchField className="mt-8 w-full max-w-3xl md:hidden" />
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
