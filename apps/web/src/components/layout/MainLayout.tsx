import { type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

// Used by any component that needs to manually wrap content
interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
