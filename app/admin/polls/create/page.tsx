"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PollOption {
  id: string
  text: string
}

export default function CreatePollPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [pollName, setPollName] = useState("")
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [endDate, setEndDate] = useState("")
  const [options, setOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ])
  const [associatedContentId, setAssociatedContentId] = useState<string | null>(null)
  const [associatedContentName, setAssociatedContentName] = useState<string | null>(null)

  const categories = ["Scrum", "Komunikasi", "Tools", "Agile", "Manajemen Tim", "Leadership"]
  const types = [
    { value: "page", label: "Halaman" },
    { value: "article", label: "Artikel" },
    { value: "video", label: "Video" },
    { value: "event", label: "Event" },
  ]

  const mockArticles = [
    { id: "art1", title: "Membangun Tim Agile yang Efektif" },
    { id: "art2", title: "Scrum vs Kanban: Mana yang Tepat untuk Anda?" },
    { id: "art3", title: "Pentingnya Retrospektif dalam Agile" },
  ]

  const mockVideos = [
    { id: "vid1", title: "Pengantar Agile dan Scrum" },
    { id: "vid2", title: "Daily Scrum Meeting Terbaik" },
    { id: "vid3", title: "Product Backlog Refinement" },
  ]

  const mockEvents = [
    { id: "evt1", title: "Webinar: Agile Leadership Summit 2024" },
    { id: "evt2", title: "Workshop: Certified Scrum Master" },
    { id: "evt3", title: "Meetup Komunitas Agile Jakarta" },
  ]

  const mockPages = [
    { id: "pg_home", title: "Beranda" },
    { id: "pg_about", title: "Tentang Kami" },
    { id: "pg_articles", title: "Artikel" },
    { id: "pg_videos", title: "Video" },
    { id: "pg_events", title: "Event" },
    { id: "pg_contact", title: "Kontak" },
  ]

  const addOption = () => {
    const newId = (options.length + 1).toString()
    setOptions([...options, { id: newId, text: "" }])
  }

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((option) => option.id !== id))
    }
  }

  const updateOption = (id: string, text: string) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text } : option)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!pollName.trim()) {
      toast({
        title: "Error",
        description: "Nama polling harus diisi.",
      })
      return
    }

    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Pertanyaan polling harus diisi.",
      })
      return
    }

    if (!category) {
      toast({
        title: "Error",
        description: "Kategori harus dipilih.",
      })
      return
    }

    if (!type) {
      toast({
        title: "Error",
        description: "Tipe polling harus dipilih.",
      })
      return
    }

    const validOptions = options.filter((option) => option.text.trim())
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Minimal harus ada 2 opsi yang diisi.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const pollData = {
        name: pollName,
        question,
        category,
        type,
        isActive,
        allowMultiple,
        endDate: endDate || null,
        options: validOptions,
        associatedContentId: associatedContentId,
      }

      console.log("Creating poll:", pollData)

      toast({
        title: "Berhasil!",
        description: "Polling berhasil dibuat.",
      })

      router.push("/admin/polls")
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat polling. Silakan coba lagi.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="px-[10%] py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buat Polling Baru</h1>
              <p className="text-gray-600 mt-1">Buat polling atau survei untuk komunitas</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Dasar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pollName">Nama Polling *</Label>
                      <Input
                        id="pollName"
                        value={pollName}
                        onChange={(e) => setPollName(e.target.value)}
                        placeholder="Masukkan nama polling..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="question">Pertanyaan *</Label>
                      <Textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Masukkan pertanyaan polling..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Kategori *</Label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="type">Tipe Polling *</Label>
                        <Select
                          value={type}
                          onValueChange={(value) => {
                            setType(value)
                            setAssociatedContentId(null) // Reset associated content when type changes
                            setAssociatedContentName(null)
                          }}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe" />
                          </SelectTrigger>
                          <SelectContent>
                            {types.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {type === "article" && (
                      <div>
                        <Label htmlFor="article">Pilih Artikel</Label>
                        <Select
                          value={associatedContentId || ""}
                          onValueChange={(value) => {
                            setAssociatedContentId(value)
                            setAssociatedContentName(mockArticles.find((a) => a.id === value)?.title || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih artikel" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockArticles.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {type === "video" && (
                      <div>
                        <Label htmlFor="video">Pilih Video</Label>
                        <Select
                          value={associatedContentId || ""}
                          onValueChange={(value) => {
                            setAssociatedContentId(value)
                            setAssociatedContentName(mockVideos.find((v) => v.id === value)?.title || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih video" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockVideos.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {type === "event" && (
                      <div>
                        <Label htmlFor="event">Pilih Event</Label>
                        <Select
                          value={associatedContentId || ""}
                          onValueChange={(value) => {
                            setAssociatedContentId(value)
                            setAssociatedContentName(mockEvents.find((e) => e.id === value)?.title || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih event" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockEvents.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {type === "page" && (
                      <div>
                        <Label htmlFor="page">Pilih Halaman</Label>
                        <Select
                          value={associatedContentId || ""}
                          onValueChange={(value) => {
                            setAssociatedContentId(value)
                            setAssociatedContentName(mockPages.find((p) => p.id === value)?.title || null)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih halaman" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockPages.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Poll Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Opsi Polling</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {options.map((option, index) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Label htmlFor={`option-${option.id}`}>Opsi {index + 1}</Label>
                          <Input
                            id={`option-${option.id}`}
                            value={option.text}
                            onChange={(e) => updateOption(option.id, e.target.value)}
                            placeholder={`Masukkan opsi ${index + 1}...`}
                          />
                        </div>
                        {options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(option.id)}
                            className="text-red-600 hover:text-red-700 mt-6"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addOption} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Opsi
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="isActive">Status Aktif</Label>
                        <p className="text-sm text-gray-500">Polling dapat diakses pengguna</p>
                      </div>
                      <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowMultiple">Pilihan Ganda</Label>
                        <p className="text-sm text-gray-500">Izinkan memilih lebih dari satu opsi</p>
                      </div>
                      <Switch id="allowMultiple" checked={allowMultiple} onCheckedChange={setAllowMultiple} />
                    </div>

                    <div>
                      <Label htmlFor="endDate">Tanggal Berakhir</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <p className="text-sm text-gray-500 mt-1">Kosongkan jika tidak ada batas waktu</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pollName && <div className="font-medium">{pollName}</div>}
                    {question && <div className="text-sm text-gray-600">{question}</div>}
                    <div className="flex gap-2">
                      {category && <Badge variant="outline">{category}</Badge>}
                      {type && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {types.find((t) => t.value === type)?.label}
                        </Badge>
                      )}
                    </div>
                    {associatedContentName && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {associatedContentName}
                      </Badge>
                    )}
                    {allowMultiple && <Badge variant="secondary">Pilihan Ganda</Badge>}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Menyimpan..." : "Simpan Polling"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
