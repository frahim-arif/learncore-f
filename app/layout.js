// app/layout.js
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'Webcore Cube Tech - Web Development Courses',
  description: 'Sell your web development course. Responsive & modern.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
