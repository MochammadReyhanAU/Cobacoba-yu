"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BarChart3, Users, Clock, TrendingUp, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollData {
  id: string
  name: string
  question: string
  category: string
  type: string
  isActive: boolean
  allowMultiple: boolean
  endDate: string
  options: PollOption[]
  totalVotes: number
  createdAt: string
  lastUpdated: string
  associatedContentId?: string
}

// Mock data - in real app, this would come from API
const mockPollData: PollData = {
  id: "1",
  name: "Tantangan Implementasi Scrum",
  question: "Apa tantangan terbesar dalam implementasi Scrum di tim Anda?",
  category: "Scrum",
  type: "article",
  isActive: true,
  allowMultiple: false,
  endDate: "2024-02-15",
  totalVotes: 156,
  createdAt: "2024-01-01",
  lastUpdated: "2024-01-10",
  associatedContentId: "art1",
  options: [
    { id: "1a", text: "Resistensi dari anggota tim", votes: 45 },
    { id: "1b", text: "Kurangnya dukungan management", votes: 32 },
    { id: "1c", text: "Tidak ada Scrum Master yang berpengalaman", votes: 28 },
    { id: "1d", text: "Budaya perusahaan yang tidak mendukung", votes: 51 },
  ],
}

// Mock vote history data
const mockVoteHistory = [
  { date: "2024-01-15", votes: 12 },
  { date: "2024-01-14", votes: 8 },
  { date: "2024-01-13", votes: 15 },
  { date: "2024-01-12", votes: 23 },
  { date: "2024-01-11", votes: 18 },
  { date: "2024-01-10", votes: 31 },
  { date: "2024-01-09", votes: 25 },
]

const mockVoteUsers = [
  {
    userName: "Budi Santoso",
    email: "budi.s@example.com",
    voteTime: "2024-01-15T10:30:00Z",
    optionText: "Resistensi dari anggota tim",
  },
  {
    userName: "Siti Aminah",
    email: "siti.a@example.com",
    voteTime: "2024-01-15T11:05:00Z",
    optionText: "Budaya perusahaan yang tidak mendukung",
  },
  {
    userName: "Joko Susilo",
    email: null,
    voteTime: "2024-01-14T14:20:00Z",
    optionText: "Kurangnya dukungan management",
  },
  {
    userName: "Dewi Lestari",
    email: "dewi.l@example.com",
    voteTime: "2024-01-14T16:45:00Z",
    optionText: "Budaya perusahaan yang tidak mendukung",
  },
  {
    userName: "Agus Salim",
    email: null,
    voteTime: "2024-01-13T09:00:00Z",
    optionText: "Tidak ada Scrum Master yang berpengalaman",
  },
  {
    userName: "Rina Fitri",
    email: "rina.f@example.com",
    voteTime: "2024-01-13T11:10:00Z",
    optionText: "Resistensi dari anggota tim",
  },
  {
    userName: "Fajar Nugraha",
    email: "fajar.n@example.com",
    voteTime: "2024-01-12T13:00:00Z",
    optionText: "Budaya perusahaan yang tidak mendukung",
  },
  { userName: "Maya Indah", email: null, voteTime: "2024-01-12T15:30:00Z", optionText: "Resistensi dari anggota tim" },
  {
    userName: "Eko Prasetyo",
    email: "eko.p@example.com",
    voteTime: "2024-01-11T10:00:00Z",
    optionText: "Kurangnya dukungan management",
  },
  {
    userName: "Linda Wijaya",
    email: null,
    voteTime: "2024-01-11T12:15:00Z",
    optionText: "Tidak ada Scrum Master yang berpengalaman",
  },
  {
    userName: "Andi Permana",
    email: "andi.p@example.com",
    voteTime: "2024-01-10T08:40:00Z",
    optionText: "Resistensi dari anggota tim",
  },
  {
    userName: "Citra Kirana",
    email: "citra.k@example.com",
    voteTime: "2024-01-10T10:55:00Z",
    optionText: "Budaya perusahaan yang tidak mendukung",
  },
  {
    userName: "Doni Saputra",
    email: null,
    voteTime: "2024-01-09T14:00:00Z",
    optionText: "Kurangnya dukungan management",
  },
  {
    userName: "Gita Putri",
    email: "gita.p@example.com",
    voteTime: "2024-01-09T16:20:00Z",
    optionText: "Resistensi dari anggota tim",
  },
]

export default function PollResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [pollData, setPollData] = useState<PollData | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Number of users per page

  const types = {
    page: "Halaman",
    article: "Artikel",
    video: "Video",
    event: "Event",
  }

  // Load poll data
  useEffect(() => {
    const loadPollData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In real app, fetch data based on params.id
        setPollData(mockPollData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data hasil polling.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPollData()
  }, [params.id, toast])

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0
  }

  const handleExportResults = () => {
    toast({
      title: "Export dimulai",
      description: "Hasil polling sedang diunduh...",
    })
    // Implement export logic here
  }

  const totalPages = Math.ceil(mockVoteUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = mockVoteUsers.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="px-[10%] py-8">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pollData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="px-[10%] py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Polling tidak ditemukan</h1>
            <Button onClick={() => router.back()} className="mt-4">
              Kembali
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const sortedOptions = [...pollData.options].sort((a, b) => b.votes - a.votes)
  const winningOption = sortedOptions[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="px-[10%] py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hasil Polling</h1>
              <p className="text-gray-600 mt-1">{pollData.name}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Poll Question */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <Badge variant="outline">{pollData.category}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {types[pollData.type as keyof typeof types]}
                        </Badge>
                        {pollData.isActive ? (
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                        ) : (
                          <Badge variant="secondary">Tidak Aktif</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{pollData.question}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{pollData.totalVotes} total votes</span>
                    </div>
                    {pollData.endDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Berakhir {new Date(pollData.endDate).toLocaleDateString("id-ID")}</span>
                      </div>
                    )}
                    {pollData.allowMultiple && <Badge variant="secondary">Pilihan Ganda</Badge>}
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Hasil Voting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sortedOptions.map((option, index) => {
                      const percentage = getPercentage(option.votes, pollData.totalVotes)
                      const isWinner = option.id === winningOption.id

                      return (
                        <div key={option.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${isWinner ? "text-blue-600" : ""}`}>
                                #{index + 1}
                              </span>
                              <span className={isWinner ? "font-medium text-blue-600" : ""}>
                                {option.text}
                                {isWinner && " 🏆"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">
                                {percentage}% ({option.votes} votes)
                              </span>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-3" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Vote History Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Tren Voting (7 Hari Terakhir)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockVoteHistory.map((day, index) => (
                      <div key={day.date} className="flex items-center gap-4">
                        <div className="w-20 text-sm text-gray-600">
                          {new Date(day.date).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex-1">
                          <Progress value={(day.votes / 35) * 100} className="h-2" />
                        </div>
                        <div className="w-12 text-sm font-medium text-right">{day.votes}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Vote History Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">Riwayat Voting Pengguna</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleExportResults}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Opsi Dipilih</TableHead>
                          <TableHead>Waktu Vote</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentUsers.map((vote, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{vote.userName}</TableCell>
                            <TableCell>{vote.email || "-"}</TableCell>
                            <TableCell>{vote.optionText}</TableCell>
                            <TableCell>{new Date(vote.voteTime).toLocaleString("id-ID")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {mockVoteUsers.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">Belum ada riwayat voting.</p>
                  )}
                  {mockVoteUsers.length > itemsPerPage && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-500">
                        Menampilkan {startIndex + 1} hingga {Math.min(startIndex + itemsPerPage, mockVoteUsers.length)}{" "}
                        dari {mockVoteUsers.length} hasil
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

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Votes</span>
                    <span className="font-semibold">{pollData.totalVotes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Opsi Terpopuler</span>
                    <span className="font-semibold text-blue-600">
                      {getPercentage(winningOption.votes, pollData.totalVotes)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Jumlah Opsi</span>
                    <span className="font-semibold">{pollData.options.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Dibuat</span>
                    <span className="font-semibold">{new Date(pollData.createdAt).toLocaleDateString("id-ID")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Terakhir Update</span>
                    <span className="font-semibold">{new Date(pollData.lastUpdated).toLocaleDateString("id-ID")}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Option */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Opsi Terpopuler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-medium text-blue-900">{winningOption.text}</div>
                      <div className="text-sm text-blue-600 mt-1">
                        {winningOption.votes} votes ({getPercentage(winningOption.votes, pollData.totalVotes)}%)
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Unggul {winningOption.votes - sortedOptions[1]?.votes || 0} votes dari opsi kedua
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push(`/admin/polls/${pollData.id}/edit`)}
                  >
                    Edit Polling
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
