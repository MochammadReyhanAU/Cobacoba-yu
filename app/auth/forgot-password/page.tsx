import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-16 px-[10%]">
        <ForgotPasswordForm />
      </div>
      <Footer />
    </div>
  )
}
