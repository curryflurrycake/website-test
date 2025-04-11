"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // In a real app, you would validate credentials against a backend
    // For this demo, we'll just redirect to the dashboard
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="babu@ily.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <Button type="submit" className="w-full bg-white text-red-500 hover:bg-red/20">
        Login
      </Button>
    </form>
  )
}
