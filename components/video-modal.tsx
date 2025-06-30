"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, User, Clock, Bookmark, Share2, AlertCircle, BarChart3 } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface VideoModalProps {
  video: {
    id: number
    title: string
    description: string
    duration: string
    views: string
    category: string
    author?: string
    date?: string
    youtubeId?: string
    thumbnail?: string
    status?: string
    submittedDate?: string
    approvedDate?: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const [savedVideos, setSavedVideos] = useState<number[]>([])
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  // Initialize saved videos from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVideos") || "[]")
    setSavedVideos(saved.map((video: any) => video.id))
  }, [])

  if (!video) return null

  // Extract YouTube ID from various URL formats or use provided youtubeId
  const getYouTubeId = (video: any) => {
    if (video.youtubeId) return video.youtubeId

    // For demo purposes, return a sample YouTube ID
    const sampleIds = [
      "dQw4w9WgXcQ", // Never Gonna Give You Up
      "9bZkp7q19f0", // PSY - GANGNAM STYLE
      "kJQP7kiw5Fk", // Despacito
      "fJ9rUzIMcZQ", // Bohemian Rhapsody
      "hT_nvWreIhg", // Counting Stars
    ]
    return sampleIds[video.id % sampleIds.length]
  }

  const youtubeId = getYouTubeId(video)

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
        <div className="grid lg:grid-cols-4 gap-0">
          {/* Video Player - 3 columns */}
          <div className="lg:col-span-3">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 space-y-4">
              <DialogHeader>
                <div className="flex items-start gap-3 mb-3">
                  <Badge className="bg-purple-100 text-purple-700">{video.category}</Badge>
                  {video.status && getStatusBadge(video.status)}
                </div>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-bold text-gray-900 leading-tight flex-1">
                    {video.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              {/* Video Status Information */}
              {video.status && video.status !== "approved" && (
                <Card className="border-l-4 border-l-yellow-400 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800">Video Status Information</h3>
                        <div className="text-sm text-yellow-700 mt-1">
                          {video.status === "pending" && (
                            <p>This video is currently under review by our editorial team.</p>
                          )}
                          {video.status === "draft" && <p>This video is still in draft mode.</p>}
                          {video.status === "rejected" && (
                            <p>This video was rejected and needs revision before republication.</p>
                          )}
                          {video.submittedDate && <p className="mt-1">Submitted: {video.submittedDate}</p>}
                          {video.approvedDate && <p>Approved: {video.approvedDate}</p>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{video.author || "Agilenesia"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{video.views} tayangan</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Button
                  variant={savedVideos.includes(video.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const saved = JSON.parse(localStorage.getItem("savedVideos") || "[]")
                    const isCurrentlySaved = savedVideos.includes(video.id)

                    if (isCurrentlySaved) {
                      // Remove from saved
                      const updatedSaved = saved.filter((savedVideo: any) => savedVideo.id !== video.id)
                      localStorage.setItem("savedVideos", JSON.stringify(updatedSaved))
                      setSavedVideos((prev) => prev.filter((id) => id !== video.id))
                      toast({
                        title: "Video removed",
                        description: "Video has been removed from your saved list.",
                      })
                    } else {
                      // Add to saved
                      const videoToSave = {
                        id: video.id,
                        title: video.title,
                        author: video.author,
                        date: video.date,
                        thumbnail: video.thumbnail || "/placeholder.svg",
                        duration: video.duration,
                      }
                      saved.push(videoToSave)
                      localStorage.setItem("savedVideos", JSON.stringify(saved))
                      setSavedVideos((prev) => [...prev, video.id])
                      toast({
                        variant: "success",
                        title: "Video saved!",
                        description: "Video has been added to your saved list.",
                      })
                    }
                  }}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${savedVideos.includes(video.id) ? "fill-current" : ""}`} />
                  {savedVideos.includes(video.id) ? "Saved" : "Save Video"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const shareData = {
                      title: video.title,
                      text: video.description,
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
                            description: "Video link has been copied to clipboard.",
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
                            description: "Video link has been copied to clipboard.",
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
                  Share
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Fitur Polling",
                      description: "Fitur polling untuk video ini akan segera hadir!",
                    })
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Polling
                </Button>
              </div>

              <p className="text-gray-600 leading-relaxed">{video.description}</p>
            </div>
          </div>

          {/* Sidebar with Ads - 1 column */}
          <div className="lg:col-span-1 bg-gray-50 p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Sponsored</h3>
            <AdBanner size="sidebar" />
            <AdBanner size="sidebar" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
