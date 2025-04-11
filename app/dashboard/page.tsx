"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import WelcomeDialog from "@/components/welcome-dialog"
import ImageSlideshow from "@/components/image-slideshow"
import SpotifyPlaylist from "@/components/spotify-playlist"
import { videos } from "@/lib/data"
import { jhopeImages } from "@/lib/images"

export default function Dashboard() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true)
  const [userName, setUserName] = useState("")
  const [autoPlayVideo, setAutoPlayVideo] = useState(false)
  const [showSpotifyPlaylist, setShowSpotifyPlaylist] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleWelcomeDialogClose = (name: string, favoriteVideoId: string) => {
    setUserName(name)
    // Find the selected favorite video
    const favoriteVideo = videos.find((video) => video.id === favoriteVideoId) || videos[0]
    setSelectedVideo(favoriteVideo)
    setShowWelcomeDialog(false)
    setAutoPlayVideo(true)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/hope2.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="min-h-screen bg-black/70">
        <header className="bg-gradient-to-r from-red-500 to-red-900 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">J-Hope Concert For You</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSpotifyPlaylist(true)}
                className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-3 py-1 rounded-full text-sm"
              >
                J-Hope Playlist
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn")
                  router.push("/")
                }}
                className="text-white hover:text-white/80"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {userName && (
            <div className="mb-6 bg-orange-500/20 backdrop-blur-sm p-4 rounded-lg border border-orange-500/30">
              <h2 className="text-2xl font-bold text-white">
                Hi, {userName}! Hope you enjoy this personalized J-Hope player
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VideoPlayer
                video={selectedVideo}
                autoPlay={autoPlayVideo}
                onSelectVideo={(video) => {
                  setSelectedVideo(video)
                  setAutoPlayVideo(false)
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">J-Hope pics for you</h2>
              <ImageSlideshow images={jhopeImages} />

              <div className="mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">About This Site</h3>
                <p className="text-gray-300 text-sm">
                  Jung Ho-seok or J-Hope is babu's bias, unfortunately she can't watch it live right now so here I am,
                  with an alternative way to enjoy his performances. This site features J-Hope's best performances and
                  music videos.
                </p>
              </div>
            </div>
          </div>
        </main>

        <WelcomeDialog open={showWelcomeDialog} onClose={handleWelcomeDialogClose} />
        <SpotifyPlaylist open={showSpotifyPlaylist} onClose={() => setShowSpotifyPlaylist(false)} />
      </div>
    </div>
  )
}
