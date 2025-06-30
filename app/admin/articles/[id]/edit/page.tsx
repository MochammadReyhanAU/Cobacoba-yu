"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, Upload, Download, FileText, File, Volume2 } from "lucide-react"
import Image from "next/image"

const categories = [
  "Komunikasi",
  "Manajemen Tim",
  "Scrum",
  "Manajemen Produk",
  "Manajemen Sprint",
  "Transformasi Digital",
  "Pendidikan",
]

interface ContentFile {
  file?: File
  name: string
  size: number
  downloadUrl: string
  uploadDate: string
  savedUrl?: string
}

interface PDFFile {
  file?: File
  name: string
  size: number
  downloadUrl: string
  uploadDate: string
  savedUrl?: string
}

// Mock article data - in real app this would come from API
const mockArticles = [
  {
    id: 1,
    title: "Digital Body Language - Bagian 1",
    excerpt:
      "Dalam era digital yang semakin berkembang pesat, komunikasi non-verbal mengalami transformasi signifikan.",
    content: {
      name: "digital-body-language-part1.docx",
      size: 2048576, // 2MB
      downloadUrl: "blob:mock-url-1",
      uploadDate: "2023-05-06T10:00:00.000Z",
      savedUrl: "https://api.agilenesia.id/files/articles/1683360000000-digital-body-language-part1.docx",
    },
    pdfDocument: {
      name: "digital-body-language-presentation.pdf",
      size: 5242880, // 5MB
      downloadUrl: "blob:mock-pdf-url-1",
      uploadDate: "2023-05-06T10:30:00.000Z",
      savedUrl: "https://api.agilenesia.id/files/articles/1683361800000-digital-body-language-presentation.pdf",
    },
    category: "Komunikasi",
    featured: true,
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    author: "Dani Pradana",
    status: "approved",
  },
  {
    id: 5,
    title: "Advanced Scrum Techniques for Large Teams",
    excerpt: "Teknik-teknik advanced untuk mengelola tim Scrum yang besar dan kompleks",
    content: {
      name: "advanced-scrum-techniques.docx",
      size: 3145728, // 3MB
      downloadUrl: "blob:mock-url-5",
      uploadDate: "2023-05-11T14:30:00.000Z",
      savedUrl: "https://api.agilenesia.id/files/articles/1683810600000-advanced-scrum-techniques.docx",
    },
    pdfDocument: null, // No PDF for this article
    category: "Scrum",
    featured: false,
    readTime: "10 menit",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop",
    author: "John Doe",
    status: "pending",
  },
]

export default function EditArticlePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams()
  const articleId = Number.parseInt(params.id as string)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: null as ContentFile | null,
    pdfDocument: null as PDFFile | null,
    category: "",
    featured: false,
    readTime: "",
    image: "",
    status: "draft",
  })

  const [existingContent, setExistingContent] = useState<ContentFile | null>(null)
  const [existingPDF, setExistingPDF] = useState<PDFFile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Load article data
  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const article = mockArticles.find((a) => a.id === articleId)
        if (article) {
          // Create mock blobs for existing files
          const mockContentBlob = new Blob(["Mock DOCX content"], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
          const mockContentDownloadUrl = URL.createObjectURL(mockContentBlob)

          const existingContentFile: ContentFile = {
            name: article.content.name,
            size: article.content.size,
            downloadUrl: mockContentDownloadUrl,
            uploadDate: article.content.uploadDate,
            savedUrl: article.content.savedUrl,
          }

          setExistingContent(existingContentFile)

          // Handle PDF if exists
          if (article.pdfDocument) {
            const mockPDFBlob = new Blob(["Mock PDF content"], {
              type: "application/pdf",
            })
            const mockPDFDownloadUrl = URL.createObjectURL(mockPDFBlob)

            const existingPDFFile: PDFFile = {
              name: article.pdfDocument.name,
              size: article.pdfDocument.size,
              downloadUrl: mockPDFDownloadUrl,
              uploadDate: article.pdfDocument.uploadDate,
              savedUrl: article.pdfDocument.savedUrl,
            }

            setExistingPDF(existingPDFFile)
          }

          setFormData({
            title: article.title,
            excerpt: article.excerpt,
            content: null,
            pdfDocument: null,
            category: article.category,
            featured: article.featured,
            readTime: article.readTime,
            image: article.image,
            status: article.status || "draft",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load article data.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadArticle()
  }, [articleId, toast])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="py-20 px-[10%] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda harus login untuk mengedit artikel.</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="py-20 px-[10%] text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading article...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean | ContentFile | PDFFile | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate saving the new files if uploaded
      if (formData.content) {
        const savedFileData = {
          ...formData.content,
          savedUrl: `https://api.agilenesia.id/files/articles/${Date.now()}-${formData.content.name}`,
        }
        localStorage.setItem(`article-${articleId}-content`, JSON.stringify(savedFileData))
      }

      if (formData.pdfDocument) {
        const savedPDFData = {
          ...formData.pdfDocument,
          savedUrl: `https://api.agilenesia.id/files/articles/${Date.now()}-${formData.pdfDocument.name}`,
        }
        localStorage.setItem(`article-${articleId}-pdf`, JSON.stringify(savedPDFData))
      }

      const articleData = {
        ...formData,
        id: articleId,
        author: user.name,
        authorId: user.id,
        // If a new PDF was uploaded, it overwrites existing. If it was deleted, it's null.
        // If no new PDF, retain existing PDF.
        pdfDocument: formData.pdfDocument || existingPDF,
        status: formData.status,
        updatedAt: new Date().toISOString(),
      }

      console.log("Updated article data:", articleData)

      toast({
        variant: "success",
        title: "Article updated!",
        description: "Your article has been updated and submitted for review.",
      })

      router.push("/admin/articles")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setIsDraft(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      handleInputChange("image", imageUrl)
    }
  }

  const handleContentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith(".docx")) {
        toast({
          title: "Error",
          description: "Hanya file DOCX yang diperbolehkan.",
        })
        return
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file tidak boleh lebih dari 10MB.",
        })
        return
      }

      const downloadUrl = URL.createObjectURL(file)
      const contentFile: ContentFile = {
        file,
        name: file.name,
        size: file.size,
        downloadUrl,
        uploadDate: new Date().toISOString(),
      }

      handleInputChange("content", contentFile)

      toast({
        variant: "success",
        title: "File uploaded!",
        description: "File DOCX baru berhasil diupload dan akan mengganti konten yang ada.",
      })
    }
  }

  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        toast({
          title: "Error",
          description: "Hanya file PDF yang diperbolehkan.",
        })
        return
      }

      // Validate file size (20MB limit for PDF)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file PDF tidak boleh lebih dari 20MB.",
        })
        return
      }

      const downloadUrl = URL.createObjectURL(file)
      const pdfFile: PDFFile = {
        file,
        name: file.name,
        size: file.size,
        downloadUrl,
        uploadDate: new Date().toISOString(),
      }

      handleInputChange("pdfDocument", pdfFile)

      toast({
        variant: "success",
        title: "PDF uploaded!",
        description: "File PDF baru berhasil diupload dan akan ditampilkan di artikel.",
      })
    }
  }

  const handleDownloadExisting = () => {
    if (existingContent) {
      const link = document.createElement("a")
      link.href = existingContent.downloadUrl
      link.download = existingContent.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        variant: "success",
        title: "Download started!",
        description: "File DOCX yang ada sedang didownload.",
      })
    }
  }

  const handleDownloadExistingPDF = () => {
    if (existingPDF) {
      const link = document.createElement("a")
      link.href = existingPDF.downloadUrl
      link.download = existingPDF.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        variant: "success",
        title: "Download started!",
        description: "File PDF yang ada sedang didownload.",
      })
    }
  }

  const handleDownloadNew = () => {
    if (formData.content) {
      const link = document.createElement("a")
      link.href = formData.content.downloadUrl
      link.download = formData.content.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        variant: "success",
        title: "Download started!",
        description: "File DOCX baru sedang didownload.",
      })
    }
  }

  const handleDownloadNewPDF = () => {
    if (formData.pdfDocument) {
      const link = document.createElement("a")
      link.href = formData.pdfDocument.downloadUrl
      link.download = formData.pdfDocument.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        variant: "success",
        title: "Download started!",
        description: "File PDF baru sedang didownload.",
      })
    }
  }

  const handleTextToSpeech = (content: string, fileName: string, isExisting = false) => {
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

    // Create speech content based on available information
    const speechText = `Artikel berjudul: ${formData.title || "Belum ada judul"}. 
    Ringkasan: ${formData.excerpt || "Belum ada ringkasan"}. 
    Kategori: ${formData.category || "Belum dipilih"}. 
    File konten: ${fileName} ${isExisting ? "yang sudah ada" : "yang baru diupload"} siap untuk diproses.`

    const utterance = new SpeechSynthesisUtterance(speechText)
    utterance.lang = "id-ID"
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => {
      setIsSpeaking(true)
      toast({
        variant: "success",
        title: "Speech started",
        description: "Memulai text-to-speech untuk konten artikel.",
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="py-8 px-[10%]">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/articles")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
              <p className="text-gray-600 mt-2">Perbarui konten artikel Anda</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Artikel *</Label>
                    <Input
                      id="title"
                      placeholder="Masukkan judul artikel yang menarik..."
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Ringkasan *</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Tulis ringkasan singkat artikel (maksimal 200 karakter)..."
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      className="mt-1"
                      maxLength={200}
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/200 karakter</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategori *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="readTime">Estimasi Waktu Baca</Label>
                      <Input
                        id="readTime"
                        placeholder="5 menit"
                        value={formData.readTime}
                        onChange={(e) => handleInputChange("readTime", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                    <Label htmlFor="featured">Tandai sebagai artikel unggulan</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Konten Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing DOCX Content */}
                  {existingContent && !formData.content && (
                    <div>
                      <Label>File Konten Saat Ini</Label>
                      <div className="border border-green-300 rounded-lg p-4 bg-green-50 mt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-900">{existingContent.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(existingContent.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleTextToSpeech(existingContent.name, existingContent.name, true)}
                              disabled={!formData.title && !formData.excerpt}
                            >
                              <Volume2 className={`h-4 w-4 mr-1 ${isSpeaking ? "text-red-600" : ""}`} />
                              {isSpeaking ? "Stop" : "TTS"}
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={handleDownloadExisting}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p>Diupload: {new Date(existingContent.uploadDate).toLocaleString("id-ID")}</p>
                          <p className="mt-1">
                            ✅ File ini akan tetap digunakan jika tidak ada file baru yang diupload
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* New DOCX Content Upload */}
                  <div>
                    <Label htmlFor="content-upload">
                      {existingContent ? "Upload File Konten Baru (Opsional)" : "File Konten Artikel (DOCX) *"}
                    </Label>
                    <div className="mt-1">
                      {formData.content ? (
                        <div className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="text-sm font-medium text-gray-900">{formData.content.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(formData.content.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleTextToSpeech(formData.content?.name || "", formData.content?.name || "", false)
                                }
                                disabled={!formData.title && !formData.excerpt}
                              >
                                <Volume2 className={`h-4 w-4 mr-1 ${isSpeaking ? "text-red-600" : ""}`} />
                                {isSpeaking ? "Stop" : "TTS"}
                              </Button>
                              <Button type="button" variant="outline" size="sm" onClick={handleDownloadNew}>
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleInputChange("content", null)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>Diupload: {new Date(formData.content.uploadDate).toLocaleString("id-ID")}</p>
                            <p className="mt-1">🔄 File baru ini akan mengganti konten yang ada</p>
                          </div>
                        </div>
                      ) : (
                        <Label htmlFor="content-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">
                              {existingContent ? "Upload File Konten Baru" : "Upload File Konten Artikel"}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">Klik untuk memilih file DOCX</p>
                            <p className="text-xs text-gray-500">Maksimal 10MB</p>
                          </div>
                          <input
                            id="content-upload"
                            type="file"
                            accept=".docx"
                            onChange={handleContentUpload}
                            className="hidden"
                          />
                        </Label>
                      )}
                    </div>
                  </div>

                  {/* Existing PDF Document */}
                  {existingPDF && !formData.pdfDocument ? (
                    <div>
                      <Label>Dokumen PDF Saat Ini</Label>
                      <div className="border border-orange-300 rounded-lg p-4 bg-orange-50 mt-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <File className="h-5 w-5 text-orange-600" />
                            <span className="text-sm font-medium text-gray-900">{existingPDF.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(existingPDF.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button type="button" variant="outline" size="sm" onClick={handleDownloadExistingPDF}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setExistingPDF(null)
                                handleInputChange("pdfDocument", null)
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p>Diupload: {new Date(existingPDF.uploadDate).toLocaleString("id-ID")}</p>
                          <p className="mt-1">
                            📄 PDF ini akan tetap ditampilkan jika tidak ada file baru yang diupload
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* New PDF Document Upload */}
                  <div>
                    <Label htmlFor="pdf-upload">
                      {existingPDF ? "Upload Dokumen PDF Baru (Opsional)" : "Dokumen PDF (Opsional)"}
                    </Label>
                    <div className="mt-1">
                      {formData.pdfDocument ? (
                        <div className="border border-red-300 rounded-lg p-4 bg-red-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <File className="h-5 w-5 text-red-600" />
                              <span className="text-sm font-medium text-gray-900">{formData.pdfDocument.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(formData.pdfDocument.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button type="button" variant="outline" size="sm" onClick={handleDownloadNewPDF}>
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleInputChange("pdfDocument", null)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>Diupload: {new Date(formData.pdfDocument.uploadDate).toLocaleString("id-ID")}</p>
                            <p className="mt-1">🔄 PDF baru ini akan mengganti dokumen yang ada</p>
                          </div>
                        </div>
                      ) : (
                        <Label htmlFor="pdf-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                            <File className="h-10 w-10 mx-auto text-red-400 mb-3" />
                            <p className="text-base font-medium text-gray-900 mb-2">
                              {existingPDF ? "Upload Dokumen PDF Baru" : "Upload Dokumen PDF"}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">Klik untuk memilih file PDF</p>
                            <p className="text-xs text-gray-500">Maksimal 20MB</p>
                          </div>
                          <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handlePDFUpload}
                            className="hidden"
                          />
                        </Label>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {existingPDF
                        ? "Upload file PDF baru untuk mengganti dokumen yang ada. Jika tidak ada file baru, PDF lama akan tetap digunakan."
                        : "Upload file PDF yang akan ditampilkan sebagai dokumen yang dapat dislide oleh pembaca di halaman artikel."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Gambar Cover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="relative aspect-video">
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt="Cover preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Klik untuk upload gambar cover</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 5MB</p>
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || !formData.title}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      "Updating..."
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Update & Submit for Review
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleInputChange("status", "draft")}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting && isDraft ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 mt-4">
                    <p>• Changes will be reviewed by admin before publication</p>
                    <p>• Draft can be edited anytime</p>
                    <p>• File DOCX dan PDF tersimpan dan dapat didownload</p>
                    <p>• PDF akan ditampilkan sebagai dokumen slide</p>
                    <p>• All fields marked with * are required</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
