import { Card, CardContent } from "@/components/ui/card"

interface AdBannerProps {
  size?: "small" | "medium" | "large" | "sidebar"
  className?: string
}

export function AdBanner({ size = "medium", className = "" }: AdBannerProps) {
  const sizeClasses = {
    small: "h-24",
    medium: "h-32",
    large: "h-48",
    sidebar: "h-64",
  }

  return (
    <Card className={`border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}>
      <CardContent className={`flex items-center justify-center ${sizeClasses[size]} p-4`}>
        <div className="text-center text-gray-500">
          <div className="text-sm font-medium mb-1">Advertisement</div>
          <div className="text-xs">Your ad could be here</div>
        </div>
      </CardContent>
    </Card>
  )
}
