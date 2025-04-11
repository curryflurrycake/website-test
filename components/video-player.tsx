"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Music } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { videos } from "@/lib/data"

interface Video {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
}

interface VideoPlayerProps {
  video: Video
  autoPlay?: boolean
  onSelectVideo: (video: Video) => void
}

export default function VideoPlayer({ video, autoPlay = false, onSelectVideo }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Handle autoPlay prop
  useEffect(() => {
    if (autoPlay) {
      setShowConfirmDialog(true)
    }
  }, [autoPlay, video.id])

  const handlePlayClick = () => {
    setShowConfirmDialog(true)
  }

  const startPlaying = () => {
    setIsPlaying(true)
    setShowConfirmDialog(false)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black/40 rounded-xl overflow-hidden group">
        {isPlaying ? (
          <iframe
            src={video.videoUrl}
            className="absolute inset-0 w-full h-full"
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
              alt={video.title}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all transform group-hover:scale-110"
                onClick={handlePlayClick}
              >
                <Play className="h-8 w-8 text-white fill-white" />
              </button>
            </div>
          </>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{video.title}</h1>
          <a
            href="https://open.spotify.com/playlist/3sc0b961xTbwFnLKDZGwMT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            <Music className="h-4 w-4" />
            Listen on Spotify
          </a>
        </div>

        {/* Compact Play Next List */}
        <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <h3 className="text-sm font-medium text-white/80 mb-2">Play Next</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {videos
              .filter((v) => v.id !== video.id)
              .slice(0, 24)
              .map((nextVideo) => (
                <div
                  key={nextVideo.id}
                  className="flex items-center gap-2 p-1 rounded hover:bg-white/10 cursor-pointer"
                  onClick={() => onSelectVideo(nextVideo)}
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={nextVideo.thumbnail || "/placeholder.svg?height=720&width=1280"}
                      alt={nextVideo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white line-clamp-2">{nextVideo.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md text-white border-gray-700"
        style={{
          backgroundImage: "url('/hope.jpg')",
          backgroundSize: "cover",
        }}>
          <DialogHeader>
            <DialogTitle className="text-xl text-orange-400">Ready to start?</DialogTitle>
            <DialogDescription className="text-gray-300">
              Wear your earbuds or headphones for better experience
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button onClick={startPlaying} className="bg-orange-500 hover:bg-orange-600 text-white">
              Let's Go!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}