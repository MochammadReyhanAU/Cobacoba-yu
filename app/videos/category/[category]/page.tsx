"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { VideoCard } from "@/components/video-card" // Already using VideoCard
import { AdBanner } from "@/components/ad-banner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { VideoModal } from "@/components/video-modal"

// Replace the existing `videos` array with the following content:

const videos = [
  // Kuis PMP Category
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
    featured: true,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Project Schedule Management (2)",
    description: "Kuis PMP - Project Schedule Management penjelasan detail dan praktik terbaik terbaru",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
    duration: "18:45",
    views: "1.8K",
    category: "Kuis PMP",
    author: "Dani Pradana",
    date: "3 Mei 2023",
    featured: true,
    youtubeId: "9bZkp7q19f0",
  },
  {
    id: 3,
    title: "Project Scope Management (2)",
    description: "Kuis PMP - Project Scope Management praktik terbaik untuk project manager",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop",
    duration: "12:20",
    views: "1.5K",
    category: "Kuis PMP",
    author: "Suparjo",
    date: "1 Mei 2023",
    featured: false,
    youtubeId: "kJQP7kiw5Fk",
  },
  {
    id: 4,
    title: "Project Cost Management - Latihan Soal",
    description: "Kuis PMP - Project Cost Management dengan pembahasan lengkap dan tips mengerjakan soal",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    duration: "22:15",
    views: "1.9K",
    category: "Kuis PMP",
    author: "Ahmad Rizki",
    date: "28 Apr 2023",
    featured: false,
    youtubeId: "fJ9rUzIMcZQ",
  },
  {
    id: 5,
    title: "Project Quality Management - Simulasi Ujian",
    description: "Kuis PMP - Project Quality Management simulasi ujian dengan timer dan pembahasan",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    duration: "25:30",
    views: "2.3K",
    category: "Kuis PMP",
    author: "Minarni",
    date: "25 Apr 2023",
    featured: false,
    youtubeId: "hT_nvWreIhg",
  },
  {
    id: 6,
    title: "Project Resource Management - Tips & Trik",
    description: "Kuis PMP - Project Resource Management dengan tips dan trik mengerjakan soal dengan cepat",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    duration: "19:45",
    views: "1.7K",
    category: "Kuis PMP",
    author: "Tim Agilenesia",
    date: "20 Apr 2023",
    featured: false,
    youtubeId: "dQw4w9WgXcQ",
  },

  // Scrum Category
  {
    id: 7,
    title: "Mendalami Framework Scrum",
    description: "Tinjauan komprehensif metodologi Scrum dan strategi implementasi untuk tim",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    duration: "22:30",
    views: "4.1K",
    category: "Scrum",
    author: "Minarni",
    date: "25 Apr 2023",
    featured: true,
    youtubeId: "hT_nvWreIhg",
  },
  {
    id: 8,
    title: "Scrum Master Roles and Responsibilities",
    description: "Panduan lengkap peran dan tanggung jawab Scrum Master dalam tim agile",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    duration: "18:20",
    views: "3.5K",
    category: "Scrum",
    author: "Ahmad Rizki",
    date: "22 Apr 2023",
    featured: false,
    youtubeId: "fJ9rUzIMcZQ",
  },
  {
    id: 9,
    title: "Sprint Planning Best Practices",
    description: "Teknik lanjutan untuk sprint planning yang efektif dan penetapan tujuan dalam tim agile",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop",
    duration: "21:00",
    views: "2.8K",
    category: "Scrum",
    author: "Suparjo",
    date: "18 Apr 2023",
    featured: false,
    youtubeId: "kJQP7kiw5Fk",
  },
  {
    id: 10,
    title: "Daily Scrum Meeting Guidelines",
    description: "Cara menjalankan daily scrum yang efektif dan produktif untuk tim development",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    duration: "14:15",
    views: "2.2K",
    category: "Scrum",
    author: "Dani Pradana",
    date: "15 Apr 2023",
    featured: false,
    youtubeId: "9bZkp7q19f0",
  },
  {
    id: 11,
    title: "Sprint Review and Retrospective",
    description: "Panduan menjalankan sprint review dan retrospective untuk continuous improvement",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
    duration: "26:45",
    views: "3.1K",
    category: "Scrum",
    author: "Tim Agilenesia",
    date: "12 Apr 2023",
    featured: false,
    youtubeId: "dQw4w9WgXcQ",
  },

  // Agile Methodology Category
  {
    id: 12,
    title: "Praktik Terbaik Kolaborasi Tim Agile",
    description: "Pelajari cara membangun tim agile yang efektif dan memberikan hasil luar biasa secara konsisten",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    duration: "25:15",
    views: "3.2K",
    category: "Agile Methodology",
    author: "Ahmad Rizki",
    date: "28 Apr 2023",
    featured: true,
    youtubeId: "fJ9rUzIMcZQ",
  },
  {
    id: 13,
    title: "Agile vs Waterfall: Kapan Menggunakan Masing-masing",
    description: "Perbandingan mendalam antara metodologi Agile dan Waterfall dengan studi kasus nyata",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop",
    duration: "20:30",
    views: "2.9K",
    category: "Agile Methodology",
    author: "Minarni",
    date: "24 Apr 2023",
    featured: false,
    youtubeId: "kJQP7kiw5Fk",
  },
  {
    id: 14,
    title: "User Stories Writing Workshop",
    description: "Workshop lengkap cara menulis user stories yang efektif untuk development tim",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    duration: "32:20",
    views: "2.6K",
    category: "Agile Methodology",
    author: "Suparjo",
    date: "20 Apr 2023",
    featured: false,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 15,
    title: "Agile Estimation Techniques",
    description: "Berbagai teknik estimasi dalam agile: story points, planning poker, dan t-shirt sizing",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    duration: "28:10",
    views: "2.4K",
    category: "Agile Methodology",
    author: "Dani Pradana",
    date: "16 Apr 2023",
    featured: false,
    youtubeId: "9bZkp7q19f0",
  },
  {
    id: 16,
    title: "Continuous Integration in Agile",
    description: "Implementasi continuous integration dan continuous deployment dalam tim agile",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
    duration: "24:45",
    views: "2.1K",
    category: "Agile Methodology",
    author: "Tim Agilenesia",
    date: "12 Apr 2023",
    featured: false,
    youtubeId: "dQw4w9WgXcQ",
  },
]

// Category definitions for videos
const videoCategoryDefinitions = {
  "kuis-pmp": {
    title: "Kuis PMP",
    description:
      "Kumpulan video kuis dan pembahasan soal-soal untuk persiapan sertifikasi Project Management Professional (PMP). Tingkatkan pemahaman Anda tentang area pengetahuan PMP dan strategi menjawab soal.",
    icon: "🧠",
    color: "from-red-500 to-orange-500",
  },
  scrum: {
    title: "Scrum",
    description:
      "Video-video yang membahas prinsip, praktik, dan peran dalam kerangka kerja Scrum untuk pengembangan produk yang adaptif. Pelajari tentang Daily Scrum, Sprint Planning, Retrospective, dan peran Scrum Master serta Product Owner.",
    icon: "🏃",
    color: "from-blue-500 to-purple-500",
  },
  "agile-methodology": {
    title: "Agile Methodology",
    description:
      "Penjelasan mendalam tentang berbagai metodologi Agile, filosofinya, dan bagaimana menerapkannya dalam proyek Anda. Jelajahi prinsip-prinsip Agile, perbandingan Kanban vs Scrum, dan skala Agile untuk organisasi besar.",
    icon: "🚀",
    color: "from-green-500 to-teal-500",
  },
}

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  category: string
  author?: string
  date?: string
  featured?: boolean
  youtubeId?: string
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function VideoCategoryPage({ params }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12
  const router = useRouter()
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video)
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
  }

  // Decode and normalize category parameter
  const categoryParam = decodeURIComponent(params.category).toLowerCase()
  const categoryKey = categoryParam.replace(/\s+/g, "-")

  // Get category definition
  const categoryDef = videoCategoryDefinitions[categoryKey as keyof typeof videoCategoryDefinitions]

  if (!categoryDef) {
    notFound()
  }

  // Filter videos by category
  const categoryVideos = videos.filter((video) => video.category.toLowerCase().replace(/\s+/g, "-") === categoryKey)

  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = categoryVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(categoryVideos.length / videosPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Category Definition */}
      <section className={`relative py-20 px-[10%] bg-gradient-to-br ${categoryDef.color} overflow-hidden`}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          {/* Back Button */}
          <div className="mb-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => router.push("/videos")}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/40 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Video
            </Button>
          </div>

          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <span className="text-2xl">{categoryDef.icon}</span>
              Kategori
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{categoryDef.title}</h1>

          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">{categoryDef.description}</p>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              {categoryVideos.length} Video Tersedia
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-4 px-[10%] bg-white border-t border-b">
        <AdBanner size="medium" />
      </section>

      {/* Videos Section */}
      <section className="py-8 px-[10%] bg-white border-b shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Video {categoryDef.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi semua video dalam kategori {categoryDef.title.toLowerCase()} untuk memperdalam pemahaman Anda
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 px-[10%] bg-white">
        {categoryVideos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Video</h3>
            <p className="text-gray-600 mb-8">Video untuk kategori ini sedang dalam proses pembuatan.</p>
            <Button
              onClick={() => router.push("/videos")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Kembali ke Semua Video
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="rounded-xl"
                  >
                    Sebelumnya
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      size="sm"
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? `bg-gradient-to-r ${categoryDef.color} text-white rounded-xl`
                          : "rounded-xl"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="rounded-xl"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      <Footer />
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
          videoTitle={selectedVideo.title}
          youtubeId={selectedVideo.youtubeId || ""}
        />
      )}
    </div>
  )
}
