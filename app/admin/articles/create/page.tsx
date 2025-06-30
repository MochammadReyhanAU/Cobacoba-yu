"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  file: File
  name: string
  size: number
  downloadUrl: string
  uploadDate: string
}

interface PDFFile {
  file: File
  name: string
  size: number
  downloadUrl: string
  uploadDate: string
}

export default function CreateArticlePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="py-20 px-[10%] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda harus login untuk membuat artikel.</p>
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

      // Simulate saving the files to server
      const articleId = Date.now()

      if (formData.content) {
        const savedFileData = {
          ...formData.content,
          savedUrl: `https://api.agilenesia.id/files/articles/${articleId}-${formData.content.name}`,
        }
        localStorage.setItem(`article-${articleId}-content`, JSON.stringify(savedFileData))
      }

      if (formData.pdfDocument) {
        const savedPDFData = {
          ...formData.pdfDocument,
          savedUrl: `https://api.agilenesia.id/files/articles/${articleId}-${formData.pdfDocument.name}`,
        }
        localStorage.setItem(`article-${articleId}-pdf`, JSON.stringify(savedPDFData))
      }

      const articleData = {
        ...formData,
        id: articleId,
        author: user.name,
        authorId: user.id,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Article data:", articleData)

      toast({
        variant: "success",
        title: formData.status === "draft" ? "Draft saved!" : "Article submitted!",
        description:
          formData.status === "draft"
            ? "Your article has been saved as draft."
            : "Your article has been submitted for review.",
      })

      router.push("/admin/articles")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
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
        description: "File DOCX berhasil diupload dan siap untuk didownload.",
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
        description: "File PDF berhasil diupload dan akan ditampilkan di artikel.",
      })
    }
  }

  const handleDownloadContent = () => {
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
        description: "File DOCX sedang didownload.",
      })
    }
  }

  const handleDownloadPDF = () => {
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
        description: "File PDF sedang didownload.",
      })
    }
  }

  const handleTextToSpeech = (content: string, fileName: string) => {
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
    File konten: ${fileName} telah diupload dan siap untuk diproses.`

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
              <h1 className="text-3xl font-bold text-gray-900">Buat Artikel Baru</h1>
              <p className="text-gray-600 mt-2">Tulis dan bagikan pengetahuan Anda</p>
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
                  {/* DOCX Content */}
                  <div>
                    <Label htmlFor="content-upload">File Konten Artikel (DOCX) *</Label>
                    <div className="mt-1">
                      {formData.content ? (
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
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
                                  handleTextToSpeech(formData.content?.name || "", formData.content?.name || "")
                                }
                                disabled={!formData.title && !formData.excerpt}
                              >
                                <Volume2 className={`h-4 w-4 mr-1 ${isSpeaking ? "text-red-600" : ""}`} />
                                {isSpeaking ? "Stop" : "TTS"}
                              </Button>
                              <Button type="button" variant="outline" size="sm" onClick={handleDownloadContent}>
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
                          <div className="text-xs text-gray-500">
                            <p>Diupload: {new Date(formData.content.uploadDate).toLocaleString("id-ID")}</p>
                            <p className="mt-1">✅ File tersimpan dan dapat didownload kapan saja</p>
                          </div>
                        </div>
                      ) : (
                        <Label htmlFor="content-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">Upload File Konten Artikel</p>
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
                    <p className="text-sm text-gray-500 mt-2">
                      Upload file DOCX yang berisi konten artikel lengkap. File akan disimpan dan dapat didownload
                      kembali.
                    </p>
                  </div>

                  {/* PDF Document */}
                  <div>
                    <Label htmlFor="pdf-upload">Dokumen PDF (Opsional)</Label>
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
                              <Button type="button" variant="outline" size="sm" onClick={handleDownloadPDF}>
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
                            <p className="mt-1">
                              📄 PDF akan ditampilkan sebagai dokumen yang dapat dislide di artikel
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Label htmlFor="pdf-upload" className="cursor-pointer">
                          <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                            <File className="h-10 w-10 mx-auto text-red-400 mb-3" />
                            <p className="text-base font-medium text-gray-900 mb-2">Upload Dokumen PDF</p>
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
                      Upload file PDF yang akan ditampilkan sebagai dokumen yang dapat dislide oleh pembaca di halaman
                      artikel. Cocok untuk presentasi, laporan, atau dokumen pendukung.
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
                    disabled={isSubmitting || !formData.title || !formData.content}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      "Mengirim..."
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Submit untuk Review
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleInputChange("status", "draft")}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting && formData.status === "draft" ? (
                      "Menyimpan..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Simpan sebagai Draft
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 mt-4">
                    <p>• Artikel akan direview oleh admin sebelum dipublikasi</p>
                    <p>• Draft dapat diedit kapan saja</p>
                    <p>• File DOCX dan PDF tersimpan dan dapat didownload</p>
                    <p>• PDF akan ditampilkan sebagai dokumen slide</p>
                    <p>• Semua field bertanda * wajib diisi</p>
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
