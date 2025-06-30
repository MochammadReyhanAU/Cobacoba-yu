import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-16 px-[10%]">
        <SignupForm />
      </div>
      <Footer />
    </div>
  )
}
