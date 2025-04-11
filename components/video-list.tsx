"use client"

import Image from "next/image"

interface Video {
  id: string
  title: string
  thumbnail: string
  artist: string
  views: string
  date: string
  description: string
  videoUrl: string
}

interface VideoListProps {
  videos: Video[]
  onSelect: (video: Video) => void
  currentVideo: Video
}

export default function VideoList({ videos, onSelect, currentVideo }: VideoListProps) {
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => onSelect(video)}
          className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
            video.id === currentVideo.id ? "bg-orange-500/20" : "hover:bg-white/5"
          }`}
        >
          <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white line-clamp-2">{video.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
