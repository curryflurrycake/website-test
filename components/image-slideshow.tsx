"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageSlideProps {
  images: {
    id: string
    src: string
    alt: string
  }[]
}

export default function ImageSlideshow({ images }: ImageSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance the slideshow
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length, isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-black/40">
      <div className="aspect-[4/5] relative">
        <Image
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500"
        />

        {/* Gradient overlay to ensure buttons are visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
