"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { VideoCardLandscape } from "@/components/video-card-landscape"
import type { CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

interface HighlightedVideosCarouselProps {
  videos?: Video[]
  onPlay: (video: Video) => void
}

export function HighlightedVideosCarousel({ videos, onPlay }: HighlightedVideosCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const featuredVideos = (videos ?? []).filter((video) => video.featured)

  if (featuredVideos.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {featuredVideos.map((video) => (
            <CarouselItem key={video.id}>
              <VideoCardLandscape video={video} onPlay={onPlay} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {featuredVideos.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={current === 1}
              className="rounded-full border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <span
                  key={index}
                  className={`block h-2 w-2 rounded-full transition-colors ${
                    index + 1 === current ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={current === count}
              className="rounded-full border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Carousel>
    </div>
  )
}
