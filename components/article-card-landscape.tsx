"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, User, Eye, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardLandscapeProps {
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
}

export function ArticleCardLandscape({ article }: ArticleCardLandscapeProps) {
  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="group hover:shadow-2xl transition-all duration-500 border border-gray-200/60 shadow-xl hover:shadow-3xl overflow-hidden bg-white backdrop-blur-sm cursor-pointer h-full">
        <div className="flex h-48 md:h-56 ">
          {/* Image Section */}
          <div className="relative w-2/5 overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-white/95 text-gray-800 hover:bg-white text-xs font-medium">{article.category}</Badge>
              {article.featured && (
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="w-3/5 flex flex-col">
            <CardHeader className="flex-1 p-4 md:p-6 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-3 flex-wrap">
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

              <CardTitle className="text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </CardTitle>

              <CardDescription className="text-gray-600 leading-relaxed line-clamp-2 text-md flex-1">
                {article.excerpt}
              </CardDescription>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
          </div>
        </div>
      </Card>
    </Link>
  )
}
