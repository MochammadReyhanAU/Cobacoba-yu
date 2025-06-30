"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { AdBanner } from "@/components/ad-banner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

// Sample articles data (same as main articles page)
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
  // Komunikasi articles
  {
    id: 10,
    title: "Komunikasi Efektif dalam Scrum",
    excerpt: "Strategi komunikasi untuk tim Scrum yang sukses.",
    author: "Dani Pradana",
    date: "10 Apr 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&q=80",
    readTime: "8 menit",
    views: "1.0K",
    featured: false,
  },
  // Manajemen Tim articles
  {
    id: 14,
    title: "Peran Scrum Master yang Efektif",
    excerpt: "Kunci keberhasilan peran Scrum Master dalam tim.",
    author: "Suparjo",
    date: "1 Apr 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&q=80",
    readTime: "5 menit",
    views: "850",
    featured: false,
  },
  // Manajemen Kualitas articles
  {
    id: 19,
    title: "Test-Driven Development (TDD) dalam Agile",
    excerpt: "Meningkatkan kualitas kode dengan TDD.",
    author: "Dani Pradana",
    date: "20 Mar 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop&q=80",
    readTime: "5 menit",
    views: "800",
    featured: false,
  },
]

// Category definitions
const categoryDefinitions = {
  komunikasi: {
    title: "Komunikasi",
    description:
      "Komunikasi adalah fondasi dari setiap tim agile yang sukses. Dalam konteks agile, komunikasi yang efektif mencakup transparansi, feedback yang konstruktif, dan kolaborasi yang berkelanjutan. Artikel-artikel dalam kategori ini membahas berbagai aspek komunikasi dalam lingkungan kerja agile, mulai dari digital body language hingga teknik presentasi yang efektif.",
    icon: "💬",
    color: "from-blue-500 to-cyan-500",
  },
  "manajemen-tim": {
    title: "Manajemen Tim",
    description:
      "Manajemen tim dalam agile berfokus pada pemberdayaan, coaching, dan menciptakan lingkungan kerja yang mendukung produktivitas tinggi. Kategori ini mengeksplorasi peran Scrum Master, pembentukan tim lintas fungsi, resolusi konflik, dan strategi delegasi yang efektif untuk menciptakan tim yang mandiri dan kolaboratif.",
    icon: "👥",
    color: "from-purple-500 to-pink-500",
  },
  "manajemen-kualitas": {
    title: "Manajemen Kualitas",
    description:
      "Kualitas adalah aspek krusial dalam pengembangan agile yang berkelanjutan. Artikel-artikel dalam kategori ini membahas praktik-praktik terbaik untuk memastikan kualitas produk, mulai dari Test-Driven Development (TDD), Continuous Integration/Continuous Delivery (CI/CD), hingga definisi 'Done' yang jelas dan Quality Assurance yang terintegrasi.",
    icon: "⚡",
    color: "from-green-500 to-teal-500",
  },
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 12
  const router = useRouter()

  // Decode and normalize category parameter
  const categoryParam = decodeURIComponent(params.category).toLowerCase()
  const categoryKey = categoryParam.replace(/\s+/g, "-")

  // Get category definition
  const categoryDef = categoryDefinitions[categoryKey as keyof typeof categoryDefinitions]

  if (!categoryDef) {
    notFound()
  }

  // Filter articles by category
  const categoryArticles = articles.filter(
    (article) => article.category.toLowerCase().replace(/\s+/g, "-") === categoryKey,
  )

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = categoryArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(categoryArticles.length / articlesPerPage)

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
              onClick={() => router.push("/articles")}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/40 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Artikel
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
              {categoryArticles.length} Artikel Tersedia
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-4 px-[10%] bg-white border-t border-b">
        <AdBanner size="medium" />
      </section>

      {/* Articles Section */}
      <section className="py-8 px-[10%] bg-white border-b shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artikel {categoryDef.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi semua artikel dalam kategori {categoryDef.title.toLowerCase()} untuk memperdalam pemahaman Anda
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-[10%] bg-white">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-600 mb-8">Artikel untuk kategori ini sedang dalam proses penulisan.</p>
            <Button
              onClick={() => router.push("/articles")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Kembali ke Semua Artikel
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="medium" />
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
    </div>
  )
}
