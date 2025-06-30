"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Maximize2, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PDFViewerProps {
  pdfUrl: string
  fileName: string
  className?: string
}

interface PageDimensions {
  width: number
  height: number
  aspectRatio: number
}

export default function PDFViewer({ pdfUrl, fileName, className }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(5)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pageDimensions, setPageDimensions] = useState<PageDimensions[]>([])
  const [viewerHeight, setViewerHeight] = useState(600)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const pageContainerRef = useRef<HTMLDivElement>(null)

  // Mock page dimensions - in real implementation, this would come from PDF parsing
  const mockPageDimensions: PageDimensions[] = [
    { width: 595, height: 842, aspectRatio: 0.706 }, // A4 Portrait
    { width: 595, height: 842, aspectRatio: 0.706 }, // A4 Portrait
    { width: 842, height: 595, aspectRatio: 1.415 }, // A4 Landscape
    { width: 595, height: 842, aspectRatio: 0.706 }, // A4 Portrait
    { width: 595, height: 1200, aspectRatio: 0.496 }, // Tall page
  ]

  const displayUrl = pdfUrl.startsWith("blob:")
    ? "data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFs0IDAgUiA2IDAgUl0NCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSDQo+Pg0KL1Byb2NTZXQgOCAwIFINCj4+DQovTWVkaWFCb3ggWzAgMCA2MTIuMDAwMCA3OTIuMDAwMF0NCi9Db250ZW50cyA1IDAgUg0KPj4NCmVuZG9iag0KDQo1IDAgb2JqDQo8PA0KL0xlbmd0aCA0NA0KPj4NCnN0cmVhbQ0KQlQNCjcwIDUwIFREDQovRjEgMTIgVGYNCihDb250b2ggRG9rdW1lbiBQREYpIFRqDQpFVA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KNiAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSDQo+Pg0KL1Byb2NTZXQgOCAwIFINCj4+DQovTWVkaWFCb3ggWzAgMCA2MTIuMDAwMCA3OTIuMDAwMF0NCi9Db250ZW50cyA3IDAgUg0KPj4NCmVuZG9iag0KDQo3IDAgb2JqDQo8PA0KL0xlbmd0aCA0NA0KPj4NCnN0cmVhbQ0KQlQNCjcwIDUwIFREDQovRjEgMTIgVGYNCihIYWxhbWFuIEtlZHVhKSBUag0KRVQNC2VuZHN0cmVhbQ0KZW5kb2JqDQoNCjggMCBvYmoNCltdDQplbmRvYmoNCg0KOSAwIG9iag0KPDwNCi9UeXBlIC9Gb250DQovU3VidHlwZSAvVHlwZTENCi9OYW1lIC9GMQ0KL0Jhc2VGb250IC9IZWx2ZXRpY2ENCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nDQo+Pg0KZW5kb2JqDQoNCnhyZWYNCjAgMTANCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMDAwOSAwMDAwMCBuDQowMDAwMDAwMDc0IDAwMDAwIG4NCjAwMDAwMDAxMjAgMDAwMDAgbg0KMDAwMDAwMDE3OSAwMDAwMCBuDQowMDAwMDAwMzY0IDAwMDAwIG4NCjAwMDAwMDA0NjYgMDAwMDAgbg0KMDAwMDAwMDY1MSAwMDAwMCBuDQowMDAwMDAwNzQzIDAwMDAwIG4NCjAwMDAwMDA3NjUgMDAwMDAgbg0KdHJhaWxlcg0KPDwNCi9TaXplIDEwDQovUm9vdCAxIDAgUg0KPj4NCnN0YXJ0eHJlZg0KODY1DQolJUVPRg0K"
    : pdfUrl

  // Calculate viewer height based on full width and current page aspect ratio
  const calculateViewerHeight = useCallback(() => {
    if (pageDimensions.length === 0) return 600

    const currentPageDim = pageDimensions[currentPage - 1]
    if (!currentPageDim) return 600

    // Get container width (assuming full width available)
    const containerWidth = containerRef.current?.offsetWidth || 1200

    // Calculate height based on full width and aspect ratio
    const calculatedHeight = containerWidth / currentPageDim.aspectRatio

    // Apply zoom factor
    const scaledHeight = calculatedHeight * (zoom / 100)

    // Add padding and ensure reasonable limits
    const paddedHeight = scaledHeight + 80 // padding for controls
    return Math.min(Math.max(paddedHeight, 300), 2000) // min 300px, max 2000px
  }, [pageDimensions, currentPage, zoom])

  // Initialize page dimensions and viewer height
  useEffect(() => {
    setPageDimensions(mockPageDimensions)
    setTotalPages(mockPageDimensions.length)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update viewer height when page or zoom changes
  useEffect(() => {
    const newHeight = calculateViewerHeight()
    setViewerHeight(newHeight)
  }, [calculateViewerHeight])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return // Don't interfere with input fields

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          handlePrevPage()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNextPage()
          break
        case "ArrowUp":
          e.preventDefault()
          handleZoomIn()
          break
        case "ArrowDown":
          e.preventDefault()
          handleZoomOut()
          break
        case "Home":
          e.preventDefault()
          goToPage(1)
          break
        case "End":
          e.preventDefault()
          goToPage(totalPages)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, totalPages])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsTransitioning(true)
      setCurrentPage(page)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number.parseInt(e.target.value)
    if (page >= 1 && page <= totalPages) {
      goToPage(page)
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(300, prev + 25))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(25, prev - 25))
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = displayUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const getCurrentPageDimensions = () => {
    return pageDimensions[currentPage - 1] || { width: 595, height: 842, aspectRatio: 0.706 }
  }

  const openInNewTab = () => {
    window.open(displayUrl, "_blank")
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-white rounded-lg shadow-lg overflow-hidden ${className} ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* Simplified Top Toolbar - Only Download and Fullscreen */}
      <div className="flex items-center justify-end p-3 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-8 w-8 p-0" title="Fullscreen">
            <Maximize2 className="h-3 w-3" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDownload} className="h-8 w-8 p-0" title="Download">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* PDF Content Area with Dynamic Height */}
      <div
        className="relative bg-gray-100 transition-all duration-300 ease-in-out"
        style={{
          height: isFullscreen ? "calc(100vh - 60px)" : `${viewerHeight}px`,
        }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Memuat dokumen PDF...</p>
            </div>
          </div>
        ) : hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md p-8">
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PDF Viewer</h3>
              <p className="text-sm text-gray-600 mb-6">
                Dokumen PDF siap untuk ditampilkan. Klik tombol di bawah untuk melihat atau mengunduh dokumen.
              </p>

              <div className="space-y-3">
                <Button onClick={openInNewTab} className="w-full">
                  Buka PDF di Tab Baru
                </Button>
                <Button variant="outline" onClick={handleDownload} className="w-full">
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={pageContainerRef}
            className={`relative w-full h-full flex items-center justify-center py-4 transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
          >
            {/* Page Display */}
            <div
              className="bg-white shadow-2xl border border-gray-300 relative overflow-hidden"
              style={{
                width: "100%",
                height: `${viewerHeight - 80}px`,
                transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
                transition: "transform 0.3s ease, height 0.3s ease",
                transformOrigin: "center center",
              }}
            >
              {/* Simulated PDF Page Content */}
              <div className="w-full h-full bg-white flex flex-col items-center justify-center text-gray-800 p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-20 bg-red-500 rounded-sm mx-auto mb-6 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">PDF</span>
                  </div>

                  <h2 className="text-2xl font-bold">Halaman {currentPage}</h2>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                    <p className="font-semibold mb-2">Navigasi Keyboard:</p>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <span>← →</span>
                      <span>Halaman sebelumnya/selanjutnya</span>
                      <span>↑ ↓</span>
                      <span>Zoom in/out</span>
                      <span>Home/End</span>
                      <span>Halaman pertama/terakhir</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page transition indicator */}
              {isTransitioning && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Simplified Page Navigation Overlay - Only arrows and page input */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={currentPage}
                onChange={handlePageInput}
                min={1}
                max={totalPages}
                className="h-8 w-12 text-center text-xs bg-white/20 border-white/30 text-white placeholder-white/70"
              />
              <span className="text-xs">dari {totalPages}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
