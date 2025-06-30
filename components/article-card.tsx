"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, User, Eye, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  article: {
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
  size?: "small" | "medium" | "large"
  customImageHeight?: string
}

export function ArticleCard({ article, size = "medium", customImageHeight }: ArticleCardProps) {
  const cardSizes = {
    small: "h-44",
    medium: "h-52",
    large: "h-80",
  }

  const titleSizes = {
    small: "text-base",
    medium: "text-lg",
    large: "text-2xl lg:text-3xl",
  }

  const imageHeight = customImageHeight || cardSizes[size]

  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm cursor-pointer h-full">
        <div className="relative overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={size === "large" ? 800 : 400}
            height={size === "large" ? 600 : 300}
            className={`w-full ${imageHeight} object-cover group-hover:scale-110 transition-transform duration-700`}
          />
          {size === "large" && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-white/95 text-gray-800 hover:bg-white text-xs font-medium">{article.category}</Badge>
            {article.featured && (
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium">
                Featured
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className={`space-y-3 ${size === "large" ? "p-6" : "p-5"}`}>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>

          <CardTitle
            className={`${titleSizes[size]} leading-tight group-hover:text-blue-600 transition-colors line-clamp-2`}
          >
            {article.title}
          </CardTitle>

          <CardDescription className="text-gray-600 leading-relaxed line-clamp-2 text-sm">
            {article.excerpt}
          </CardDescription>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{article.readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1">
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
