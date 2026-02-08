import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'OwnGCC — Student Dashboard',
  description: 'Student Dashboard demo UI for OwnGCC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <div className="bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.06),transparent)]">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

