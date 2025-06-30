"use client"

import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useRef, forwardRef } from "react"
import { useRouter } from "next/navigation"

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

interface CategorySectionProps {
  category: string
  articles?: Article[]
  onSeeAll: (category: string) => void
}

// Use forwardRef to allow parent component to pass a ref
export const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ category, articles = [], onSeeAll }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    if (articles.length === 0) {
      return null
    }

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
      window.scrollTo(0, 0) // Tambahkan baris ini untuk menggulir ke atas
      router.push(`/articles/category/${categorySlug}`)
    }

    return (
      <div ref={ref} className="space-y-6 scroll-mt-24">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
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
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        {/* Scrollable Articles */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {articles.map((article) => (
            <div key={article.id} className="flex-none w-80">
              <ArticleCard article={article} size="medium" />
            </div>
          ))}
        </div>
      </div>
    )
  },
)

CategorySection.displayName = "CategorySection"
