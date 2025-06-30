"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Calendar, User, Clock } from "lucide-react"
import Image from "next/image"

interface VideoCardLandscapeProps {
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

export function VideoCardLandscape({ video, onPlay }: VideoCardLandscapeProps) {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-500 border border-gray-200/60 shadow-xl overflow-hidden cursor-pointer bg-white backdrop-blur-sm"
      onClick={() => onPlay(video)}
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[240px]">
        {/* Video Thumbnail */}
        <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="h-8 w-8 text-gray-900 ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.duration}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-white/95 text-gray-800 hover:bg-white text-sm font-medium">{video.category}</Badge>
            {video.featured && (
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Video Content */}
        <CardContent className="lg:w-3/5 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {video.title}
            </h2>
            <p className="text-gray-600 text-md leading-relaxed line-clamp-3">{video.description}</p>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{video.author || "Agilenesia"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{video.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{video.views} views</span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
