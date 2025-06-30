"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Calendar, User } from "lucide-react"
import Image from "next/image"

interface VideoCardProps {
  video: {
    id: number
    title: string
    description: string
    thumbnail: string
    duration: string
    views: string
    category: string
    author?: string
    date?: string
    featured?: boolean
    youtubeId?: string
  }
  onPlay: (video: any) => void
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden cursor-pointer bg-white"
      onClick={() => onPlay(video)}
    >
      <div className="relative overflow-hidden">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          width={400}
          height={225}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="h-6 w-6 text-gray-900 ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
          {video.duration}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/95 text-gray-800 hover:bg-white text-xs font-medium">{video.category}</Badge>
          {video.featured && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{video.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{video.author || "Agilenesia"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{video.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{video.views}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
