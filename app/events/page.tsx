"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, ExternalLink, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { AdBanner } from "@/components/ad-banner"
import { PollModal } from "@/components/poll-modal" // Ubah dari PollWidget ke PollModal
import { useState, useEffect } from "react" // Tambahkan useState dan useEffect
import { EventRegistrationModal } from "@/components/event-registration-modal"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const upcomingEvents = [
  {
    id: 1,
    title: "Agile Transformation Workshop",
    description:
      "Workshop intensif 2 hari tentang transformasi agile untuk organisasi enterprise. Pelajari strategi, tools, dan best practices dari para ahli.",
    date: "15 Juni 2024",
    time: "09:00 - 17:00 WIB",
    location: "Jakarta Convention Center",
    type: "Workshop",
    capacity: "50 peserta",
    price: "Rp 2.500.000",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    featured: true,
    status: "open",
  },
  {
    id: 2,
    title: "Scrum Master Certification Bootcamp",
    description:
      "Bootcamp intensif untuk mendapatkan sertifikasi Scrum Master. Termasuk simulasi ujian dan mentoring dari certified trainers.",
    date: "22 Juni 2024",
    time: "08:00 - 18:00 WIB",
    location: "Bali International Convention Centre",
    type: "Certification",
    capacity: "30 peserta",
    price: "Rp 3.500.000",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=300&fit=crop",
    featured: true,
    status: "open",
  },
  {
    id: 3,
    title: "Product Owner Masterclass",
    description:
      "Masterclass eksklusif untuk Product Owner. Pelajari teknik advanced dalam product management dan stakeholder engagement.",
    date: "5 Juli 2024",
    time: "09:00 - 16:00 WIB",
    location: "Surabaya Convention Hall",
    type: "Masterclass",
    capacity: "40 peserta",
    price: "Rp 1.800.000",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=300&fit=crop",
    featured: false,
    status: "open",
  },
  {
    id: 4,
    title: "Agile Leadership Summit 2024",
    description:
      "Summit tahunan untuk para leader yang ingin mengimplementasikan agile di level organisasi. Keynote dari industry leaders.",
    date: "20 Juli 2024",
    time: "08:00 - 17:00 WIB",
    location: "Grand Indonesia Convention Center",
    type: "Summit",
    capacity: "200 peserta",
    price: "Rp 1.200.000",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=300&fit=crop",
    featured: true,
    status: "open",
  },
  {
    id: 5,
    title: "DevOps & Agile Integration Workshop",
    description:
      "Workshop praktis tentang integrasi DevOps dengan metodologi agile. Hands-on dengan tools dan case studies nyata.",
    date: "10 Agustus 2024",
    time: "09:00 - 17:00 WIB",
    location: "Bandung Digital Valley",
    type: "Workshop",
    capacity: "35 peserta",
    price: "Rp 2.200.000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
    featured: false,
    status: "open",
  },
  {
    id: 6,
    title: "Agile Coaching Certification",
    description:
      "Program sertifikasi untuk menjadi agile coach profesional. Termasuk praktik coaching dan assessment komprehensif.",
    date: "25 Agustus 2024",
    time: "08:00 - 18:00 WIB",
    location: "Yogyakarta Convention Center",
    type: "Certification",
    capacity: "25 peserta",
    price: "Rp 4.500.000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
    featured: false,
    status: "open",
  },
  {
    id: 7,
    title: "Webinar: Pengenalan Agile untuk Pemula",
    description:
      "Webinar gratis untuk memahami dasar-dasar metodologi agile. Cocok untuk pemula yang ingin memulai journey agile mereka.",
    date: "28 Juni 2024",
    time: "19:00 - 21:00 WIB",
    location: "Online (Zoom)",
    type: "Webinar",
    capacity: "500 peserta",
    price: "Gratis",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
    featured: true,
    status: "open",
  },
  {
    id: 8,
    title: "Community Meetup: Agile Jakarta",
    description:
      "Meetup bulanan komunitas agile Jakarta. Diskusi santai, networking, dan sharing pengalaman dari praktisi agile.",
    date: "12 Juli 2024",
    time: "18:30 - 21:00 WIB",
    location: "Co-working Space Jakarta Selatan",
    type: "Meetup",
    capacity: "80 peserta",
    price: "Gratis",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=300&fit=crop",
    featured: false,
    status: "open",
  },
  {
    id: 9,
    title: "Open Discussion: Agile Transformation Stories",
    description:
      "Sesi diskusi terbuka tentang pengalaman transformasi agile di berbagai perusahaan. Gratis untuk semua peserta.",
    date: "18 Juli 2024",
    time: "14:00 - 16:00 WIB",
    location: "Online (Google Meet)",
    type: "Discussion",
    capacity: "200 peserta",
    price: "Gratis",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop",
    featured: false,
    status: "open",
  },
  {
    id: 10,
    title: "Scrum Fundamentals Workshop",
    description:
      "Workshop dasar tentang framework Scrum. Pelajari roles, events, dan artifacts dalam Scrum dengan praktik langsung.",
    date: "2 Juni 2024",
    time: "09:00 - 16:00 WIB",
    location: "Jakarta Tech Hub",
    type: "Workshop",
    capacity: "40 peserta",
    price: "Rp 1.500.000",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    featured: false,
    status: "registered",
  },
  {
    id: 11,
    title: "Agile Project Management Webinar",
    description:
      "Webinar gratis tentang penerapan agile dalam project management. Cocok untuk project manager yang ingin beralih ke agile.",
    date: "8 Juni 2024",
    time: "19:00 - 21:00 WIB",
    location: "Online (Zoom)",
    type: "Webinar",
    capacity: "300 peserta",
    price: "Gratis",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
    featured: false,
    status: "waiting_confirmation",
  },
]

const eventTypes = ["Semua Event", "Workshop", "Certification", "Masterclass", "Summit"]

// Mock poll data for event page
const eventPoll = {
  id: "event-poll-1",
  question: "Jenis event apa yang paling ingin Anda ikuti di Agilenesia?",
  options: [
    { id: "ep1a", text: "Workshop Praktis", votes: 80 },
    { id: "ep1b", text: "Sertifikasi Profesional", votes: 60 },
    { id: "ep1c", text: "Webinar & Diskusi Online", votes: 45 },
    { id: "ep1d", text: "Konferensi & Summit", votes: 30 },
  ],
  totalVotes: 215,
  category: "Event Preferences",
  isActive: true,
  endDate: "2025-12-31",
}

export default function EventsPage() {
  const [isPollModalOpen, setIsPollModalOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<(typeof upcomingEvents)[0] | null>(null)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
      if (!seenPolls.includes(eventPoll.id)) {
        setIsPollModalOpen(true)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClosePollModal = () => {
    setIsPollModalOpen(false)
  }

  const handleRegisterClick = (event: (typeof upcomingEvents)[0]) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk mendaftar event.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // Check if already registered
    if (event.status === "registered" || event.status === "waiting_confirmation") {
      return
    }

    setSelectedEvent(event)
    setIsRegistrationModalOpen(true)
  }

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false)
    setSelectedEvent(null)
  }

  const handleRegistrationSuccess = (eventId: number) => {
    setRegisteredEvents((prev) => [...prev, eventId])
  }

  const getEventStatus = (event: (typeof upcomingEvents)[0]) => {
    if (event.status === "registered") return "registered"
    if (event.status === "waiting_confirmation") return "waiting_confirmation"
    if (registeredEvents.includes(event.id)) return "waiting_confirmation"
    return event.status
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terdaftar
          </Badge>
        )
      case "waiting_confirmation":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Menunggu Konfirmasi
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-white/95 text-green-700 border-green-200 hover:bg-white">
            Pendaftaran Dibuka
          </Badge>
        )
    }
  }

  const getActionButton = (event: (typeof upcomingEvents)[0]) => {
    const status = getEventStatus(event)

    switch (status) {
      case "registered":
        return (
          <Button size="sm" disabled className="bg-green-600 text-white cursor-not-allowed">
            Sudah Terdaftar
          </Button>
        )
      case "waiting_confirmation":
        return (
          <Button size="sm" disabled className="bg-yellow-600 text-white cursor-not-allowed">
            Menunggu Konfirmasi
          </Button>
        )
      default:
        return (
          <Button onClick={() => handleRegisterClick(event)} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Daftar
          </Button>
        )
    }
  }

  const getActionButtonLarge = (event: (typeof upcomingEvents)[0]) => {
    const status = getEventStatus(event)

    switch (status) {
      case "registered":
        return (
          <Button disabled className="bg-green-600 text-white cursor-not-allowed">
            <CheckCircle className="mr-2 h-4 w-4" />
            Sudah Terdaftar
          </Button>
        )
      case "waiting_confirmation":
        return (
          <Button disabled className="bg-yellow-600 text-white cursor-not-allowed">
            <AlertCircle className="mr-2 h-4 w-4" />
            Menunggu Konfirmasi
          </Button>
        )
      default:
        return (
          <Button
            onClick={() => handleRegisterClick(event)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Daftar Sekarang
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-[10%] bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="h-4 w-4" />
            Events Mendatang
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bergabung dengan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Komunitas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ikuti workshop, sertifikasi, dan acara eksklusif yang dirancang untuk mengembangkan kemampuan agile Anda
            bersama para praktisi terbaik
          </p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-[10%] bg-white">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Event Unggulan
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Event Terpopuler</h2>
          <p className="text-xl text-gray-600">Jangan lewatkan kesempatan untuk bergabung dengan event terbaik kami</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {upcomingEvents
            .filter((event) => event.featured)
            .slice(0, 2)
            .map((event) => {
              const status = getEventStatus(event)
              return (
                <Card
                  key={event.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/95 text-gray-800 hover:bg-white">{event.type}</Badge>
                      {event.featured && (
                        <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">Unggulan</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">{getStatusBadge(status)}</div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{event.price}</p>
                        <p className="text-sm text-gray-500">per peserta</p>
                      </div>
                      {getActionButtonLarge(event)}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </section>

      {/* Mid Banner Ad */}
      <section className="py-6 px-[10%] bg-gray-100">
        <AdBanner size="large" />
      </section>

      {/* All Events */}
      <section className="py-16 px-[10%]">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Semua Event</h2>
          <p className="text-xl text-gray-600">Temukan event yang sesuai dengan kebutuhan pengembangan skill Anda</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Events List - 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const status = getEventStatus(event)
                return (
                  <Card
                    key={event.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/95 text-gray-800 hover:bg-white text-xs">{event.type}</Badge>
                      </div>
                      <div className="absolute top-3 right-3">{getStatusBadge(status)}</div>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{event.description}</p>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{event.capacity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{event.price}</p>
                        </div>
                        {getActionButton(event)}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar with Ads */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner size="sidebar" />
            <AdBanner size="sidebar" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-[10%] bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="w-full h-full bg-white bg-opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
        </div>

        <div className="text-center relative z-10">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ingin Mengadakan Event Bersama?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
              Bergabunglah dengan kami sebagai partner atau sponsor untuk mengadakan event agile yang berdampak bagi
              komunitas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Jadi Partner Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
              >
                Hubungi Tim Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      <Footer />

      {/* Poll Modal for Events Page */}
      <PollModal poll={eventPoll} isOpen={isPollModalOpen} onClose={handleClosePollModal} />
      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        userEmail={user?.email || ""}
        userName={user?.name || ""}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </div>
  )
}
