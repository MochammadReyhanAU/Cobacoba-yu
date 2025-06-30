"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArticleCardLandscape } from "@/components/article-card-landscape"
import type { CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Article {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
  views: string
  featured?: boolean
}

interface HighlightedArticlesCarouselProps {
  articles?: Article[]
}

export function HighlightedArticlesCarousel({ articles }: HighlightedArticlesCarouselProps) {
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

  const featuredArticles = (articles ?? []).filter((article) => article.featured)

  if (!articles || featuredArticles.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {featuredArticles.map((article) => (
            <CarouselItem key={article.id}>
              <ArticleCardLandscape article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {featuredArticles.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={current === 1}
              className="rounded-full border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <span
                  key={index}
                  className={`block h-2 w-2 rounded-full transition-colors ${
                    index + 1 === current ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={current === count}
              className="rounded-full border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Carousel>
    </div>
  )
}
