import React from 'react'

// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-pink border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} WebcoreCubeTech — All rights reserved</div>
        <div className="flex gap-4 text-sm">
          <a href="/privacy" className="hover:text-brand">Privacy</a>
          <a href="/terms" className="hover:text-brand">Terms</a>
        </div>
      </div>
    </footer>
  )
}

