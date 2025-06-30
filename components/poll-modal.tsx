"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Clock, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  category: string
  endDate?: string
  isActive: boolean
  allowMultiple?: boolean
}

interface PollModalProps {
  poll: Poll
  isOpen: boolean
  onClose: () => void
}

export function PollModal({ poll, isOpen, onClose }: PollModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  // Check if user has already voted (from localStorage)
  useEffect(() => {
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
    if (votedPolls.includes(poll.id)) {
      setHasVoted(true)
      setShowResults(true)
    }
  }, [poll.id])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOptions([])
      setIsSubmitting(false)
    }
  }, [isOpen])

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return

    if (poll.allowMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId],
      )
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleSubmitVote = async () => {
    // Check if user is logged in
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (selectedOptions.length === 0) {
      toast({
        title: "Pilih opsi",
        description: "Silakan pilih minimal satu opsi sebelum voting.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update localStorage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
      votedPolls.push(poll.id)
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls))

      // Store vote details
      const voteData = {
        pollId: poll.id,
        selectedOptions,
        timestamp: new Date().toISOString(),
      }

      const userVotes = JSON.parse(localStorage.getItem("userVotes") || "[]")
      userVotes.push(voteData)
      localStorage.setItem("userVotes", JSON.stringify(userVotes))

      setHasVoted(true)
      setShowResults(true)

      toast({
        title: "Vote berhasil!",
        description: "Terima kasih atas partisipasi Anda.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim vote. Silakan coba lagi.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    // Mark as seen so it doesn't show again
    const seenPolls = JSON.parse(localStorage.getItem("seenPolls") || "[]")
    seenPolls.push(poll.id)
    localStorage.setItem("seenPolls", JSON.stringify(seenPolls))
    onClose()
  }

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0
  }

  const isExpired = poll.endDate && new Date(poll.endDate) < new Date()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <Badge variant="secondary" className="text-xs">
                {poll.category}
              </Badge>
            </div>
          </div>
          <DialogTitle className="text-left text-lg font-semibold leading-tight">{poll.question}</DialogTitle>
          <DialogDescription className="text-left">
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{poll.totalVotes} votes</span>
              </div>
              {poll.endDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Berakhir {new Date(poll.endDate).toLocaleDateString("id-ID")}</span>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            {poll.options.map((option) => {
              const percentage = getPercentage(option.votes)
              const isSelected = selectedOptions.includes(option.id)

              return (
                <div key={option.id} className="space-y-2">
                  {showResults ? (
                    // Results view
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className={isSelected ? "font-medium text-blue-600" : ""}>
                          {option.text}
                          {isSelected && " ✓"}
                        </span>
                        <span className="text-gray-500">
                          {percentage}% ({option.votes})
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ) : (
                    // Voting view
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={!poll.isActive || isExpired}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-white bg-white" : "border-gray-400"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          {!showResults && !hasVoted && poll.isActive && !isExpired && (
            <div className="space-y-3">
              <Button
                onClick={handleSubmitVote}
                disabled={selectedOptions.length === 0 || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Mengirim..." : "Vote Sekarang"}
              </Button>

              {poll.allowMultiple && (
                <p className="text-xs text-gray-500 text-center">Anda dapat memilih lebih dari satu opsi</p>
              )}

              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleSkip} className="flex-1 text-gray-500">
                  Lewati
                </Button>
              </div>
            </div>
          )}

          {hasVoted && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>Terima kasih sudah berpartisipasi!</span>
              </div>
            </div>
          )}

          {(!poll.isActive || isExpired) && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="h-4 w-4" />
                <span>{isExpired ? "Polling ini sudah berakhir" : "Polling ini tidak aktif"}</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
