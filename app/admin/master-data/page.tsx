"use client"

import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Database, Tags, Users, Settings, FileText, Video } from "lucide-react"

const masterDataSections = [
  {
    title: "Categories",
    description: "Kelola kategori artikel dan video",
    icon: Tags,
    count: "12 kategori",
    href: "/admin/master-data/categories",
  },
  {
    title: "User Roles",
    description: "Kelola peran dan hak akses pengguna",
    icon: Users,
    count: "3 role",
    href: "/admin/master-data/roles",
  },
  {
    title: "Site Settings",
    description: "Pengaturan umum website",
    icon: Settings,
    count: "15 pengaturan",
    href: "/admin/master-data/settings",
  },
  {
    title: "Content Types",
    description: "Kelola tipe konten dan template",
    icon: FileText,
    count: "8 tipe",
    href: "/admin/master-data/content-types",
  },
  {
    title: "Media Library",
    description: "Kelola file media dan aset",
    icon: Video,
    count: "245 file",
    href: "/admin/master-data/media",
  },
  {
    title: "Database Backup",
    description: "Backup dan restore database",
    icon: Database,
    count: "5 backup",
    href: "/admin/master-data/backup",
  },
]

export default function MasterDataPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="py-20 px-[10%] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="py-8 px-[10%]">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Master Data</h1>
            <p className="text-gray-600 mt-2">Kelola data master dan konfigurasi sistem</p>
          </div>

          {/* Master Data Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterDataSections.map((section, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => (window.location.href = section.href)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <section.icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription className="text-sm">{section.count}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Kelola
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Aksi cepat untuk pengelolaan sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Rebuild Search Index</Button>
                <Button variant="outline">Generate Sitemap</Button>
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Import Data</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
