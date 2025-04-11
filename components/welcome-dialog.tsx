"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { videos } from "@/lib/data"

interface WelcomeDialogProps {
  open: boolean
  onClose: (name: string, favoriteVideoId: string) => void
}

export default function WelcomeDialog({ open, onClose }: WelcomeDialogProps) {
  const [name, setName] = useState("")
  const [favoriteVideoId, setFavoriteVideoId] = useState(videos[0].id)
  const [nameError, setNameError] = useState("")

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError("Please enter your name")
      return
    }
    onClose(name, favoriteVideoId)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleSubmit()
      }}
    >
      <DialogContent className="sm:max-w-md text-white border-gray-700"
      style={{
        backgroundImage: "url('/hope.jpg')",
        backgroundSize: "cover",
      }}>
        <DialogHeader>
          <DialogTitle className="text-xl text-orange-400">Hi, to continue, please answer..</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name?
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (e.target.value.trim()) setNameError("")
              }}
              placeholder="Enter your name"
              className="bg-gray-700/20 border-gray-600 text-white"
            />
            {nameError && <p className="text-red-400 text-sm">{nameError}</p>}
          </div>

           {/* Scrollable Song List */}
    <div className="space-y-2">
      <Label className="text-white">Your Favorite J-Hope Song</Label>
      <div className="max-h-52 overflow-y-auto pr-2 custom-scrollbar">
        <RadioGroup value={favoriteVideoId} onValueChange={setFavoriteVideoId} className="space-y-2">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={video.id}
                id={`song-${video.id}`}
                className="border-gray-500 text-orange-400"
              />
              <Label htmlFor={`song-${video.id}`} className="text-gray-300">
                {video.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Let's Start!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
