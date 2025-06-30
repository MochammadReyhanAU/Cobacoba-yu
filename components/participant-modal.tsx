"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import { useState, useEffect } from "react"

interface ParticipantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (participant: any) => void
  participant?: any
  events: Array<{ id: number; name: string }>
}

export function ParticipantModal({ isOpen, onClose, onSave, participant, events }: ParticipantModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
    eventId: "",
    registrationStatus: "menunggu_konfirmasi",
    followUpStatus: "belum_dihubungi",
  })

  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name || "",
        email: participant.email || "",
        phone: participant.phone || "",
        motivation: participant.motivation || "",
        eventId: participant.eventId?.toString() || "",
        registrationStatus: participant.registrationStatus || "menunggu_konfirmasi",
        followUpStatus: participant.followUpStatus || "belum_dihubungi",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        motivation: "",
        eventId: "",
        registrationStatus: "menunggu_konfirmasi",
        followUpStatus: "belum_dihubungi",
      })
    }
  }, [participant, isOpen])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const participantData = {
        ...formData,
        id: participant?.id || Date.now(),
        eventId: Number.parseInt(formData.eventId),
        registrationDate: participant?.registrationDate || new Date().toISOString().split("T")[0],
      }

      onSave(participantData)

      toast({
        title: participant ? "Peserta berhasil diperbarui" : "Peserta berhasil ditambahkan",
        description: participant ? "Data peserta telah diperbarui." : "Peserta baru telah ditambahkan ke sistem.",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Gagal menyimpan data",
        description: "Terjadi kesalahan saat menyimpan data peserta.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{participant ? "Edit Peserta" : "Tambah Peserta"}</DialogTitle>
          <DialogDescription>
            {participant ? "Perbarui informasi peserta event." : "Tambahkan peserta baru ke event."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Masukkan alamat email"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Masukkan nomor telepon"
                required
              />
            </div>

            <div>
              <Label htmlFor="motivation">Motivasi</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="Motivasi mengikuti event (opsional)"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="eventId">Event *</Label>
              <Select value={formData.eventId} onValueChange={(value) => handleInputChange("eventId", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationStatus">Status Pendaftaran</Label>
                <Select
                  value={formData.registrationStatus}
                  onValueChange={(value) => handleInputChange("registrationStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menunggu_konfirmasi">Menunggu Konfirmasi</SelectItem>
                    <SelectItem value="terdaftar">Terdaftar</SelectItem>
                    <SelectItem value="ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="followUpStatus">Status Follow Up</Label>
                <Select
                  value={formData.followUpStatus}
                  onValueChange={(value) => handleInputChange("followUpStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="belum_dihubungi">Belum Dihubungi</SelectItem>
                    <SelectItem value="sudah_dihubungi">Sudah Dihubungi</SelectItem>
                    <SelectItem value="tidak_merespon">Tidak Merespon</SelectItem>
                    <SelectItem value="konfirmasi_kehadiran">Konfirmasi Kehadiran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
