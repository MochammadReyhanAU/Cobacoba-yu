"use client"

import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Users, FileText, Video, MessageSquare, TrendingUp, Eye } from "lucide-react"

export default function AdminDashboardPage() {
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

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Articles",
      value: "89",
      icon: FileText,
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Total Videos",
      value: "45",
      icon: Video,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Comments",
      value: "567",
      icon: MessageSquare,
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Page Views",
      value: "12.5K",
      icon: Eye,
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Engagement Rate",
      value: "68%",
      icon: TrendingUp,
      change: "+3%",
      changeType: "positive",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="py-16 px-[10%]">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Selamat datang kembali, {user.name}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> dari bulan lalu
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Artikel yang baru dipublikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Digital Body Language - Bagian {item}</p>
                        <p className="text-xs text-gray-500">2 jam yang lalu</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Komentar terbaru dari pengguna</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Komentar baru dari User {item}</p>
                        <p className="text-xs text-gray-500">1 jam yang lalu</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
