"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VideoCard } from "@/components/video-card"
import { VideoModal } from "@/components/video-modal"
import { AdBanner } from "@/components/ad-banner"

const playlists = {
  "pmp-quiz": {
    title: "Seri Kuis PMP",
    description: "Persiapan lengkap sertifikasi PMP dengan penjelasan detail dan soal latihan",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    totalVideos: 12,
    totalDuration: "4.5 jam",
    category: "Kuis PMP",
    videos: [
      {
        id: 1,
        title: "Project Integration Management (2)",
        description: "Kuis PMP - Project Integration Management panduan lengkap untuk sertifikasi profesional",
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
        duration: "15:30",
        views: "2.1K",
        category: "Kuis PMP",
        author: "Tim Agilenesia",
        date: "5 Mei 2023",
        youtubeId: "dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Project Schedule Management (2)",
        description: "Kuis PMP - Project Schedule Management penjelasan detail dan praktik terbaik",
        thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
        duration: "18:45",
        views: "1.8K",
        category: "Kuis PMP",
        author: "Dani Pradana",
        date: "3 Mei 2023",
        youtubeId: "9bZkp7q19f0",
      },
    ],
  },
  "agile-basics": {
    title: "Dasar-dasar Agile",
    description: "Konsep dan metodologi agile esensial untuk pemula dan praktisi menengah",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    totalVideos: 8,
    totalDuration: "3.2 jam",
    category: "Agile",
    videos: [
      {
        id: 3,
        title: "Praktik Terbaik Kolaborasi Tim Agile",
        description: "Pelajari cara membangun tim agile yang efektif dan memberikan hasil luar biasa",
        thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop",
        duration: "22:15",
        views: "3.5K",
        category: "Manajemen Tim",
        author: "Suparjo",
        date: "1 Mei 2023",
        youtubeId: "kJQP7kiw5Fk",
      },
      {
        id: 4,
        title: "Mendalami Framework Scrum",
        description: "Tinjauan komprehensif metodologi Scrum dan strategi implementasi",
        thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
        duration: "28:30",
        views: "2.9K",
        category: "Scrum",
        author: "Ahmad Rizki",
        date: "28 Apr 2023",
        youtubeId: "fJ9rUzIMcZQ",
      },
    ],
  },
  "case-studies": {
    title: "Studi Kasus",
    description: "Contoh nyata dan pelajaran dari implementasi agile yang sukses",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    totalVideos: 6,
    totalDuration: "2.8 jam",
    category: "Studi Kasus",
    videos: [
      {
        id: 5,
        title: "Creative Gathering dengan Avenew",
        description: "Di balik layar kolaborasi kreatif dan sesi team building yang inovatif",
        thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
        duration: "16:45",
        views: "890",
        category: "Di Balik Layar",
        author: "Tim Agilenesia",
        date: "20 Apr 2023",
        youtubeId: "dQw4w9WgXcQ",
      },
    ],
  },
}

export default function PlaylistPage() {
  const params = useParams()
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const slug = params.slug as string
  const playlist = playlists[slug as keyof typeof playlists]

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-20 px-[10%] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Playlist tidak ditemukan</h1>
          <Link href="/videos">
            <Button>Kembali ke Video</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Playlist Header */}
      <section className="py-16 px-[10%] bg-white">
        <div className="mb-6">
          <Link href="/videos">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Video
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-purple-100 text-purple-700 mb-4">{playlist.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{playlist.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{playlist.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>{playlist.totalVideos} Video</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{playlist.totalDuration}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => handleVideoPlay(playlist.videos[0])}
            >
              <Play className="mr-2 h-4 w-4" />
              Mulai Menonton
            </Button>
          </div>

          <div className="relative">
            <Image
              src={playlist.thumbnail || "/placeholder.svg"}
              alt={playlist.title}
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
              <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                <Play className="h-8 w-8 text-gray-900 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Videos */}
      <section className="py-16 px-[10%]">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Videos List - 3 columns */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Video dalam Playlist</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlist.videos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={handleVideoPlay} />
              ))}
            </div>
          </div>

          {/* Sidebar with Ads */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner size="sidebar" />
            <AdBanner size="sidebar" />
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isVideoModalOpen} onClose={handleVideoModalClose} />

      <Footer />
    </div>
  )
}
