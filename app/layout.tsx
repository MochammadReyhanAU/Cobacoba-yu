import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/toaster"
import UnregisterSW from "@/components/unregister-sw"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agilenesia - Komunitas Agile Indonesia",
  description: "Media komunitas yang mempublikasikan tulisan kolom dan video mengenai topik dan isu agile",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Stop the preview SW error */}
        <UnregisterSW />

        {/* App-wide auth / toast providers */}
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
