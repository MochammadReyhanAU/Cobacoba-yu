"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Play, Calendar, Hash } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { VideoCard } from "@/components/video-card"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// Mock data untuk definisi
const definitions = {
  agile: {
    title: "Agile Methodology",
    definition:
      "Agile adalah metodologi pengembangan perangkat lunak yang menekankan pada kolaborasi, fleksibilitas, dan pengiriman berkelanjutan. Agile memungkinkan tim untuk beradaptasi dengan perubahan kebutuhan dan memberikan nilai kepada pelanggan secara iteratif.",
    relatedKeywords: ["scrum", "kanban", "sprint", "retrospective", "user story"],
  },
  scrum: {
    title: "Scrum Framework",
    definition:
      "Scrum adalah framework agile yang menggunakan pendekatan iteratif dan incremental untuk mengelola pengembangan produk. Scrum terdiri dari roles (Product Owner, Scrum Master, Development Team), events (Sprint, Daily Scrum, Sprint Review, Sprint Retrospective), dan artifacts (Product Backlog, Sprint Backlog, Increment).",
    relatedKeywords: ["sprint", "product owner", "scrum master", "daily standup", "retrospective"],
  },
  kanban: {
    title: "Kanban Method",
    definition:
      "Kanban adalah metode visual untuk mengelola pekerjaan yang mengalir melalui proses. Kanban menggunakan papan visual dengan kolom yang mewakili tahapan kerja dan kartu yang mewakili item pekerjaan, membantu tim memvisualisasikan alur kerja dan mengidentifikasi bottleneck.",
    relatedKeywords: ["wip limit", "flow", "continuous delivery", "lean", "visual management"],
  },
  sprint: {
    title: "Sprint",
    definition:
      "Sprint adalah periode waktu tetap (biasanya 1-4 minggu) dalam Scrum di mana tim mengerjakan sekumpulan item dari Product Backlog untuk menghasilkan increment produk yang berpotensi dapat dirilis. Setiap sprint dimulai dengan Sprint Planning dan diakhiri dengan Sprint Review dan Sprint Retrospective.",
    relatedKeywords: ["sprint planning", "sprint review", "sprint retrospective", "sprint goal", "velocity"],
  },
  retrospective: {
    title: "Sprint Retrospective",
    definition:
      "Sprint Retrospective adalah acara Scrum yang memberikan kesempatan bagi Scrum Team untuk menginspeksi diri dan membuat rencana perbaikan untuk diterapkan selama Sprint berikutnya. Ini adalah kesempatan untuk tim untuk fokus pada proses dan praktik mereka.",
    relatedKeywords: ["continuous improvement", "team reflection", "action items", "what went well", "impediments"],
  },
  komunikasi: {
    title: "Komunikasi dalam Agile",
    definition:
      "Komunikasi yang efektif adalah fondasi dari setiap tim agile yang sukses. Ini meliputi transparansi, feedback yang konstruktif, dan kolaborasi yang terbuka antara semua anggota tim dan stakeholder.",
    relatedKeywords: ["transparansi", "feedback", "kolaborasi", "daily standup", "face-to-face"],
  },
  "manajemen tim": {
    title: "Manajemen Tim Agile",
    definition:
      "Manajemen tim agile fokus pada pemberdayaan tim untuk mengorganisir diri sendiri, membuat keputusan, dan bertanggung jawab atas hasil mereka. Ini melibatkan coaching, mentoring, dan menciptakan lingkungan yang mendukung kolaborasi dan inovasi.",
    relatedKeywords: ["self-organizing", "empowerment", "coaching", "team building", "leadership"],
  },
  kualitas: {
    title: "Manajemen Kualitas Agile",
    definition:
      "Manajemen kualitas dalam agile menekankan pada pencegahan defect melalui praktik seperti Test-Driven Development (TDD), Continuous Integration (CI), dan Definition of Done yang jelas. Kualitas dibangun ke dalam produk, bukan diuji di akhir.",
    relatedKeywords: ["tdd", "ci/cd", "definition of done", "code review", "automated testing"],
  },
}

// Mock data untuk artikel
const articles = [
  {
    id: 1,
    title: "Digital Body Language - Bagian 1",
    excerpt: "Memahami komunikasi non-verbal dalam era digital dan remote work untuk meningkatkan efektivitas tim",
    author: "Dani Pradana",
    date: "7 Mei 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&q=80",
    readTime: "5 menit",
    views: "2.1K",
    featured: true,
  },
  {
    id: 2,
    title: "Agile vs Fragile: Membedah Perbedaan Tim yang Sehat dan Tim yang Hancur",
    excerpt: "Analisis mendalam tentang karakteristik tim yang sukses vs tim yang gagal dalam implementasi agile",
    author: "Suparjo",
    date: "4 Mei 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&q=80",
    readTime: "8 menit",
    views: "1.8K",
    featured: true,
  },
  {
    id: 3,
    title: "Agile vs. Fragile: Kualitas Itu Penting - Seri 10",
    excerpt: "Mengnya kualitas adalah fondasi dari setiap implementasi agile yang sukses dan berkelanjutan",
    author: "Suparjo",
    date: "2 Mei 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80",
    readTime: "6 menit",
    views: "1.5K",
    featured: true,
  },
]

// Mock data untuk video
const videos = [
  {
    id: 1,
    title: "Pengenalan Scrum Framework",
    description: "Video pengenalan lengkap tentang Scrum framework dan implementasinya",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&q=80",
    duration: "15:30",
    views: "5.2K",
    author: "Suparjo",
    date: "10 Mei 2023",
    category: "Scrum",
  },
  {
    id: 2,
    title: "Daily Standup Best Practices",
    description: "Tips dan trik untuk menjalankan daily standup yang efektif",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&q=80",
    duration: "12:45",
    views: "3.8K",
    author: "Dani Pradana",
    date: "8 Mei 2023",
    category: "Komunikasi",
  },
]

// Mock data untuk events
const events = [
  {
    id: 1,
    title: "Agile Indonesia Conference 2024",
    description: "Konferensi tahunan terbesar tentang agile di Indonesia",
    date: "15-16 Juni 2024",
    location: "Jakarta Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop&q=80",
    category: "Conference",
    attendees: "500+",
  },
  {
    id: 2,
    title: "Scrum Master Workshop",
    description: "Workshop intensif untuk menjadi Scrum Master yang efektif",
    date: "22 Juni 2024",
    location: "Online",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&q=80",
    category: "Workshop",
    attendees: "50",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get search query from URL
  const searchQuery = searchParams.get("q") || ""

  // State for the input field, initialized from URL query
  const [inputValue, setInputValue] = useState(searchQuery)

  // Sync inputValue with searchQuery from URL whenever searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // Compute search results using useMemo to avoid re-computation
  const { searchResults, currentDefinition } = useMemo(() => {
    if (!searchQuery) {
      return {
        searchResults: { articles: [], videos: [], events: [] },
        currentDefinition: null,
      }
    }

    const lowerQuery = searchQuery.toLowerCase()

    // Cari definisi yang cocok HANYA berdasarkan key dan title
    const matchedDefinition = Object.entries(definitions).find(
      ([key, def]) => key.includes(lowerQuery) || def.title.toLowerCase().includes(lowerQuery),
    )

    const definition = matchedDefinition ? { key: matchedDefinition[0], ...matchedDefinition[1] } : null

    // Filter artikel
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery),
    )

    // Filter video
    const filteredVideos = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(lowerQuery) ||
        video.description.toLowerCase().includes(lowerQuery) ||
        video.category.toLowerCase().includes(lowerQuery) ||
        video.author.toLowerCase().includes(lowerQuery),
    )

    // Filter events
    const filteredEvents = events.filter(
      (event) =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.category.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery),
    )

    return {
      searchResults: {
        articles: filteredArticles,
        videos: filteredVideos,
        events: filteredEvents,
      },
      currentDefinition: definition,
    }
  }, [searchQuery])

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`)
    }
  }

  const handleKeywordClick = (keyword) => {
    router.push(`/search?q=${encodeURIComponent(keyword)}`)
  }

  const totalResults = searchResults.articles.length + searchResults.videos.length + searchResults.events.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Search */}
      <section className="relative py-20 px-[10%] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Search className="h-4 w-4" />
              Pencarian
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Temukan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Wawasan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Cari artikel, video, dan event sesuai dengan kebutuhan pembelajaran Anda
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari artikel, video, event, atau topik agile..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-12 h-14 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-lg text-base"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Cari
            </Button>
          </div>

          {/* Search Results Summary */}
          {searchQuery && (
            <div className="mt-6 text-gray-600">
              {totalResults > 0 ? (
                <p>
                  Ditemukan <span className="font-semibold text-blue-600">{totalResults}</span> hasil untuk "
                  {searchQuery}"
                </p>
              ) : (
                <p>Tidak ada hasil ditemukan untuk "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Definition Card */}
      {currentDefinition && (
        <section className="py-8 px-[10%] bg-white border-b">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentDefinition.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{currentDefinition.definition}</p>

                  {/* Related Keywords */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Kata Kunci Terkait
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentDefinition.relatedKeywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="secondary"
                          className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          onClick={() => handleKeywordClick(keyword)}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Results */}
      {searchQuery && totalResults > 0 && (
        <section className="py-16 px-[10%] bg-gray-50">
          <div className="space-y-16">
            {/* Articles Results */}
            {searchResults.articles.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Artikel ({searchResults.articles.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} size="medium" />
                  ))}
                </div>
              </div>
            )}

            {/* Videos Results */}
            {searchResults.videos.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Play className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Video ({searchResults.videos.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}

            {/* Events Results */}
            {searchResults.events.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Event ({searchResults.events.length})</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{event.category}</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {event.date}
                            </span>
                            <span>{event.attendees} peserta</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">📍 {event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* No Results */}
      {searchQuery && totalResults === 0 && (
        <section className="py-16 px-[10%] bg-white">
          <div className="text-center max-w-2xl mx-auto">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tidak Ada Hasil Ditemukan</h3>
            <p className="text-gray-600 mb-8">
              Maaf, kami tidak dapat menemukan hasil untuk pencarian "{searchQuery}". Coba gunakan kata kunci yang
              berbeda atau lebih umum.
            </p>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700">Saran pencarian:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(definitions)
                  .slice(0, 6)
                  .map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
