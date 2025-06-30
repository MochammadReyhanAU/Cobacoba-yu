"use client"

import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ParticipantModal } from "@/components/participant-modal"
import { useAuth } from "@/contexts/auth-context"
import { Search, Plus, Edit, Trash2, Users, Phone, Mail, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { useState, useMemo } from "react"

const mockEvents = [
  { id: 1, name: "Agile Transformation Workshop" },
  { id: 2, name: "Scrum Master Certification Bootcamp" },
  { id: 3, name: "Product Owner Masterclass" },
  { id: 4, name: "Webinar: Pengenalan Agile untuk Pemula" },
  { id: 5, name: "Community Meetup: Agile Jakarta" },
]

const mockParticipants = [
  {
    id: 1,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "081234567890",
    eventId: 1,
    eventName: "Agile Transformation Workshop",
    registrationDate: "2024-06-10",
    registrationStatus: "terdaftar",
    followUpStatus: "konfirmasi_kehadiran",
    motivation: "Ingin mempelajari implementasi Agile di perusahaan",
  },
  {
    id: 2,
    name: "Sari Dewi",
    email: "sari.dewi@email.com",
    phone: "081234567891",
    eventId: 1,
    eventName: "Agile Transformation Workshop",
    registrationDate: "2024-06-11",
    registrationStatus: "menunggu_konfirmasi",
    followUpStatus: "sudah_dihubungi",
    motivation: "Untuk meningkatkan skill project management",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567892",
    eventId: 2,
    eventName: "Scrum Master Certification Bootcamp",
    registrationDate: "2024-06-12",
    registrationStatus: "terdaftar",
    followUpStatus: "belum_dihubungi",
    motivation: "Ingin mendapatkan sertifikasi Scrum Master",
  },
  {
    id: 4,
    name: "Lisa Permata",
    email: "lisa.permata@email.com",
    phone: "081234567893",
    eventId: 4,
    eventName: "Webinar: Pengenalan Agile untuk Pemula",
    registrationDate: "2024-06-13",
    registrationStatus: "menunggu_konfirmasi",
    followUpStatus: "tidak_merespon",
    motivation: "",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    email: "eko.prasetyo@email.com",
    phone: "081234567894",
    eventId: 5,
    eventName: "Community Meetup: Agile Jakarta",
    registrationDate: "2024-06-14",
    registrationStatus: "terdaftar",
    followUpStatus: "konfirmasi_kehadiran",
    motivation: "Networking dengan praktisi Agile lainnya",
  },
  {
    id: 6,
    name: "Andi Wijaya",
    email: "andi.wijaya@email.com",
    phone: "081234567895",
    eventId: 2,
    eventName: "Scrum Master Certification Bootcamp",
    registrationDate: "2024-06-15",
    registrationStatus: "ditolak",
    followUpStatus: "sudah_dihubungi",
    motivation: "Ingin upgrade skill sebagai project manager",
  },
  {
    id: 7,
    name: "Maya Sari",
    email: "maya.sari@email.com",
    phone: "081234567896",
    eventId: 3,
    eventName: "Product Owner Masterclass",
    registrationDate: "2024-06-16",
    registrationStatus: "terdaftar",
    followUpStatus: "belum_dihubungi",
    motivation: "Memahami peran Product Owner dengan lebih baik",
  },
  {
    id: 8,
    name: "Rudi Hartono",
    email: "rudi.hartono@email.com",
    phone: "081234567897",
    eventId: 1,
    eventName: "Agile Transformation Workshop",
    registrationDate: "2024-06-17",
    registrationStatus: "menunggu_konfirmasi",
    followUpStatus: "belum_dihubungi",
    motivation: "Transformasi digital di perusahaan",
  },
  {
    id: 9,
    name: "Indira Putri",
    email: "indira.putri@email.com",
    phone: "081234567898",
    eventId: 4,
    eventName: "Webinar: Pengenalan Agile untuk Pemula",
    registrationDate: "2024-06-18",
    registrationStatus: "terdaftar",
    followUpStatus: "konfirmasi_kehadiran",
    motivation: "Belajar metodologi Agile dari dasar",
  },
  {
    id: 10,
    name: "Fajar Nugroho",
    email: "fajar.nugroho@email.com",
    phone: "081234567899",
    eventId: 5,
    eventName: "Community Meetup: Agile Jakarta",
    registrationDate: "2024-06-19",
    registrationStatus: "terdaftar",
    followUpStatus: "sudah_dihubungi",
    motivation: "Berbagi pengalaman implementasi Agile",
  },
]

type SortField = "name" | "email" | "eventName" | "registrationDate" | "registrationStatus" | "followUpStatus"
type SortDirection = "asc" | "desc"

export default function EventParticipantsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [eventFilter, setEventFilter] = useState("all")
  const [followUpFilter, setFollowUpFilter] = useState("all")
  const [participants, setParticipants] = useState(mockParticipants)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [sortField, setSortField] = useState<SortField>("registrationDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSortedParticipants = useMemo(() => {
    const filtered = participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || participant.registrationStatus === statusFilter
      const matchesEvent = eventFilter === "all" || participant.eventId.toString() === eventFilter
      const matchesFollowUp = followUpFilter === "all" || participant.followUpStatus === followUpFilter
      return matchesSearch && matchesStatus && matchesEvent && matchesFollowUp
    })

    // Sort participants
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "registrationDate") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [participants, searchTerm, statusFilter, eventFilter, followUpFilter, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedParticipants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedParticipants = filteredAndSortedParticipants.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  const getRegistrationStatusBadge = (status: string) => {
    switch (status) {
      case "terdaftar":
        return <Badge className="bg-green-100 text-green-800">Terdaftar</Badge>
      case "menunggu_konfirmasi":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu Konfirmasi</Badge>
      case "ditolak":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFollowUpStatusBadge = (status: string) => {
    switch (status) {
      case "belum_dihubungi":
        return <Badge variant="secondary">Belum Dihubungi</Badge>
      case "sudah_dihubungi":
        return <Badge className="bg-blue-100 text-blue-800">Sudah Dihubungi</Badge>
      case "tidak_merespon":
        return <Badge className="bg-orange-100 text-orange-800">Tidak Merespon</Badge>
      case "konfirmasi_kehadiran":
        return <Badge className="bg-green-100 text-green-800">Konfirmasi Kehadiran</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddParticipant = () => {
    setEditingParticipant(null)
    setIsModalOpen(true)
  }

  const handleEditParticipant = (participant: any) => {
    setEditingParticipant(participant)
    setIsModalOpen(true)
  }

  const handleSaveParticipant = (participantData: any) => {
    if (editingParticipant) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantData.id
            ? {
                ...participantData,
                eventName: mockEvents.find((e) => e.id === participantData.eventId)?.name || "",
              }
            : p,
        ),
      )
    } else {
      setParticipants((prev) => [
        ...prev,
        {
          ...participantData,
          eventName: mockEvents.find((e) => e.id === participantData.eventId)?.name || "",
        },
      ])
    }
  }

  const handleDeleteParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id))
  }

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Participant Management</h1>
              <p className="text-gray-600 mt-2">Kelola peserta event dan status pendaftaran</p>
            </div>
            <Button onClick={handleAddParticipant} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Peserta
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
                      placeholder="Cari peserta, email, atau event..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status Pendaftaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="terdaftar">Terdaftar</SelectItem>
                    <SelectItem value="menunggu_konfirmasi">Menunggu Konfirmasi</SelectItem>
                    <SelectItem value="ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Event</SelectItem>
                    {mockEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={followUpFilter} onValueChange={setFollowUpFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status Follow Up" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Follow Up</SelectItem>
                    <SelectItem value="belum_dihubungi">Belum Dihubungi</SelectItem>
                    <SelectItem value="sudah_dihubungi">Sudah Dihubungi</SelectItem>
                    <SelectItem value="tidak_merespon">Tidak Merespon</SelectItem>
                    <SelectItem value="konfirmasi_kehadiran">Konfirmasi Kehadiran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Participants Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peserta Event</CardTitle>
              <CardDescription>Total {filteredAndSortedParticipants.length} peserta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-medium">
                          Nama
                          {getSortIcon("name")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("email")} className="h-auto p-0 font-medium">
                          Kontak
                          {getSortIcon("email")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("eventName")}
                          className="h-auto p-0 font-medium"
                        >
                          Event
                          {getSortIcon("eventName")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("registrationDate")}
                          className="h-auto p-0 font-medium"
                        >
                          Tanggal Daftar
                          {getSortIcon("registrationDate")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("registrationStatus")}
                          className="h-auto p-0 font-medium"
                        >
                          Status Pendaftaran
                          {getSortIcon("registrationStatus")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("followUpStatus")}
                          className="h-auto p-0 font-medium"
                        >
                          Status Follow Up
                          {getSortIcon("followUpStatus")}
                        </Button>
                      </TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              {participant.motivation && (
                                <div className="text-sm text-gray-500 max-w-[200px] truncate">
                                  {participant.motivation}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {participant.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {participant.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{participant.eventName}</div>
                        </TableCell>
                        <TableCell>{participant.registrationDate}</TableCell>
                        <TableCell>{getRegistrationStatusBadge(participant.registrationStatus)}</TableCell>
                        <TableCell>{getFollowUpStatusBadge(participant.followUpStatus)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditParticipant(participant)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteParticipant(participant.id)}
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
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredAndSortedParticipants.length)} of{" "}
                  {filteredAndSortedParticipants.length} results
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

      <ParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveParticipant}
        participant={editingParticipant}
        events={mockEvents}
      />

      <Footer />
    </div>
  )
}
