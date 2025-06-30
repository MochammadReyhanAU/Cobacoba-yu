"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Clock,
  User,
  Eye,
  MessageCircle,
  Star,
  Calendar,
  Share2,
  Bookmark,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Volume2,
} from "lucide-react"
import Image from "next/image"
import { ArticleCard } from "@/components/article-card"
import { AdBanner } from "@/components/ad-banner"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import PDFViewer from "@/components/pdf-viewer"
import { PollModal } from "@/components/poll-modal" // Import PollModal

// Mock data - in real app this would come from API/database

// Mock data - in real app this would come from API/database
const articles = [
  {
    id: 1,
    title: "Digital Body Language - Bagian 1",
    content: `
      <p>Dalam era digital yang semakin berkembang pesat, komunikasi non-verbal atau yang sering disebut sebagai "body language" mengalami transformasi yang signifikan. Digital body language menjadi aspek penting dalam komunikasi modern, terutama dalam konteks remote work dan kolaborasi virtual.</p>
      
      <h2>Apa itu Digital Body Language?</h2>
      <p>Digital body language merujuk pada cara kita berkomunikasi melalui platform digital - mulai dari email, chat, video call, hingga media sosial. Ini mencakup timing respons, pilihan kata, penggunaan emoji, dan bahkan cara kita mengatur background dalam video call.</p>
      
      <h2>Mengapa Digital Body Language Penting?</h2>
      <p>Dalam komunikasi tatap muka, kita dapat membaca ekspresi wajah, gestur tubuh, dan nada suara. Namun dalam komunikasi digital, kita kehilangan sebagian besar sinyal non-verbal tersebut. Oleh karena itu, digital body language menjadi pengganti yang crucial untuk memahami maksud dan emosi lawan bicara.</p>
      
      <h2>Elemen-elemen Digital Body Language</h2>
      <ul>
        <li><strong>Response Time:</strong> Seberapa cepat Anda merespons pesan menunjukkan prioritas dan perhatian</li>
        <li><strong>Tone of Writing:</strong> Pilihan kata dan struktur kalimat mencerminkan mood dan sikap</li>
        <li><strong>Emoji dan Punctuation:</strong> Penggunaan emoticon dan tanda baca memberikan konteks emosional</li>
        <li><strong>Video Call Behavior:</strong> Posisi kamera, background, dan engagement level</li>
      </ul>
      
      <h2>Tips Mengoptimalkan Digital Body Language</h2>
      <p>Untuk meningkatkan efektivitas komunikasi digital, perhatikan hal-hal berikut:</p>
      <ol>
        <li>Berikan respons yang tepat waktu sesuai konteks</li>
        <li>Gunakan bahasa yang jelas dan positif</li>
        <li>Manfaatkan emoji secara bijak untuk menambah konteks emosional</li>
        <li>Dalam video call, pastikan pencahayaan dan audio yang baik</li>
        <li>Tunjukkan engagement melalui partisipasi aktif</li>
      </ol>
      
      <p>Digital body language akan terus berkembang seiring dengan evolusi teknologi komunikasi. Memahami dan menguasai aspek ini akan memberikan keunggulan kompetitif dalam era kerja hybrid dan remote yang semakin dominan.</p>
    `,
    author: "Dani Pradana",
    authorBio:
      "Senior Agile Coach dengan pengalaman 10+ tahun dalam transformasi digital dan manajemen tim remote. Passionate tentang komunikasi efektif dalam era digital.",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "7 Mei 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    readTime: "5 menit",
    views: "2.1K",
    comments: 12,
    rating: 4.8,
    featured: true,
    status: "approved",
    submittedDate: "6 Mei 2023",
    approvedDate: "7 Mei 2023",
    pdfDocument: {
      name: "digital-body-language-presentation.pdf",
      size: 5242880,
      downloadUrl: "blob:mock-pdf-url-1",
      uploadDate: "2023-05-06T10:30:00.000Z",
      savedUrl: "https://api.agilenesia.id/files/articles/1683361800000-digital-body-language-presentation.pdf",
    },
  },
  {
    id: 2,
    title: "Digital Body Language - Bagian 2: Teknik Lanjutan",
    content: `
      <p>Melanjutkan pembahasan dari bagian pertama, kita akan mendalami teknik-teknik advanced dalam digital body language yang dapat meningkatkan efektivitas komunikasi tim secara signifikan.</p>
      
      <h2>Strategi Komunikasi Digital Lanjutan</h2>
      <p>Dalam bagian kedua ini, kita akan membahas strategi komunikasi digital yang lebih kompleks dan nuanced, termasuk bagaimana membaca konteks yang tersembunyi dalam komunikasi digital.</p>
      
      <h2>Microexpressions dalam Konteks Digital</h2>
      <p>Sama seperti microexpressions dalam komunikasi tatap muka, digital communication juga memiliki "micro-signals" yang dapat memberikan insight tentang kondisi emosional dan mental lawan bicara.</p>
      
      <h2>Pertimbangan Budaya</h2>
      <p>Digital body language juga dipengaruhi oleh faktor budaya. Apa yang dianggap sopan dalam satu budaya mungkin dianggap kasar dalam budaya lain, terutama dalam konteks timing respons dan formalitas bahasa.</p>
      
      <h2>Tools dan Teknologi</h2>
      <p>Berbagai tools dan teknologi dapat membantu kita dalam mengoptimalkan digital body language, mulai dari scheduling tools hingga sentiment analysis dalam komunikasi tim.</p>
      
      <p>Dengan memahami aspek-aspek advanced ini, kita dapat menjadi komunikator digital yang lebih efektif dan empathetic dalam era remote work yang terus berkembang.</p>
    `,
    author: "Dani Pradana",
    authorBio:
      "Senior Agile Coach dengan pengalaman 10+ tahun dalam transformasi digital dan manajemen tim remote. Passionate tentang komunikasi efektif dalam era digital.",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "10 Mei 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    readTime: "6 menit",
    views: "1.8K",
    comments: 8,
    rating: 4.9,
    featured: true,
    status: "approved",
    submittedDate: "9 Mei 2023",
    approvedDate: "10 Mei 2023",
    pdfDocument: null, // No PDF for this article
  },
  {
    id: 3,
    title: "Agile vs Fragile: Membedah Perbedaan Tim yang Sehat dan Tim yang Hancur",
    content: `
      <p>Dalam dunia pengembangan software dan manajemen proyek, perbedaan antara tim yang "agile" dan "fragile" sangatlah signifikan. Tim yang agile mampu beradaptasi dengan perubahan, sementara tim yang fragile mudah hancur ketika menghadapi tekanan.</p>
      
      <h2>Karakteristik Tim Agile</h2>
      <p>Tim yang agile memiliki beberapa karakteristik kunci yang membedakannya dari tim yang fragile. Mereka memiliki komunikasi yang terbuka, kemampuan adaptasi yang tinggi, dan fokus pada pembelajaran berkelanjutan.</p>
      
      <h2>Tanda-tanda Tim Fragile</h2>
      <p>Tim yang fragile seringkali menunjukkan tanda-tanda seperti resistensi terhadap perubahan, komunikasi yang buruk, dan kurangnya transparansi dalam proses kerja.</p>
      
      <h2>Strategi Transformasi</h2>
      <p>Mengubah tim yang fragile menjadi agile memerlukan pendekatan yang sistematis dan berkelanjutan. Ini melibatkan perubahan mindset, proses, dan budaya kerja.</p>
    `,
    author: "Suparjo",
    authorBio:
      "Agile Transformation Consultant dengan pengalaman membantu berbagai organisasi dalam implementasi metodologi agile.",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "4 Mei 2023",
    category: "Manajemen Tim",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    readTime: "8 menit",
    views: "1.8K",
    comments: 15,
    rating: 4.7,
    featured: true,
    status: "approved",
    submittedDate: "3 Mei 2023",
    approvedDate: "4 Mei 2023",
  },
  {
    id: 5,
    title: "Advanced Scrum Techniques for Large Teams",
    content: `
      <p>Mengelola tim Scrum yang besar memerlukan pendekatan khusus dan teknik-teknik advanced yang berbeda dari tim kecil. Artikel ini membahas strategi dan best practices untuk scaling Scrum.</p>
      
      <h2>Challenges dalam Large Scale Scrum</h2>
      <p>Tim besar menghadapi tantangan komunikasi, koordinasi, dan sinkronisasi yang tidak ada dalam tim kecil. Dependency management menjadi krusial.</p>
      
      <h2>Scaling Frameworks</h2>
      <p>Berbagai framework seperti SAFe, LeSS, dan Nexus menawarkan solusi untuk scaling Scrum dengan pendekatan yang berbeda-beda.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Scrum of Scrums untuk koordinasi antar tim</li>
        <li>Shared Definition of Done</li>
        <li>Cross-team retrospectives</li>
        <li>Architectural runway management</li>
      </ul>
    `,
    author: "John Doe",
    authorBio: "Experienced Scrum Master and Agile Coach specializing in large-scale transformations.",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "12 Mei 2023",
    category: "Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop",
    readTime: "10 menit",
    views: "0",
    comments: 0,
    rating: 0,
    featured: false,
    status: "pending",
    submittedDate: "12 Mei 2023",
  },
]

const initialComments = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    date: "2 hari yang lalu",
    content:
      "Artikel yang sangat insightful! Digital body language memang sering diabaikan padahal sangat penting dalam komunikasi remote work.",
  },
  {
    id: 2,
    author: "Ahmad Rizki",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    date: "3 hari yang lalu",
    content:
      "Tips yang diberikan sangat praktis. Saya sudah mulai menerapkan beberapa poin dan hasilnya terasa dalam komunikasi tim.",
  },
  {
    id: 3,
    author: "Maya Sari",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    date: "1 minggu yang lalu",
    content: "Menunggu bagian 2 dari artikel ini. Apakah akan membahas lebih detail tentang video call etiquette?",
  },
]

const latestArticles = [
  {
    id: 7,
    title: "Scrum Master: Peran dan Tanggung Jawab dalam Tim Agile",
    excerpt: "Memahami peran krusial Scrum Master dalam memfasilitasi tim dan menghilangkan hambatan",
    author: "Ahmad Rizki",
    date: "10 Apr 2023",
    category: "Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    readTime: "6 menit",
    views: "1.7K",
  },
  {
    id: 8,
    title: "Product Owner vs Product Manager: Memahami Perbedaan Peran",
    excerpt: "Analisis mendalam tentang perbedaan dan kesamaan antara Product Owner dan Product Manager",
    author: "Minarni",
    date: "8 Apr 2023",
    category: "Manajemen Produk",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    readTime: "7 menit",
    views: "1.9K",
  },
  {
    id: 9,
    title: "Sprint Retrospective: Teknik dan Best Practices",
    excerpt: "Panduan lengkap untuk menjalankan sprint retrospective yang efektif dan produktif",
    author: "Suparjo",
    date: "5 Apr 2023",
    category: "Manajemen Sprint",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=300&fit=crop",
    readTime: "8 menit",
    views: "2.2K",
  },
]

const recommendedArticles = [
  {
    id: 10,
    title: "Remote Team Communication: Strategi Efektif",
    excerpt: "Strategi komunikasi yang terbukti efektif untuk tim remote dan hybrid",
    author: "Dani Pradana",
    date: "3 Apr 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    readTime: "6 menit",
    views: "1.8K",
  },
  {
    id: 11,
    title: "Digital Transformation dalam Agile Environment",
    excerpt: "Bagaimana menerapkan transformasi digital dengan pendekatan agile yang efektif",
    author: "Ahmad Rizki",
    date: "1 Apr 2023",
    category: "Transformasi Digital",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    readTime: "9 menit",
    views: "2.5K",
  },
  {
    id: 12,
    title: "Effective Virtual Meetings: Tips dan Tricks",
    excerpt: "Panduan praktis untuk menjalankan meeting virtual yang produktif dan engaging",
    author: "Maya Sari",
    date: "28 Mar 2023",
    category: "Komunikasi",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    readTime: "5 menit",
    views: "1.6K",
  },
]

// Mock poll data for article detail page
const articleDetailPagePoll = {
  id: "article-detail-poll-1",
  question: "Apakah artikel ini membantu Anda memahami konsep Digital Body Language?",
  options: [
    { id: "ap1a", text: "Sangat membantu", votes: 75 },
    { id: "ap1b", text: "Cukup membantu", votes: 20 },
    { id: "ap1c", text: "Kurang membantu", votes: 5 },
  ],
  totalVotes: 100,
  category: "Feedback Artikel",
  isActive: true,
  endDate: "2025-12-31",
}

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  const [isPollModalOpen, setIsPollModalOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0) // State to store scroll position
  const authorBioRef = useRef<HTMLElement>(null) // Ref for the author bio section
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [currentComments, setCurrentComments] = useState(initialComments) // Make comments stateful
  const commentSectionRef = useRef<HTMLDivElement>(null) // Ref for the comment section

  // New useEffect for Intersection Observer on author bio
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
            if (!seenPolls.includes(articleDetailPagePoll.id)) {
              // Store current scroll position before opening modal
              setScrollPosition(window.scrollY)
              setIsPollModalOpen(true)
            }
            observer.disconnect() // Disconnect after first trigger
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      },
    )

    if (authorBioRef.current) {
      observer.observe(authorBioRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleOpenPollModal = () => {
    if (!user) {
      // Add login check here
      toast({
        title: "Login Required",
        description: "Silakan login untuk berpartisipasi dalam polling.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }
    setScrollPosition(window.scrollY) // Store current scroll position
    setIsPollModalOpen(true)
  }

  const handleClosePollModal = () => {
    setIsPollModalOpen(false)
    // Restore scroll position after modal closes and DOM updates
    setTimeout(() => {
      window.scrollTo(0, scrollPosition)
    }, 0)
  }

  // Initialize saved articles from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles") || "[]")
    setSavedArticles(saved.map((article: any) => article.id))
  }, [])

  const currentId = Number.parseInt(params.id as string)
  const currentArticle = articles.find((article) => article.id === currentId) || articles[0]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Published</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleTextToSpeech = () => {
    if (!("speechSynthesis" in window)) {
      toast({
        title: "Not supported",
        description: "Text-to-speech tidak didukung di browser ini.",
      })
      return
    }

    if (isSpeaking) {
      // Stop current speech
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      toast({
        title: "Speech stopped",
        description: "Text-to-speech dihentikan.",
      })
      return
    }

    // Extract text content from HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = currentArticle.content
    const textContent = tempDiv.textContent || tempDiv.innerText || ""

    // Create speech content
    const speechText = `${currentArticle.title}. ${textContent}`

    const utterance = new SpeechSynthesisUtterance(speechText)
    utterance.lang = "id-ID"
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => {
      setIsSpeaking(true)
      toast({
        variant: "success",
        title: "Speech started",
        description: "Memulai text-to-speech untuk artikel ini.",
      })
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      toast({
        title: "Speech error",
        description: "Terjadi kesalahan saat text-to-speech.",
      })
    }

    window.speechSynthesis.speak(utterance)
  }

  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Silakan login untuk meninggalkan komentar.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (commentText.trim() === "") {
      toast({
        title: "Komentar kosong",
        description: "Silakan tulis komentar Anda sebelum mengirim.",
      })
      return
    }

    // Simulate API call
    console.log("Submitting comment:", commentText)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Shorter delay for better UX

    const newComment = {
      id: currentComments.length + 1, // Simple ID generation
      author: user.name || "Anonymous", // Use actual user name if available
      avatar: user.avatar || "/placeholder.svg",
      date: "Baru saja",
      content: commentText,
    }

    setCurrentComments((prevComments) => [...prevComments, newComment]) // Update state
    setCommentText("") // Clear the input

    toast({
      variant: "success",
      title: "Komentar terkirim!",
      description: "Terima kasih atas komentar Anda.",
    })

    // Scroll to the new comment after it's rendered
    setTimeout(() => {
      if (commentSectionRef.current) {
        commentSectionRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }, 100)
  }

  const handlePreviousArticle = () => {
    const prevId = currentId > 1 ? currentId - 1 : articles.length
    router.push(`/articles/${prevId}`)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const handleNextArticle = () => {
    const nextId = currentId < articles.length ? currentId + 1 : 1
    router.push(`/articles/${nextId}`)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const ArticleContent = ({
    articleData,
    showComments = true,
    showNavigation = true,
    showFullSections = true,
  }: {
    articleData: (typeof articles)[0]
    showComments?: boolean
    showNavigation?: boolean
    showFullSections?: boolean
  }) => (
    <div>
      {/* Article Header with Cover Image */}
      <section className="py-8 bg-white">
        <div className="px-[10%]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700">{articleData.category}</Badge>
              {articleData.featured && (
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Unggulan</Badge>
              )}
              {getStatusBadge(articleData.status)}
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight flex-1">{articleData.title}</h1>
            </div>

            {/* Article Status Information */}
            {articleData.status !== "approved" && (
              <Card className="border-l-4 border-l-yellow-400 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Article Status Information</h3>
                      <div className="text-sm text-yellow-700 mt-1">
                        {articleData.status === "pending" && (
                          <p>This article is currently under review by our editorial team.</p>
                        )}
                        {articleData.status === "draft" && <p>This article is still in draft mode.</p>}
                        {articleData.status === "rejected" && (
                          <p>This article was rejected and needs revision before republication.</p>
                        )}
                        <p className="mt-1">Submitted: {articleData.submittedDate}</p>
                        {articleData.approvedDate && <p>Approved: {articleData.approvedDate}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{articleData.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{articleData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{articleData.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{articleData.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{articleData.comments} komentar</span>
                </div>
                {articleData.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{articleData.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleTextToSpeech}>
                  <Volume2 className={`h-4 w-4 mr-2 ${isSpeaking ? "text-red-600" : ""}`} />
                  {isSpeaking ? "Stop TTS" : "Text to Speech"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const shareData = {
                      title: articleData.title,
                      text: articleData.excerpt || articleData.title,
                      url: window.location.href,
                    }

                    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                      navigator.share(shareData).catch((error) => {
                        console.error("Error sharing:", error)
                        // Fallback to clipboard
                        navigator.clipboard.writeText(window.location.href).then(() => {
                          toast({
                            variant: "success",
                            title: "Link copied!",
                            description: "Article link has been copied to clipboard.",
                          })
                        })
                      })
                    } else {
                      // Fallback to clipboard
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => {
                          toast({
                            variant: "success",
                            title: "Link copied!",
                            description: "Article link has been copied to clipboard.",
                          })
                        })
                        .catch(() => {
                          toast({
                            title: "Share failed",
                            description: "Unable to share or copy link.",
                          })
                        })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
                <Button
                  variant={savedArticles.includes(articleData.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: "Login Required",
                        description: "Silakan login untuk menyimpan artikel.",
                        variant: "destructive",
                      })
                      router.push("/auth/login")
                      return
                    }
                    const saved = JSON.parse(localStorage.getItem("savedArticles") || "[]")
                    const isCurrentlySaved = savedArticles.includes(articleData.id)

                    if (isCurrentlySaved) {
                      // Remove from saved
                      const updatedSaved = saved.filter((article: any) => article.id !== articleData.id)
                      localStorage.setItem("savedArticles", JSON.stringify(updatedSaved))
                      setSavedArticles((prev) => prev.filter((id) => id !== articleData.id))
                      toast({
                        title: "Article removed",
                        description: "Article has been removed from your saved list.",
                      })
                    } else {
                      // Add to saved
                      const articleToSave = {
                        id: articleData.id,
                        title: articleData.title,
                        author: articleData.author,
                        date: articleData.date,
                        image: articleData.image,
                      }
                      saved.push(articleToSave)
                      localStorage.setItem("savedArticles", JSON.stringify(saved))
                      setSavedArticles((prev) => [...prev, articleData.id])
                      toast({
                        variant: "success",
                        title: "Article saved!",
                        description: "Article has been added to your saved list.",
                      })
                    }
                  }}
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${savedArticles.includes(articleData.id) ? "fill-current" : ""}`}
                  />
                  {savedArticles.includes(articleData.id) ? "Saved" : "Simpan"}
                </Button>
              </div>
            </div>

            {/* Cover Image */}
            <Image
              src={articleData.image || "/placeholder.svg"}
              alt={articleData.title}
              width={800}
              height={400}
              className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-[10%]">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Article Content - 3 columns */}
          <div className="lg:col-span-3">
            <div className="article-content max-w-none">
              <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
            </div>

            {/* PDF Document Viewer */}
            {articleData.pdfDocument && (
              <div className="mt-12">
                <PDFViewer pdfUrl={articleData.pdfDocument.downloadUrl} fileName={articleData.pdfDocument.name} />
              </div>
            )}

            {/* New Poll Info Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BarChart3 className="h-4 w-4" />
                Polling Artikel
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Berikan Masukan Anda</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
                Bantu kami meningkatkan kualitas konten artikel dengan mengisi polling singkat ini.
              </p>
              <Button
                size="lg"
                onClick={handleOpenPollModal} // Use the new handler here
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Isi Polling Sekarang
              </Button>
            </div>
          </div>

          {/* Sidebar with Ads - 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner size="sidebar" />
            <AdBanner size="sidebar" />
            <AdBanner size="sidebar" />
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section ref={authorBioRef} className="py-8 px-[10%] bg-white">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={articleData.authorAvatar || "/placeholder.svg"} alt={articleData.author} />
                <AvatarFallback>
                  {articleData.author
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tentang {articleData.author}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{articleData.authorBio}</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Ikuti
                  </Button>
                  <Button variant="outline" size="sm">
                    Lihat Profil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation */}
      {showNavigation && (
        <section className="py-8 px-[10%]">
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={handlePreviousArticle}
              variant="outline"
              className="flex items-center gap-4 text-blue-600 hover:text-blue-700 group px-6 py-4 h-auto max-w-xs"
            >
              <ArrowRight className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-sm text-gray-500 mb-1">Artikel Sebelumnya</p>
                <p className="font-medium text-sm truncate">
                  {articles.find((a) => a.id === (currentId > 1 ? currentId - 1 : articles.length))?.title ||
                    "Artikel Sebelumnya"}
                </p>
              </div>
            </Button>

            <Button
              onClick={handleNextArticle}
              variant="outline"
              className="flex items-center gap-4 text-blue-600 hover:text-blue-700 group px-6 py-4 h-auto max-w-xs"
            >
              <div className="text-right min-w-0">
                <p className="text-sm text-gray-500 mb-1">Artikel Selanjutnya</p>
                <p className="font-medium text-sm truncate">
                  {articles.find((a) => a.id === (currentId < articles.length ? currentId + 1 : articles.length))
                    ?.title || "Artikel Selanjutnya"}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>
          </div>
        </section>
      )}

      {/* Comments Section */}
      {showComments && currentArticle.status === "approved" && (
        <section ref={commentSectionRef} className="py-12 px-[10%] bg-white">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Komentar ({currentComments.length})</h2>
            </div>

            {/* Add Comment */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tinggalkan Komentar</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Bagikan pemikiran Anda tentang artikel ini..."
                    className="min-h-24"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmitComment}>
                      Kirim Komentar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {currentComments.map((comment) => (
                <Card key={comment.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                        <AvatarFallback>
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                            Balas
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                            Suka
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      {showFullSections && (
        <section className="py-16 px-[10%] bg-gray-50">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Artikel Terbaru
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Artikel Terbaru</h2>
            <p className="text-xl text-gray-600">Tetap update dengan konten terbaru kami</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Articles Section */}
      {showFullSections && (
        <section className="py-16 px-[10%] bg-white">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              Rekomendasi untuk Anda
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Artikel Rekomendasi</h2>
            <p className="text-xl text-gray-600">Artikel yang mungkin menarik untuk Anda</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} size="medium" />
            ))}
          </div>
        </section>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Article */}
      <ArticleContent
        articleData={currentArticle}
        showComments={true} // Always show comments now
        showFullSections={true} // Always show full sections
        showNavigation={true} // Always show navigation
      />

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      <Footer />

      {/* Poll Modal for Article Detail Page */}
      <PollModal poll={articleDetailPagePoll} isOpen={isPollModalOpen} onClose={handleClosePollModal} />
    </div>
  )
}
