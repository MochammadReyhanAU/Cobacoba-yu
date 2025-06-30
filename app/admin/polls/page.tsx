"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Plus, Eye, Edit, Trash2, BarChart3, Filter, ArrowUpDown } from "lucide-react"

// Mock data
const polls = [
  {
    id: "1",
    name: "Tantangan Implementasi Scrum",
    question: "Apa tantangan terbesar dalam implementasi Scrum di tim Anda?",
    category: "Scrum",
    type: "article",
    status: "active",
    endDate: "2024-02-15",
    lastUpdated: "2024-01-10",
    totalVotes: 156,
    options: [
      { id: "1a", text: "Resistensi dari anggota tim", votes: 45 },
      { id: "1b", text: "Kurangnya dukungan management", votes: 32 },
      { id: "1c", text: "Tidak ada Scrum Master yang berpengalaman", votes: 28 },
      { id: "1d", text: "Budaya perusahaan yang tidak mendukung", votes: 51 },
    ],
  },
  {
    id: "2",
    name: "Efektivitas Komunikasi Digital",
    question: "Seberapa efektif komunikasi digital dalam tim remote Anda?",
    category: "Komunikasi",
    type: "video",
    status: "active",
    endDate: "2024-02-20",
    lastUpdated: "2024-01-12",
    totalVotes: 132,
    options: [
      { id: "2a", text: "Sangat efektif", votes: 23 },
      { id: "2b", text: "Cukup efektif", votes: 67 },
      { id: "2c", text: "Kurang efektif", votes: 34 },
      { id: "2d", text: "Tidak efektif sama sekali", votes: 8 },
    ],
  },
  {
    id: "3",
    name: "Tools Manajemen Proyek Terbaik",
    question: "Tools manajemen proyek mana yang paling Anda rekomendasikan?",
    category: "Tools",
    type: "event",
    status: "not_active",
    endDate: "2024-01-30",
    lastUpdated: "2024-01-05",
    totalVotes: 235,
    options: [
      { id: "3a", text: "Jira", votes: 89 },
      { id: "3b", text: "Trello", votes: 45 },
      { id: "3c", text: "Asana", votes: 32 },
      { id: "3d", text: "Monday.com", votes: 28 },
      { id: "3e", text: "Notion", votes: 41 },
    ],
  },
  {
    id: "4",
    name: "Preferensi Metodologi Agile",
    question: "Metodologi Agile mana yang paling cocok untuk tim Anda?",
    category: "Agile",
    type: "page",
    status: "active",
    endDate: "2024-03-01",
    lastUpdated: "2024-01-15",
    totalVotes: 89,
    options: [
      { id: "4a", text: "Scrum", votes: 45 },
      { id: "4b", text: "Kanban", votes: 23 },
      { id: "4c", text: "SAFe", votes: 12 },
      { id: "4d", text: "Extreme Programming", votes: 9 },
    ],
  },
  {
    id: "5",
    name: "Manajemen Risiko Proyek",
    question: "Bagaimana Anda mengelola risiko dalam proyek Agile?",
    category: "Manajemen Proyek",
    type: "article",
    status: "active",
    endDate: "2024-03-10",
    lastUpdated: "2024-01-20",
    totalVotes: 110,
    options: [
      { id: "5a", text: "Identifikasi & Mitigasi", votes: 60 },
      { id: "5b", text: "Transfer Risiko", votes: 20 },
      { id: "5c", text: "Penerimaan Risiko", votes: 30 },
    ],
  },
  {
    id: "6",
    name: "Peran Product Owner",
    question: "Apa peran terpenting Product Owner dalam Scrum?",
    category: "Scrum",
    type: "video",
    status: "not_active",
    endDate: "2024-02-28",
    lastUpdated: "2024-01-22",
    totalVotes: 95,
    options: [
      { id: "6a", text: "Mengelola Backlog", votes: 50 },
      { id: "6b", text: "Berkomunikasi dengan Stakeholder", votes: 30 },
      { id: "6c", text: "Memastikan ROI", votes: 15 },
    ],
  },
  {
    id: "7",
    name: "Workshop Agile Terbaru",
    question: "Topik workshop Agile apa yang paling Anda minati?",
    category: "Event",
    type: "event",
    status: "active",
    endDate: "2024-03-15",
    lastUpdated: "2024-01-25",
    totalVotes: 180,
    options: [
      { id: "7a", text: "DevOps", votes: 70 },
      { id: "7b", text: "Lean Startup", votes: 60 },
      { id: "7c", text: "Design Thinking", votes: 50 },
    ],
  },
  {
    id: "8",
    name: "Pengembangan Diri Agile",
    question: "Bagaimana Anda mengembangkan diri sebagai praktisi Agile?",
    category: "Pengembangan Diri",
    type: "page",
    status: "active",
    endDate: "2024-03-20",
    lastUpdated: "2024-01-28",
    totalVotes: 120,
    options: [
      { id: "8a", text: "Membaca Buku", votes: 40 },
      { id: "8b", text: "Mengikuti Pelatihan", votes: 50 },
      { id: "8c", text: "Bergabung Komunitas", votes: 30 },
    ],
  },
]

const categories = ["Semua", "Scrum", "Komunikasi", "Tools", "Agile", "Manajemen Proyek", "Pengembangan Diri"]
const types = ["Semua", "page", "article", "video", "event"]
const statuses = ["Semua", "active", "not_active"]

export default function PollsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedType, setSelectedType] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pollToDelete, setPollToDelete] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Number of items per page

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAndFilteredPolls = useMemo(() => {
    let filtered = polls.filter((poll) => {
      const matchesSearch =
        poll.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Semua" || poll.category === selectedCategory
      const matchesType = selectedType === "Semua" || poll.type === selectedType
      const matchesStatus = selectedStatus === "Semua" || poll.status === selectedStatus

      return matchesSearch && matchesCategory && matchesType && matchesStatus
    })

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        let valA: any
        let valB: any

        switch (sortColumn) {
          case "name":
            valA = a.name.toLowerCase()
            valB = b.name.toLowerCase()
            break
          case "category":
            valA = a.category.toLowerCase()
            valB = b.category.toLowerCase()
            break
          case "type":
            valA = a.type.toLowerCase()
            valB = b.type.toLowerCase()
            break
          case "status":
            valA = a.status.toLowerCase()
            valB = b.status.toLowerCase()
            break
          case "endDate":
            valA = new Date(a.endDate).getTime()
            valB = new Date(b.endDate).getTime()
            break
          case "lastUpdated":
            valA = new Date(a.lastUpdated).getTime()
            valB = new Date(b.lastUpdated).getTime()
            break
          default:
            return 0
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1
        if (valA > valB) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedType, selectedStatus, sortColumn, sortDirection])

  const totalPages = Math.ceil(sortedAndFilteredPolls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPolls = sortedAndFilteredPolls.slice(startIndex, endIndex)

  const handleDeletePoll = (pollId: string) => {
    setPollToDelete(pollId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting poll:", pollToDelete)
    setDeleteDialogOpen(false)
    setPollToDelete(null)
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
    ) : (
      <Badge variant="secondary">Tidak Aktif</Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeLabels = {
      page: "Halaman",
      article: "Artikel",
      video: "Video",
      event: "Event",
    }
    const typeColors = {
      page: "bg-blue-100 text-blue-800",
      article: "bg-purple-100 text-purple-800",
      video: "bg-red-100 text-red-800",
      event: "bg-orange-100 text-orange-800",
    }

    return (
      <Badge className={typeColors[type as keyof typeof typeColors]}>
        {typeLabels[type as keyof typeof typeLabels]}
      </Badge>
    )
  }

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-700 rotate-180" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-700" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="px-[10%] py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manajemen Polling</h1>
              <p className="text-gray-600 mt-1">Kelola polling dan survei komunitas</p>
            </div>
            <Link href="/admin/polls/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Polling
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Polling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{polls.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Polling Aktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {polls.filter((p) => p.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Rata-rata Partisipasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {polls.length > 0
                    ? Math.round(polls.reduce((sum, poll) => sum + poll.totalVotes, 0) / polls.length)
                    : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Pencarian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari polling..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kategori:</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tipe:</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(type)}
                      >
                        {type === "Semua" ? "Semua" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status === "Semua" ? "Semua" : status === "active" ? "Aktif" : "Tidak Aktif"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Polls Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Polling ({sortedAndFilteredPolls.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer hover:text-gray-900" onClick={() => handleSort("name")}>
                        <div className="flex items-center">Nama Polling {renderSortIcon("name")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-gray-900" onClick={() => handleSort("category")}>
                        <div className="flex items-center">Kategori {renderSortIcon("category")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-gray-900" onClick={() => handleSort("type")}>
                        <div className="flex items-center">Tipe {renderSortIcon("type")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-gray-900" onClick={() => handleSort("status")}>
                        <div className="flex items-center">Status {renderSortIcon("status")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:text-gray-900" onClick={() => handleSort("endDate")}>
                        <div className="flex items-center">Tanggal Berakhir {renderSortIcon("endDate")}</div>
                      </TableHead>
                      <TableHead>Total Votes</TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-gray-900"
                        onClick={() => handleSort("lastUpdated")}
                      >
                        <div className="flex items-center">Last Updated {renderSortIcon("lastUpdated")}</div>
                      </TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPolls.map((poll) => (
                      <TableRow key={poll.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{poll.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{poll.question}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{poll.category}</Badge>
                        </TableCell>
                        <TableCell>{getTypeBadge(poll.type)}</TableCell>
                        <TableCell>{getStatusBadge(poll.status)}</TableCell>
                        <TableCell>{new Date(poll.endDate).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                            {poll.totalVotes}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(poll.lastUpdated).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/polls/${poll.id}/results`} passHref>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Lihat Hasil</span>
                              </Button>
                            </Link>
                            <Link href={`/admin/polls/${poll.id}/edit`} passHref>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeletePoll(poll.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {sortedAndFilteredPolls.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Menampilkan {startIndex + 1} hingga{" "}
                    {Math.min(startIndex + itemsPerPage, sortedAndFilteredPolls.length)} dari{" "}
                    {sortedAndFilteredPolls.length} hasil
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Apakah Anda yakin ingin menghapus polling ini? Tindakan ini tidak dapat dibatalkan.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
