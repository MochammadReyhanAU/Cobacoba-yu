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
import { ArrowLeft, Eye, Upload, Link } from "lucide-react"
import Image from "next/image"

const categories = [
  "Kuis PMP",
  "Scrum",
  "Kanban",
  "Perencanaan Sprint",
  "Manajemen Tim",
  "Transformasi Digital",
  "Di Balik Layar",
]

// Mock video data
const mockVideos = [
  {
    id: 1,
    title: "Project Integration Management (2)",
    description: "Kuis PMP - Project Integration Management panduan lengkap untuk sertifikasi profesional",
    category: "Kuis PMP",
    featured: true,
    duration: "15:30",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    author: "Tim Agilenesia",
    status: "approved",
  },
  {
    id: 3,
    title: "Advanced Scrum Techniques",
    description: "Teknik-teknik advanced untuk mengelola tim Scrum yang besar dan kompleks",
    category: "Scrum",
    featured: false,
    duration: "25:00",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    author: "Suparjo",
    status: "pending",
  },
]

export default function EditVideoPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams()
  const videoId = Number.parseInt(params.id as string)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    featured: false,
    duration: "",
    youtubeUrl: "",
    thumbnail: "",
    status: "draft",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load video data
  useEffect(() => {
    const loadVideo = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const video = mockVideos.find((v) => v.id === videoId)
        if (video) {
          setFormData({
            title: video.title,
            description: video.description,
            category: video.category,
            featured: video.featured,
            duration: video.duration,
            youtubeUrl: video.youtubeUrl,
            thumbnail: video.thumbnail,
            status: video.status || "draft",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load video data.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadVideo()
  }, [videoId, toast])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="py-20 px-[10%] text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda harus login untuk mengedit video.</p>
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
          <p className="text-gray-600 mt-4">Loading video...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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

      const videoData = {
        ...formData,
        id: videoId,
        author: user.name,
        authorId: user.id,
        status: formData.status,
        updatedAt: new Date().toISOString(),
      }

      console.log("Updated video data:", videoData)

      toast({
        variant: "success",
        title: "Video updated!",
        description: "Your video has been updated.",
      })

      router.push("/admin/videos")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a service like Cloudinary or AWS S3
      const imageUrl = URL.createObjectURL(file)
      handleInputChange("thumbnail", imageUrl)
    }
  }

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const generateThumbnailFromYouTube = (url: string) => {
    const videoId = extractYouTubeId(url)
    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      handleInputChange("thumbnail", thumbnailUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="py-8 px-[10%]">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/videos")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Video</h1>
              <p className="text-gray-600 mt-2">Perbarui informasi video Anda</p>
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
                    <Label htmlFor="title">Judul Video *</Label>
                    <Input
                      id="title"
                      placeholder="Masukkan judul video yang menarik..."
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea
                      id="description"
                      placeholder="Tulis deskripsi video (maksimal 500 karakter)..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-1 min-h-24"
                      maxLength={500}
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 karakter</p>
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
                      <Label htmlFor="duration">Durasi Video</Label>
                      <Input
                        id="duration"
                        placeholder="15:30"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
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
                    <Label htmlFor="featured">Tandai sebagai video unggulan</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Video URL */}
              <Card>
                <CardHeader>
                  <CardTitle>Video URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="youtubeUrl"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={formData.youtubeUrl}
                        onChange={(e) => handleInputChange("youtubeUrl", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => generateThumbnailFromYouTube(formData.youtubeUrl)}
                        disabled={!formData.youtubeUrl}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Generate Thumbnail
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Masukkan URL YouTube video Anda. Thumbnail akan otomatis diambil dari YouTube.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Thumbnail */}
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.thumbnail && (
                      <div className="relative aspect-video">
                        <Image
                          src={formData.thumbnail || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Klik untuk upload thumbnail custom</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 5MB</p>
                        </div>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
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
                    disabled={isSubmitting || !formData.title || !formData.youtubeUrl}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      "Updating..."
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Update
                      </>
                    )}
                  </Button>
                  <div className="text-xs text-gray-500 mt-4">
                    <p>• Changes will be reviewed by admin before publication</p>
                    <p>• Draft can be edited anytime</p>
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
