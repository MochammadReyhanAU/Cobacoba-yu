"use client"

import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Calendar,
  Users,
  Clock,
  MapPin,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"

const mockEvents = [
  {
    id: 1,
    name: "Agile Transformation Workshop",
    date: "2024-06-15",
    time: "09:00",
    location: "Jakarta Convention Center",
    totalParticipants: 50,
    waitingConfirmation: 5,
    registered: 45,
    cost: "Rp 2.500.000",
    category: "Workshop",
    status: "published",
    featured: true,
  },
  {
    id: 2,
    name: "Scrum Master Certification Bootcamp",
    date: "2024-06-22",
    time: "08:30",
    location: "Bali International Convention Centre",
    totalParticipants: 30,
    waitingConfirmation: 2,
    registered: 28,
    cost: "Rp 3.500.000",
    category: "Certification",
    status: "published",
    featured: false,
  },
  {
    id: 3,
    name: "Product Owner Masterclass",
    date: "2024-07-05",
    time: "10:00",
    location: "Surabaya Convention Hall",
    totalParticipants: 40,
    waitingConfirmation: 8,
    registered: 32,
    cost: "Rp 1.800.000",
    category: "Masterclass",
    status: "draft",
    featured: true,
  },
  {
    id: 4,
    name: "Webinar: Pengenalan Agile untuk Pemula",
    date: "2024-06-18",
    time: "19:00",
    location: "Online (Zoom)",
    totalParticipants: 500,
    waitingConfirmation: 25,
    registered: 475,
    cost: "Gratis",
    category: "Webinar",
    status: "published",
    featured: false,
  },
  {
    id: 5,
    name: "Community Meetup: Agile Jakarta",
    date: "2024-06-25",
    time: "18:30",
    location: "Co-working Space Jakarta",
    totalParticipants: 100,
    waitingConfirmation: 12,
    registered: 88,
    cost: "Gratis",
    category: "Meetup",
    status: "published",
    featured: true,
  },
  {
    id: 6,
    name: "Advanced Scrum Techniques",
    date: "2024-07-10",
    time: "14:00",
    location: "Bandung Tech Hub",
    totalParticipants: 25,
    waitingConfirmation: 3,
    registered: 22,
    cost: "Rp 1.200.000",
    category: "Workshop",
    status: "draft",
    featured: false,
  },
  {
    id: 7,
    name: "Kanban Implementation Workshop",
    date: "2024-07-15",
    time: "09:30",
    location: "Surabaya Convention Hall",
    totalParticipants: 35,
    waitingConfirmation: 7,
    registered: 28,
    cost: "Rp 1.500.000",
    category: "Workshop",
    status: "published",
    featured: true,
  },
  {
    id: 8,
    name: "Agile Leadership Seminar",
    date: "2024-07-20",
    time: "13:00",
    location: "Jakarta Convention Center",
    totalParticipants: 80,
    waitingConfirmation: 15,
    registered: 65,
    cost: "Rp 800.000",
    category: "Seminar",
    status: "published",
    featured: false,
  },
]

type SortField = "name" | "date" | "totalParticipants" | "registered" | "cost" | "status"
type SortDirection = "asc" | "desc"

export default function EventManagementPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = mockEvents.filter((event) => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || event.status === statusFilter
      const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })

    // Sort events
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "date") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === "totalParticipants" || sortField === "registered") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      } else if (sortField === "cost") {
        // Convert cost to number for sorting
        aValue = aValue === "Gratis" ? 0 : Number.parseInt(aValue.replace(/[^\d]/g, ""))
        bValue = bValue === "Gratis" ? 0 : Number.parseInt(bValue.replace(/[^\d]/g, ""))
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
  }, [mockEvents, searchTerm, statusFilter, categoryFilter, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEvents = filteredAndSortedEvents.slice(startIndex, startIndex + itemsPerPage)

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
              <p className="text-gray-600 mt-2">Kelola event dan acara komunitas</p>
            </div>
            <Link href="/admin/events/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Event
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari event..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Masterclass">Masterclass</SelectItem>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Meetup">Meetup</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Event</CardTitle>
              <CardDescription>Total {filteredAndSortedEvents.length} event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-medium">
                          Nama Event
                          {getSortIcon("name")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("date")} className="h-auto p-0 font-medium">
                          Tanggal
                          {getSortIcon("date")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("totalParticipants")}
                          className="h-auto p-0 font-medium"
                        >
                          Peserta
                          {getSortIcon("totalParticipants")}
                        </Button>
                      </TableHead>
                      <TableHead>Menunggu</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("registered")}
                          className="h-auto p-0 font-medium"
                        >
                          Terdaftar
                          {getSortIcon("registered")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("cost")} className="h-auto p-0 font-medium">
                          Biaya
                          {getSortIcon("cost")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-medium">
                          Status
                          {getSortIcon("status")}
                        </Button>
                      </TableHead>
                      <TableHead>Unggulan</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{event.date}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.time}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            {event.totalParticipants}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {event.waitingConfirmation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {event.registered}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={event.cost === "Gratis" ? "text-green-600 font-medium" : "text-gray-900"}>
                            {event.cost}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          {event.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Link href={`/admin/events/${event.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedEvents.length)} of{" "}
                  {filteredAndSortedEvents.length} results
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

      <Footer />
    </div>
  )
}
