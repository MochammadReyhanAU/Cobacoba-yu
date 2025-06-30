"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp, BookOpen, Users, Target, Zap, Calendar, MessageSquare } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { VideoCard } from "@/components/video-card"
import { VideoModal } from "@/components/video-modal"
import { AdBanner } from "@/components/ad-banner"
import { PollModal } from "@/components/poll-modal" // Import PollModal instead of PollWidget
import Link from "next/link"

const featuredArticles = [
  {
    id: 1,
    title: "Digital Body Language - Bagian 1",
    excerpt:
      "Memahami komunikasi non-verbal dalam era digital dan remote work untuk meningkatkan efektivitas tim dan produktivitas kerja",
    author: "Dani Pradana",
    date: "7 Mei 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop",
    readTime: "8 menit",
    views: "1.8K",
  },
  {
    id: 3,
    title: "Agile vs. Fragile: Kualitas Itu Penting",
    excerpt: "Mengapa kualitas adalah fondasi dari setiap implementasi agile yang sukses dan berkelanjutan",
    author: "Suparjo",
    date: "2 Mei 2023",
    category: "Manajemen Kualitas",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    readTime: "6 menit",
    views: "1.5K",
  },
  {
    id: 4,
    title: "Analisa Penerapan Konsep Agile Pada Pelaksanaan Perkuliahan",
    excerpt: "Studi kasus penerapan metodologi agile dalam konteks pendidikan dan pembelajaran modern",
    author: "Minarni",
    date: "30 Apr 2023",
    category: "Pendidikan",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
    readTime: "7 menit",
    views: "1.2K",
  },
  {
    id: 5,
    title: "Resourcefulness - Kemampuan Memanfaatkan Sumber Daya Secara Efektif",
    excerpt: "Bagaimana mengoptimalkan sumber daya yang terbatas untuk mencapai hasil maksimal dalam proyek",
    author: "Dani Pradana",
    date: "23 Apr 2023",
    category: "Manajemen Sumber Daya",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    readTime: "5 menit",
    views: "980",
  },
  {
    id: 6,
    title: "Agile vs. Fragile: Membangun Tim yang Efektif dan Berdaya",
    excerpt: "Strategi membangun tim yang kuat, adaptif, dan mampu menghadapi tantangan dalam era digital",
    author: "Suparjo",
    date: "16 Apr 2023",
    category: "Pembangunan Tim",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    readTime: "9 menit",
    views: "2.3K",
  },
]

const featuredVideos = [
  {
    id: 1,
    title: "Project Integration Management (2)",
    description: "Kuis PMP - Project Integration Management panduan lengkap untuk sertifikasi",
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
    description: "Kuis PMP - Project Schedule Management penjelasan detail dan praktik terbaik",
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
]

// Featured poll data for homepage
const featuredPoll = {
  id: "homepage-poll-1",
  question: "Fitur apa saja yang paling Anda sukai di Agilenesia.id? (Pilih lebih dari satu)",
  options: [
    { id: "h1a", text: "Artikel mendalam tentang Agile", votes: 85 },
    { id: "h1b", text: "Video tutorial praktis", votes: 72 },
    { id: "h1c", text: "Event dan workshop", votes: 45 },
    { id: "h1d", text: "Komunitas diskusi", votes: 38 },
    { id: "h1e", text: "Studi kasus nyata", votes: 56 },
  ],
  totalVotes: 296,
  category: "Website Feedback",
  isActive: true,
  endDate: "2025-12-31",
  allowMultiple: true,
}

const stats = [
  {
    icon: BookOpen,
    value: "150+",
    label: "Artikel Berkualitas",
    description: "Konten mendalam tentang Agile dan Scrum",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Komunitas Aktif",
    description: "Praktisi Agile dari seluruh Indonesia",
  },
  {
    icon: Target,
    value: "500+",
    label: "Perusahaan Terbantu",
    description: "Transformasi digital yang sukses",
  },
  {
    icon: Zap,
    value: "95%",
    label: "Tingkat Kepuasan",
    description: "Feedback positif dari pembaca",
  },
]

const features = [
  {
    icon: BookOpen,
    title: "Artikel Mendalam",
    description: "Konten berkualitas tinggi tentang metodologi Agile, Scrum, dan manajemen tim modern.",
    color: "blue",
  },
  {
    icon: Play,
    title: "Video Tutorial",
    description: "Pembelajaran visual dengan studi kasus nyata dari praktisi berpengalaman.",
    color: "red",
  },
  {
    icon: Calendar,
    title: "Event & Workshop",
    description: "Webinar, workshop, dan meetup untuk mengembangkan skill dan networking.",
    color: "green",
  },
  {
    icon: MessageSquare,
    title: "Komunitas Diskusi",
    description: "Platform berbagi pengalaman dan solusi dengan sesama praktisi Agile.",
    color: "purple",
  },
]

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isPollModalOpen, setIsPollModalOpen] = useState(false)

  // Ref for the ad section to trigger poll modal
  // const adSectionRef = useRef<HTMLElement>(null)

  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  const handlePollModalClose = () => {
    setIsPollModalOpen(false)
  }

  // Intersection Observer to detect when user scrolls to ad section
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // Check if user hasn't voted or seen this poll before
  //           const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
  //           const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")

  //           if (!votedPolls.includes(featuredPoll.id) && !seenPolls.includes(featuredPoll.id)) {
  //             // Add a small delay to make it feel more natural
  //             setTimeout(() => {
  //               setIsPollModalOpen(true)
  //             }, 500)
  //           }

  //           // Disconnect observer after first trigger
  //           observer.disconnect()
  //         }
  //       })
  //     },
  //     {
  //       threshold: 0.5, // Trigger when 50% of the element is visible
  //     },
  //   )

  //   if (adSectionRef.current) {
  //     observer.observe(adSectionRef.current)
  //   }

  //   return () => observer.disconnect()
  // }, [])

  // Add new useEffect for 3-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
      if (!seenPolls.includes(featuredPoll.id)) {
        setIsPollModalOpen(true)
      }
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Enhanced Latest Articles Section */}
      <section className="relative py-20 px-[10%] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Artikel Terbaru
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Temukan Wawasan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Agile</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tetap update dengan tren terbaru, metodologi, dan pengalaman nyata dalam manajemen proyek agile
            </p>
          </div>

          {/* First Row - 2 Articles (1 Large + 1 Regular) */}
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            {/* Featured Article - Large (8 columns) */}
            <div className="lg:col-span-8">
              <ArticleCard article={featuredArticles[0]} size="large" />
            </div>

            {/* Second Article - Regular (4 columns) with custom height */}
            <div className="lg:col-span-4">
              <ArticleCard article={featuredArticles[1]} size="medium" customImageHeight="h-80" />
            </div>
          </div>

          {/* Second Row - 4 Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.slice(2, 6).map((article) => (
              <ArticleCard key={article.id} article={article} size="small" />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/articles">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Lihat Semua Artikel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mid Banner Ad - This section will trigger the poll modal */}
      <section className="py-6 px-[10%] bg-gray-100">
        <AdBanner size="large" />
      </section>

      {/* Enhanced Featured Videos Section */}
      <section className="py-20 px-[10%] bg-white">
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Play className="h-4 w-4" />
              Video Unggulan
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tonton &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Belajar
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Koleksi lengkap tutorial agile, studi kasus, dan wawasan ahli
            </p>
          </div>

          {/* Videos Grid - 4 per row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={handleVideoPlay} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/videos">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Lihat Semua Video
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Poll Section */}
      {/* Features Section */}

      {/* Enhanced CTA Section */}
      <section className="py-20 px-[10%] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="w-full h-full bg-white bg-opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
        </div>

        <div className="text-center relative z-10">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Bergabung dengan Komunitas Agile Kami</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
              Terhubung dengan sesama praktisi, berbagi pengalaman, dan tetap update dengan metodologi agile terbaru.
              Jadilah bagian dari komunitas agile terdepan di Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Hubungi Kami
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lihat Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isVideoModalOpen} onClose={handleVideoModalClose} />

      {/* Poll Modal */}
      <PollModal poll={featuredPoll} isOpen={isPollModalOpen} onClose={handlePollModalClose} />

      <Footer />
    </div>
  )
}
