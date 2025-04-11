import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-screen"
    style={{
      backgroundImage: "url('/hope3.jpg')",
      backgroundSize: "cover",
    }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">hi :D</h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
