"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, X } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { AdBanner } from "@/components/ad-banner"
import { useState, useRef, useEffect } from "react" // Tambahkan useEffect
import { useRouter } from "next/navigation"
import { HighlightedArticlesCarousel } from "@/components/highlighted-articles-carousel"
import { CategorySection } from "@/components/category-section"
import { PollModal } from "@/components/poll-modal" // Import PollModal

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
    excerpt: "Mengapa kualitas adalah fondasi dari setiap implementasi agile yang sukses dan berkelanjutan",
    author: "Suparjo",
    date: "2 Mei 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80",
    readTime: "6 menit",
    views: "1.5K",
    featured: true,
  },
  // --- Tambahan artikel untuk memenuhi minimal 5 per kategori ---
  // Komunikasi
  {
    id: 10,
    title: "Komunikasi Efektif dalam Scrum",
    excerpt: "Strategi komunikasi untuk tim Scrum yang sukses.",
    author: "Dani Pradana",
    date: "10 Apr 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop&q=80", // Business meeting
    readTime: "6 menit",
    views: "1.1K",
    featured: false,
  },
  {
    id: 11,
    title: "Membangun Budaya Transparansi",
    excerpt: "Pentingnya keterbukaan dalam tim agile.",
    author: "Minarni",
    date: "15 Mar 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&q=80", // Team transparency
    readTime: "7 menit",
    views: "950",
    featured: false,
  },
  {
    id: 12,
    title: "Feedback Loop dalam Agile",
    excerpt: "Bagaimana umpan balik mempercepat adaptasi tim.",
    author: "Suparjo",
    date: "20 Feb 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop&q=80", // Feedback discussion
    readTime: "5 menit",
    views: "880",
    featured: false,
  },
  {
    id: 13,
    title: "Menyampaikan Ide dengan Jelas",
    excerpt: "Teknik presentasi yang efektif untuk tim agile.",
    author: "Dani Pradana",
    date: "5 Feb 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&q=80", // Presentation
    readTime: "8 menit",
    views: "1.0K",
    featured: false,
  },
  // Manajemen Tim
  {
    id: 14,
    title: "Peran Scrum Master yang Efektif",
    excerpt: "Kunci keberhasilan peran Scrum Master dalam tim.",
    author: "Suparjo",
    date: "1 Apr 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop&q=80", // Scrum master
    readTime: "9 menit",
    views: "1.7K",
    featured: false,
  },
  {
    id: 15,
    title: "Membangun Tim Lintas Fungsi",
    excerpt: "Strategi membentuk tim yang mandiri dan kolaboratif.",
    author: "Minarni",
    date: "8 Mar 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop&q=80", // Cross-functional team
    readTime: "7 menit",
    views: "1.3K",
    featured: false,
  },
  {
    id: 16,
    title: "Mengatasi Konflik dalam Tim Agile",
    excerpt: "Pendekatan proaktif untuk resolusi konflik.",
    author: "Dani Pradana",
    date: "12 Feb 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop&q=80", // Conflict resolution
    readTime: "6 menit",
    views: "990",
    featured: false,
  },
  {
    id: 17,
    title: "Coaching Tim Agile untuk Performa Tinggi",
    excerpt: "Teknik coaching untuk meningkatkan produktivitas tim.",
    author: "Suparjo",
    date: "25 Jan 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop&q=80", // Coaching
    readTime: "8 menit",
    views: "1.5K",
    featured: false,
  },
  {
    id: 18,
    title: "Delegasi Efektif dalam Agile",
    excerpt: "Meningkatkan otonomi tim melalui delegasi yang tepat.",
    author: "Minarni",
    date: "10 Jan 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&q=80", // Delegation
    readTime: "5 menit",
    views: "850",
    featured: false,
  },
  // Manajemen Kualitas
  {
    id: 19,
    title: "Test-Driven Development (TDD) dalam Agile",
    excerpt: "Meningkatkan kualitas kode dengan TDD.",
    author: "Dani Pradana",
    date: "20 Mar 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&q=80", // Code testing
    readTime: "7 menit",
    views: "1.2K",
    featured: false,
  },
  {
    id: 20,
    title: "Continuous Integration dan Continuous Delivery (CI/CD)",
    excerpt: "Otomatisasi pengiriman perangkat lunak berkualitas.",
    author: "Suparjo",
    date: "28 Feb 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&q=80", // CI/CD pipeline
    readTime: "8 menit",
    views: "1.1K",
    featured: false,
  },
  {
    id: 21,
    title: "Definisi 'Done' yang Jelas",
    excerpt: "Pentingnya kriteria penyelesaian yang disepakati.",
    author: "Minarni",
    date: "5 Feb 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&q=80", // Definition of Done
    readTime: "6 menit",
    views: "900",
    featured: false,
  },
  {
    id: 22,
    title: "Quality Assurance dalam Siklus Agile",
    excerpt: "Peran QA yang terintegrasi dalam pengembangan agile.",
    author: "Dani Pradana",
    date: "15 Jan 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80", // QA testing
    readTime: "7 menit",
    views: "1.0K",
    featured: false,
  },
  {
    id: 23,
    title: "Refactoring untuk Kualitas Kode",
    excerpt: "Meningkatkan struktur kode tanpa mengubah fungsionalitas.",
    author: "Suparjo",
    date: "1 Jan 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop&q=80", // Code refactoring
    readTime: "5 menit",
    views: "800",
    featured: false,
  },
]

const categories = ["Semua Kategori", "Komunikasi", "Manajemen Tim", "Manajemen Kualitas"]

// Mock poll data for articles list page
const articleListPagePoll = {
  id: "articles-list-poll-1",
  question: "Topik artikel apa yang paling ingin Anda baca selanjutnya?",
  options: [
    { id: "alp1a", text: "Agile Leadership", votes: 50 },
    { id: "alp1b", text: "Product Management", votes: 40 },
    { id: "alp1c", text: "DevOps Practices", votes: 30 },
    { id: "alp1d", text: "Scrum Master Tips", votes: 25 },
  ],
  totalVotes: 145,
  category: "Article Content",
  isActive: true,
  endDate: "2025-12-31",
}

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState("") // State untuk nilai input langsung
  const articlesPerPage = 12
  const router = useRouter()

  const categoryRefs = useRef(new Map<string, HTMLDivElement>())

  const [isPollModalOpen, setIsPollModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
      if (!seenPolls.includes(articleListPagePoll.id)) {
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
      setLocalSearchQuery("") // Bersihkan local search query saat menutup
    }
  }

  // Function to handle search execution (navigate to /search page)
  const handleExecuteSearch = () => {
    if (localSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(localSearchQuery.trim())}`)
      setShowSearchBar(false) // Tutup search bar setelah navigasi
    }
  }

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-[10%] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Artikel Terbaru
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Jelajahi Wawasan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Agile</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Jelajahi koleksi lengkap wawasan agile, metodologi, dan pengalaman nyata dari para ahli industri
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Category Buttons */}
            {categories.slice(1).map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => scrollToCategory(category)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
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
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
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
                  placeholder="Cari artikel berdasarkan judul, kategori, atau penulis..."
                  value={localSearchQuery} // Bind input ke localSearchQuery
                  onChange={(e) => setLocalSearchQuery(e.target.value)} // Update localSearchQuery
                  className="pl-12 h-14 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-lg text-base"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleExecuteSearch()
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleExecuteSearch}
                className="h-14 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Cari
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Highlighted Articles Carousel Section */}
      <section className="py-16 px-[10%] bg-white">
        <HighlightedArticlesCarousel articles={articles} />
      </section>

      {/* Ad Banner between Highlighted Articles and Categories */}
      <section className="py-4 px-[10%] bg-gray-50 border-t border-b">
        <AdBanner size="medium" />
      </section>

      {/* List per Category Section */}
      <section className="py-16 px-[10%] bg-gray-50">
        <div className="space-y-16">
          {categories.slice(1).map((category) => {
            const categoryArticles = articles.filter((article) => article.category === category)

            if (categoryArticles.length === 0) return null

            return (
              <CategorySection
                key={category}
                category={category}
                articles={categoryArticles}
                onSeeAll={(cat) => {
                  console.log(`See all articles for category: ${cat}`)
                }}
                ref={(el) => {
                  if (el) categoryRefs.current.set(category, el)
                  else categoryRefs.current.delete(category)
                }}
              />
            )
          })}
        </div>
      </section>

      {/* Ad Banner between Categories and Latest Articles */}
      <section className="py-4 px-[10%] bg-white border-t border-b">
        <AdBanner size="medium" />
      </section>

      {/* Latest Articles Section Title (without search/filter) */}
      <section className="py-8 px-[10%] bg-white border-b shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan artikel-artikel terbaru dari berbagai kategori dan topik menarik
          </p>
        </div>
      </section>

      {/* Enhanced Articles Grid - Full Width (no sidebar) */}
      <section className="py-16 px-[10%] bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>

        {/* Functional Pagination */}
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
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
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
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      <Footer />

      {/* Poll Modal for Articles Page */}
      <PollModal poll={articleListPagePoll} isOpen={isPollModalOpen} onClose={handleClosePollModal} />
    </div>
  )
}
