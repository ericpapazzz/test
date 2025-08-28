import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'User Management System',
  description: 'Simple user management with API integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}