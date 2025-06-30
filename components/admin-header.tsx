"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, X, Bell, Settings, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { ProfileMenu } from "@/components/profile-menu"
import { usePathname } from "next/navigation"

const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "User Management", href: "/admin/users" },
  {
    name: "Content Management",
    href: "#",
    subItems: [
      { name: "Article Management", href: "/admin/articles" },
      { name: "Video Management", href: "/admin/videos" },
      { name: "Event Management", href: "/admin/events" },
      { name: "Event Participant Management", href: "/admin/event-participants" },
      { name: "Poll Management", href: "/admin/polls" },
    ],
  },
  { name: "Master Data", href: "/admin/master-data" },
]

export function AdminHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { user } = useAuth()
  const pathname = usePathname()

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  const isActiveRoute = (href: string, subItems?: any[]) => {
    if (href !== "#" && pathname === href) return true
    if (subItems) {
      return subItems.some((subItem) => pathname === subItem.href)
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="px-[10%]">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <Image
              src="/images/agilenesia-logo.png"
              alt="Agilenesia Admin"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
            <span className="text-sm font-medium text-gray-500 ml-2">Admin Panel</span>
          </Link>

          {/* Admin Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {adminNavigation.map((item) => (
              <div key={item.name} className="relative">
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActiveRoute(item.href, item.subItems) ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-3 w-3 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              pathname === subItem.href ? "text-blue-600 bg-blue-50" : "text-gray-700"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActiveRoute(item.href) ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search admin..." className="w-64" autoFocus />
                  <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Profile Menu */}
            {user && <ProfileMenu />}
          </div>
        </div>
      </div>

      {/* Mobile Admin Navigation */}
      <div className="lg:hidden border-t bg-white">
        <div className="px-[10%] py-2">
          <div className="flex space-x-4 overflow-x-auto">
            {adminNavigation.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-blue-600 py-2 flex items-center ${
                        isActiveRoute(item.href, item.subItems)
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-3 w-3 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              pathname === subItem.href ? "text-blue-600 bg-blue-50" : "text-gray-700"
                            }`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-blue-600 py-2 ${
                      isActiveRoute(item.href) ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop for mobile dropdowns */}
      {openDropdown && <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpenDropdown(null)} />}
    </header>
  )
}

export default AdminHeader
