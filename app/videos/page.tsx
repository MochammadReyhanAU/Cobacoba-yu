"use client"

import { useState, useRef, useEffect } from "react" // Tambahkan useEffect
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Play, X } from "lucide-react"
import Image from "next/image"
import { VideoCard } from "@/components/video-card"
import { VideoModal } from "@/components/video-modal"
import { HighlightedVideosCarousel } from "@/components/highlighted-videos-carousel"
import { VideoCategorySection } from "@/components/video-category-section"
import { AdBanner } from "@/components/ad-banner"
import { PollModal } from "@/components/poll-modal" // Ubah dari PollWidget ke PollModal

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
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop",
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

const categories = ["Kuis PMP", "Scrum", "Agile Methodology"]

const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "popular", label: "Terpopuler" },
  { value: "duration", label: "Berdasarkan Durasi" },
]

// Mock poll data for video page
const videoPoll = {
  id: "video-poll-1",
  question: "Topik video apa yang paling ingin Anda pelajari selanjutnya?",
  options: [
    { id: "vp1a", text: "Advanced Scrum Techniques", votes: 60 },
    { id: "vp1b", text: "Product Ownership Best Practices", votes: 40 },
    { id: "vp1c", text: "DevOps Integration with Agile", votes: 35 },
    { id: "vp1d", text: "Agile Coaching & Mentoring", votes: 25 },
  ],
  totalVotes: 160,
  category: "Video Content",
  isActive: true,
  endDate: "2025-12-31",
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState("")
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 12 // Changed from 6 to 12

  const categoryRefs = useRef(new Map<string, HTMLDivElement>())

  const [isPollModalOpen, setIsPollModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
      if (!seenPolls.includes(videoPoll.id)) {
        setIsPollModalOpen(true)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClosePollModal = () => {
    setIsPollModalOpen(false)
  }

  // Function to handle scrolling to a category section
  const scrollToCategory = (category: string) => {
    const section = categoryRefs.current.get(category)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Function to toggle search bar visibility
  const handleToggleSearchBar = () => {
    setShowSearchBar(!showSearchBar)
    if (!showSearchBar) {
      setLocalSearchQuery("") // Clear local search query when closing
    }
  }

  // Function to handle search execution (navigate to /search page)
  const handleExecuteSearch = () => {
    if (localSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(localSearchQuery.trim())}&type=videos`)
      setShowSearchBar(false) // Close search bar after navigation
    }
  }

  // Filter videos based on selected category for latest videos section (no longer filtered by hero buttons)
  const filteredVideos = videos // No filtering by hero buttons anymore
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/videos/playlist/${playlistId}`)
  }

  const handleSeeAllCategory = (category: string) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
    window.scrollTo(0, 0)
    router.push(`/videos/category/${categorySlug}`)
  }

  // Group videos by category for category sections
  const videosByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = videos.filter((video) => video.category === category)
      return acc
    },
    {} as Record<string, typeof videos>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-[10%] bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            Video Unggulan
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perpustakaan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Video</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Tonton koleksi lengkap tutorial agile, studi kasus, dan wawasan ahli dari para pemimpin industri
          </p>

          {/* Category Buttons, Search, and Create Video */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Category Buttons */}
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => scrollToCategory(category)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
              >
                {category}
              </Button>
            ))}
            {/* Search Button (toggles search bar visibility) */}
            <Button
              variant="outline"
              onClick={handleToggleSearchBar}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 transition-all duration-300 ${
                showSearchBar
                  ? "border-purple-300 bg-purple-50 text-purple-700"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
              }`}
            >
              {showSearchBar ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              {showSearchBar ? "Tutup" : "Cari"}
            </Button>
          </div>

          {/* Search Bar - appears below buttons when search is clicked */}
          {showSearchBar && (
            <div className="mt-8 max-w-2xl mx-auto flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Cari video berdasarkan judul, kategori, atau penulis..."
                  value={localSearchQuery} // Bind input ke localSearchQuery
                  onChange={(e) => setLocalSearchQuery(e.target.value)} // Update localSearchQuery
                  className="pl-12 h-14 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl shadow-lg text-base"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleExecuteSearch()
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleExecuteSearch}
                className="h-14 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Cari
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Highlighted Videos Carousel (without chip, title, and description) */}
      <section className="py-16 px-[10%] bg-white">
        <HighlightedVideosCarousel videos={videos} onPlay={handleVideoPlay} />
      </section>

      {/* Advertisement Banner 1 */}
      <section className="py-4 px-[10%] bg-gray-50 border-t border-b">
        <AdBanner size="medium" className="w-full" />
      </section>

      {/* Video Categories Sections */}
      <section className="py-16 px-[10%] space-y-16">
        {categories.map((category) => {
          const categoryVideos = videos.filter((video) => video.category === category)

          if (categoryVideos.length === 0) return null

          return (
            <VideoCategorySection
              key={category}
              category={category}
              videos={videosByCategory[category]}
              onPlay={handleVideoPlay}
              onSeeAll={handleSeeAllCategory}
              ref={(el) => {
                if (el) categoryRefs.current.set(category, el)
                else categoryRefs.current.delete(category)
              }}
            />
          )
        })}
      </section>

      {/* Advertisement Banner 2 */}
      <section className="py-4 px-[10%] bg-gray-50 border-t border-b">
        <AdBanner size="medium" className="w-full" />
      </section>

      {/* Latest Videos Section with Filter */}
      <section className="py-16 px-[10%] bg-white">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            Video Terbaru
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Video{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Terbaru</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan video-video terbaru yang baru saja ditambahkan ke perpustakaan kami
          </p>
        </div>

        {/* Videos Grid - Full Width */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {" "}
          {/* Changed lg:grid-cols-3 to lg:grid-cols-4 */}
          {currentVideos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={handleVideoPlay} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
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
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl"
                    : "rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
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
              className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </section>

      {/* Advertisement Banner 2 */}
      <section className="py-4 px-[10%] bg-gray-50 border-t border-b">
        <AdBanner size="medium" className="w-full" />
      </section>

      {/* Enhanced Featured Playlist Section */}
      <section className="py-16 px-[10%] bg-gray-50 border-t border-b">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            Playlist Unggulan
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Koleksi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Terpilih</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seri video terorganisir untuk pembelajaran terstruktur dan pengembangan keterampilan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handlePlaylistClick("pmp-quiz")}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop"
                alt="Seri Kuis PMP"
                width={400}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">12 Video • 4.5 jam</p>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Seri Kuis PMP</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Persiapan lengkap sertifikasi PMP dengan penjelasan detail dan soal latihan
              </p>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handlePlaylistClick("scrum-mastery")}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop"
                alt="Scrum Mastery"
                width={400}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">8 Video • 3.2 jam</p>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scrum Mastery</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Panduan lengkap menguasai framework Scrum dari dasar hingga advanced
              </p>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handlePlaylistClick("agile-fundamentals")}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
                alt="Agile Fundamentals"
                width={400}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">10 Video • 4.1 jam</p>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agile Fundamentals</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dasar-dasar metodologi Agile untuk tim dan organisasi modern
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isVideoModalOpen} onClose={handleVideoModalClose} />

      <Footer />

      {/* Poll Modal for Videos Page */}
      <PollModal poll={videoPoll} isOpen={isPollModalOpen} onClose={handleClosePollModal} />
    </div>
  )
}
