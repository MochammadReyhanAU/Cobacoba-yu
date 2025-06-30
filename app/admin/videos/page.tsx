"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Search, Plus, Edit, Trash2, Play, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { VideoModal } from "@/components/video-modal"

const mockVideos = [
  {
    id: 1,
    title: "Project Integration Management (2)",
    author: "Tim Agilenesia",
    category: "Kuis PMP",
    featured: true,
    duration: "15:30",
    verificationStatus: "active",
    lastUpdated: "2023-05-05",
    views: "2.1K",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Project Schedule Management (2)",
    author: "Dani Pradana",
    category: "Kuis PMP",
    featured: true,
    duration: "18:45",
    verificationStatus: "active",
    lastUpdated: "2023-05-03",
    views: "1.8K",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Advanced Scrum Techniques",
    author: "Suparjo",
    category: "Scrum",
    featured: false,
    duration: "25:00",
    verificationStatus: "draft",
    lastUpdated: "2023-05-02",
    views: "0",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "Kanban Board Mastery",
    author: "Ahmad Rizki",
    category: "Kanban",
    featured: false,
    duration: "12:30",
    verificationStatus: "inactive",
    lastUpdated: "2023-05-01",
    views: "0",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    title: "Sprint Planning Workshop",
    author: "Minarni",
    category: "Perencanaan Sprint",
    featured: false,
    duration: "20:15",
    verificationStatus: "draft",
    lastUpdated: "2023-04-30",
    views: "0",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
  },
]

const categories = ["All Categories", "Kuis PMP", "Scrum", "Kanban", "Perencanaan Sprint", "Manajemen Tim"]
const verificationStatuses = ["All Status", "active", "draft", "inactive"]

export default function VideoManagementPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [sortField, setSortField] = useState("lastUpdated")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

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

  // Filter and sort videos
  const filteredVideos = mockVideos
    .filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || video.category === selectedCategory
      const matchesStatus = selectedStatus === "All Status" || video.verificationStatus === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-700">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="py-8 px-[10%]">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
              <p className="text-gray-600 mt-2">Kelola video dan konten multimedia</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/admin/videos/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Video
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari video atau pengunggah..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Videos Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Video</CardTitle>
              <CardDescription>Total {filteredVideos.length} video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Video</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("category")}
                          className="h-auto p-0 font-medium"
                        >
                          Kategori
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Unggulan</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("duration")}
                          className="h-auto p-0 font-medium"
                        >
                          Durasi
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("author")} className="h-auto p-0 font-medium">
                          Pengunggah
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("verificationStatus")}
                          className="h-auto p-0 font-medium"
                        >
                          Status
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("lastUpdated")}
                          className="h-auto p-0 font-medium"
                        >
                          Last Updated
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Image
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                width={60}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                                <Play className="h-3 w-3 text-white" />
                              </div>
                              <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="max-w-xs">
                              <p className="font-medium text-gray-900 truncate">{video.title}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{video.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {video.featured ? (
                            <Badge className="bg-blue-100 text-blue-700">Featured</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.author}</TableCell>
                        <TableCell>{getStatusBadge(video.verificationStatus)}</TableCell>
                        <TableCell>{video.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Play Video"
                              onClick={() => {
                                setSelectedVideo({
                                  id: video.id,
                                  title: video.title,
                                  description: `Video tentang ${video.title}`,
                                  duration: video.duration,
                                  views: video.views,
                                  category: video.category,
                                  author: video.author,
                                  date: video.lastUpdated,
                                  status: video.verificationStatus,
                                })
                                setIsVideoModalOpen(true)
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/admin/videos/${video.id}/edit`)}
                              title="Edit Video"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete Video"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVideos.length)} of{" "}
                  {filteredVideos.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      size="sm"
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-blue-600 text-white" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false)
          setSelectedVideo(null)
        }}
      />

      <Footer />
    </div>
  )
}
