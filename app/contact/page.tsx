import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Kirim email kepada kami",
    contact: "info@agilenesia.id",
    action: "mailto:info@agilenesia.id",
  },
  {
    icon: MessageCircle,
    title: "Komunitas",
    description: "Bergabung dengan diskusi kami",
    contact: "Grup Telegram",
    action: "#",
  },
  {
    icon: Phone,
    title: "Telepon",
    description: "Hubungi kami langsung",
    contact: "+62 xxx-xxxx-xxxx",
    action: "tel:+62xxxxxxxxxx",
  },
  {
    icon: MapPin,
    title: "Lokasi",
    description: "Kunjungi kantor kami",
    contact: "Jakarta, Indonesia",
    action: "#",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative text-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Kontak Kami</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jika anda memiliki pertanyaan, saran dan kritik, silakan hubungi kami dengan mengisi detail di bawah ini
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-[10%]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <method.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                  <p className="text-blue-600 font-medium">{method.contact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Methods Ads */}
      <section className="py-6 px-[10%] bg-gray-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdBanner size="small" />
          <AdBanner size="small" />
          <AdBanner size="small" />
          <AdBanner size="small" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-[10%] bg-white">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Kirim Pesan kepada Kami</CardTitle>
                <CardDescription>
                  Kami senang mendengar dari Anda. Kirim pesan dan kami akan merespons secepat mungkin.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" placeholder="Nama Anda" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@anda.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Tentang apa ini?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Isi</Label>
                  <Textarea
                    id="message"
                    placeholder="Ceritakan lebih lanjut tentang pertanyaan Anda..."
                    className="min-h-32"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" />
                  Kirim
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Additional Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hubungi Kami</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Apakah Anda memiliki pertanyaan tentang metodologi agile, ingin berkontribusi konten, atau sekadar ingin
                terhubung dengan komunitas kami, kami siap membantu.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Respons Email</p>
                    <p className="text-sm text-gray-600">Kami biasanya merespons dalam 24 jam</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dukungan Komunitas</p>
                    <p className="text-sm text-gray-600">Bergabung dengan diskusi komunitas aktif kami</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Ingin Berkontribusi?</h4>
              <p className="text-gray-600 mb-4">
                Bagikan keahlian agile Anda dengan komunitas kami. Kami menerima artikel tamu dan studi kasus.
              </p>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-4 px-[10%] bg-white border-t">
        <AdBanner size="medium" />
      </section>

      <Footer />
    </div>
  )
}
