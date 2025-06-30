import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-16 px-[10%]">
        <LoginForm />
      </div>
      <Footer />
    </div>
  )
}
