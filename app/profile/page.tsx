"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Video, Bookmark, Calendar, Settings, MapPin, LinkIcon, Users, Clock } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { VideoCard } from "@/components/video-card"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Footer } from "@/components/footer"

// Mock data - in real app this would come from API/database
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Senior Agile Coach dengan pengalaman 10+ tahun dalam transformasi digital dan manajemen tim remote. Passionate tentang komunikasi efektif dalam era digital.",
  location: "Jakarta, Indonesia",
  website: "https://johndoe.dev",
  joinDate: "Bergabung sejak Januari 2022",
}

const savedArticles = [
  {
    id: 3,
    title: "Remote Team Communication: Strategi Efektif",
    excerpt: "Strategi komunikasi yang terbukti efektif untuk tim remote dan hybrid",
    author: "Dani Pradana",
    date: "3 Apr 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    readTime: "6 menit",
    views: "1.8K",
  },
]

const savedVideos = [
  {
    id: 3,
    title: "Digital Transformation dalam Agile",
    description: "Bagaimana menerapkan transformasi digital dengan pendekatan agile",
    duration: "18:20",
    views: "4.1K",
    category: "Transformasi Digital",
    author: "Ahmad Rizki",
    date: "1 Apr 2023",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
]

const followedEvents = [
  {
    id: 1,
    title: "Agile Indonesia Conference 2024",
    description:
      "Konferensi terbesar tentang metodologi Agile di Indonesia. Bergabunglah dengan para praktisi dan expert untuk berbagi pengalaman dan best practices.",
    date: "15-16 Juni 2024",
    time: "09:00 - 17:00 WIB",
    location: "Jakarta Convention Center",
    type: "Offline",
    price: "Rp 500.000",
    capacity: 500,
    registered: 342,
    status: "registered",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    organizer: "Agile Indonesia Community",
    category: "Conference",
  },
  {
    id: 2,
    title: "Scrum Master Workshop",
    description:
      "Workshop intensif untuk memperdalam pemahaman tentang peran dan tanggung jawab Scrum Master dalam tim Agile.",
    date: "22 Mei 2024",
    time: "13:00 - 16:00 WIB",
    location: "Online via Zoom",
    type: "Online",
    price: "Gratis",
    capacity: 100,
    registered: 78,
    status: "pending",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    organizer: "Scrum Alliance Indonesia",
    category: "Workshop",
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("tersimpan")
  const router = useRouter()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return <Badge className="bg-green-100 text-green-700">Terdaftar</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Menunggu Konfirmasi</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "registered":
        return "Terdaftar"
      case "pending":
        return "Menunggu Konfirmasi"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Profile Header */}
      <section className="py-12 bg-white">
        <div className="px-[10%]">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={user?.avatar || userProfile.avatar}
                    alt={user?.name || userProfile.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                    {(user?.name || userProfile.name)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name || userProfile.name}</h1>
                  <p className="text-gray-600 mb-4">{userProfile.bio}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={userProfile.website} className="text-blue-600 hover:underline">
                        {userProfile.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{userProfile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/account/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile and Password
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12 px-[10%]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="tersimpan" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Tersimpan
            </TabsTrigger>
            <TabsTrigger value="event" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event
            </TabsTrigger>
          </TabsList>

          {/* Saved Content */}
          <TabsContent value="tersimpan" className="mt-8">
            <div className="space-y-8">
              {/* Saved Articles */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Artikel Tersimpan ({savedArticles.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} size="medium" />
                  ))}
                </div>
              </div>

              {/* Saved Videos */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tersimpan ({savedVideos.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedVideos.map((video) => (
                    <VideoCard key={video.id} video={video} size="medium" />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="event" className="mt-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event yang Diikuti ({followedEvents.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followedEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-700">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">{getStatusBadge(event.status)}</div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>{event.registered} peserta</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-900">{getStatusText(event.status)}</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">{event.price}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  )
}
