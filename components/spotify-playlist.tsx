"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface SpotifyPlaylistProps {
  open: boolean
  onClose: () => void
}

export default function SpotifyPlaylist({ open, onClose }: SpotifyPlaylistProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-gray-900 text-white border-gray-700 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl text-[#1DB954] flex items-center justify-between">
            J-Hope Spotify Playlist
          </DialogTitle>
          <DialogDescription className="text-gray-300">Spotify playlist used</DialogDescription>
        </DialogHeader>
        <div className="p-0 h-[70vh]">
          <iframe
            src="https://open.spotify.com/embed/playlist/3sc0b961xTbwFnLKDZGwMT?utm_source=generator"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-b-lg"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}
