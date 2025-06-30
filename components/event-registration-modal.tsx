"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  capacity: string
  price: string
  image: string
  featured: boolean
  status: string
}

interface EventRegistrationModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  userEmail: string
  userName: string
  onRegistrationSuccess: (eventId: number) => void
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  userEmail,
  userName,
  onRegistrationSuccess,
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: userName || "",
    email: userEmail || "",
    phone: "",
    motivation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Pendaftaran Berhasil!",
      description: `Pendaftaran Anda untuk event "${event?.title}" telah diterima. Status: Menunggu Konfirmasi.`,
    })

    // Call the callback to update the event status
    if (event) {
      onRegistrationSuccess(event.id)
    }

    setIsSubmitting(false)
    onClose()

    // Reset form
    setFormData({
      fullName: userName || "",
      email: userEmail || "",
      phone: "",
      motivation: "",
    })
  }

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Daftar Event</DialogTitle>
        </DialogHeader>

        {/* Event Info */}
        <div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <div className="flex gap-4">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={120}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-700">{event.type}</Badge>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  {event.price === "Gratis" ? "GRATIS" : event.price}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{event.capacity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nama Lengkap *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">Email dari akun yang sedang login</p>
            </div>

            <div>
              <Label htmlFor="phone">Nomor Telepon *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="motivation">Motivasi mengikuti event ini *</Label>
              <Textarea
                id="motivation"
                placeholder="Ceritakan mengapa Anda tertarik mengikuti event ini dan apa yang ingin Anda pelajari..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>

          {/* Information Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h5 className="font-medium text-blue-900 mb-1">Informasi Penting:</h5>
                <ul className="text-blue-800 space-y-1">
                  <li>
                    • Setelah mendaftar, status Anda akan menjadi <strong>"Menunggu Konfirmasi"</strong>
                  </li>
                  <li>• Admin akan menghubungi Anda dalam 1-2 hari kerja untuk konfirmasi lebih lanjut</li>
                  <li>• Pastikan nomor telepon yang Anda berikan aktif dan dapat dihubungi</li>
                  <li>• Anda akan menerima email konfirmasi setelah pendaftaran berhasil</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mendaftar..." : "Daftar Sekarang"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
