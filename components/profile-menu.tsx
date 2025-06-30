"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Shield, LogOut, Home, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function ProfileMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    } else {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const handleHomepage = () => {
    router.push("/")
  }

  const handleAdminDashboard = () => {
    router.push("/admin/dashboard")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleYourProfile = () => {
    router.push("/profile")
  }

  const getUserInitials = () => {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user) return null

  return (
    <div className="relative">
      {/* Profile Button - Removed ChevronDown icon */}
      <Button
        ref={buttonRef}
        variant="ghost"
        className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        onClick={handleToggleMenu}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="h-10 w-10 border-2 border-transparent hover:border-blue-200 transition-colors">
          <AvatarImage
            src={user.avatar || "/placeholder.svg?height=40&width=40"}
            alt={`${user.name} profile picture`}
            className="object-cover"
          />
          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu Content */}
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="profile-menu"
          >
            {/* Profile Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={`${user.name} profile picture`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  {user.role === "admin" && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Administrator
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Your Profile */}
              <button
                onClick={() => handleMenuItemClick(handleYourProfile)}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                role="menuitem"
              >
                <User className="mr-3 h-4 w-4 text-gray-500" />
                <span>Your Profile</span>
              </button>

              {/* Admin Dashboard - Only for admins */}
              {user.role === "admin" && (
                <button
                  onClick={() => handleMenuItemClick(handleAdminDashboard)}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  role="menuitem"
                >
                  <Shield className="mr-3 h-4 w-4 text-gray-500" />
                  <span>Admin Dashboard</span>
                </button>
              )}

              {/* Homepage */}
              <button
                onClick={() => handleMenuItemClick(handleHomepage)}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                role="menuitem"
              >
                <Home className="mr-3 h-4 w-4 text-gray-500" />
                <span>Homepage</span>
              </button>

              {/* Separator */}
              <div className="my-1 border-t border-gray-200" />

              {/* Log Out */}
              <button
                onClick={() => handleMenuItemClick(handleLogout)}
                className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                role="menuitem"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
