"use client"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useRef, forwardRef } from "react"
import { useRouter } from "next/navigation"

interface Video {
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

interface VideoCategorySectionProps {
  category: string
  videos?: Video[] // now optional
  onPlay: (video: Video) => void
  onSeeAll: (category: string) => void
}

// Use forwardRef to allow parent component to pass a ref
export const VideoCategorySection = forwardRef<HTMLDivElement, VideoCategorySectionProps>(
  ({ category, videos = [], onPlay, onSeeAll }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -320, behavior: "smooth" })
      }
    }

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
      }
    }

    const handleSeeAll = () => {
      // Convert category name to URL-friendly format
      const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
      window.scrollTo(0, 0)
      router.push(`/videos/category/${categorySlug}`)
    }

    return (
      <div ref={ref} className="space-y-6 scroll-mt-24">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            {/* Navigation Buttons */}
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={scrollLeft} className="rounded-full w-10 h-10 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={scrollRight} className="rounded-full w-10 h-10 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={handleSeeAll}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        {/* Scrollable Videos */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{"Belum ada video di kategori ini."}</p>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="flex-none w-80">
                <VideoCard video={video} onPlay={onPlay} />
              </div>
            ))
          )}
        </div>
      </div>
    )
  },
)

VideoCategorySection.displayName = "VideoCategorySection"
