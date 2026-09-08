import { Link, Route, Routes } from 'react-router-dom'
import { AddJournalPage } from '@/pages/AddJournalPage'
import { HomePage } from '@/pages/HomePage'
import { MyJournalsPage } from '@/pages/MyJournalsPage'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-4">
          <Link to="/" className="text-sm font-semibold text-text">
            📅 Daily Journal
          </Link>
          <Link to="/journals" className="text-sm font-medium text-text-muted hover:text-text">
            My Journals
          </Link>
          <Link to="/journal/new" className="text-sm font-medium text-text-muted hover:text-text">
            Add New Journal
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<MyJournalsPage />} />
          <Route path="/journal/new" element={<AddJournalPage />} />
        </Routes>
      </main>
    </div>
  )
}
