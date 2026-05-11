import GoogleLogin from "./GoogleAuth";
import { useState } from 'react';
import { Home, Search, SlidersHorizontal, CircleUserRound } from 'lucide-react'

function SearchField({ className = '', value, onChange, onSubmit }) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className={`flex items-center gap-3 rounded-full bg-sif-search px-5 py-2 ${className}`}
      >
        <Search className="size-5 text-sif-green shrink-0" strokeWidth={2.5} />
        <input
          type="search"
          placeholder="Search classes, teachers..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-ui flex-1 bg-transparent text-base text-sif-green placeholder:text-sif-green/60 outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="shrink-0 cursor-pointer rounded-full p-1 text-sif-green hover:bg-black/5"
        >
          <SlidersHorizontal className="size-5" strokeWidth={2.5} />
        </button>
      </form>
    )
  }


function Navbar({ goToCourseList, toggleOverlay, setPage }) {
    const [query, setQuery] = useState('')

    const submitSearch = () => {
        goToCourseList({ query: query.trim() })
    }

    return (
        <header className="sticky top-0 z-10 bg-sif-green">
        <div className="mx-auto flex max-w-[1512px] items-center gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
          <button
            onClick={() => setPage('Homepage')}
            href="#"
            aria-label="Home"
            className="grid size-10 shrink-0 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <Home className="size-5 sm:size-6" strokeWidth={2} />
          </button>
          <div className="hidden flex-1 md:block">
            <SearchField
              className="mx-auto max-w-2xl"
              value={query}
              onChange={setQuery}
              onSubmit={submitSearch}
            />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-[11px] bg-sif-green-accent px-4 py-2 text-sm font-bold text-white hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-base"

            >
              <GoogleLogin></GoogleLogin>
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
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:size-10"
            >
              <CircleUserRound className="size-6 sm:size-7" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>
    );
}

export default Navbar