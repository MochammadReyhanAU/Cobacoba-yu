import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, Lightbulb, Award, ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import { AdBanner } from "@/components/ad-banner"

const values = [
  {
    icon: Target,
    title: "Berorientasi Misi",
    description: "Memberdayakan tim untuk mencapai keunggulan melalui metodologi agile dan perbaikan berkelanjutan.",
  },
  {
    icon: Users,
    title: "Fokus Komunitas",
    description: "Membangun jaringan praktisi yang kuat untuk berbagi pengetahuan dan saling mendukung pertumbuhan.",
  },
  {
    icon: Lightbulb,
    title: "Berorientasi Inovasi",
    description: "Mempromosikan solusi kreatif dan pendekatan adaptif untuk tantangan manajemen proyek modern.",
  },
  {
    icon: Award,
    title: "Berkomitmen pada Kualitas",
    description:
      "Menyediakan konten dan sumber daya berkualitas tinggi yang memberikan dampak nyata dalam praktik profesional.",
  },
]

const timeline = [
  {
    year: "2022",
    title: "Peluncuran Platform",
    description: "Agilenesia.id resmi diluncurkan sebagai platform komunitas untuk praktisi agile di Indonesia.",
  },
  {
    year: "2022",
    title: "Ekspansi Konten",
    description: "Mulai memproduksi konten video reguler dan memperluas perpustakaan artikel dengan kontribusi ahli.",
  },
  {
    year: "2023",
    title: "Pertumbuhan Komunitas",
    description: "Mencapai 5.000+ anggota komunitas dan menjalin kemitraan dengan organisasi agile terkemuka.",
  },
  {
    year: "2024",
    title: "Evolusi Platform",
    description:
      "Meluncurkan fitur-fitur yang disempurnakan dan meningkatkan pengalaman pengguna berdasarkan masukan komunitas.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-[10%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Tentang Agilenesia
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Tentang Kami</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Agilenesia adalah media komunitas yang mempublikasikan tulisan kolom dan video mengenai topik dan isu
                  agile, ditulis dan diproduksi oleh para praktisi project management.
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Tentang Agilenesia"
                width={500}
                height={400}
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-[10%] bg-white">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Misi Kami</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Memulai dengan memproduksi konten podcast dan diskusi via zoom yang membahas topik-topik terkait agile sejak
            awal pandemi, Agilenesia kemudian mencoba membuat konten video monolog tentang Agile 101 yang ditayangkan di
            Youtube dengan nama akun Agilenesia TV.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Mengawali tahun 2022, tepatnya pada 1 Januari 2022, Agilenesia meluncurkan website agilenesia.id. Tulisan
            yang dimuat ditujukan terkait dengan topik agile, project management, dan inovasi. Namun, kami tetap terbuka
            untuk memuat topik-topik lain yang dapat membagikan inspirasi positif yang dapat mendorong pembaca untuk
            menjadi lebih baik.
          </p>
        </div>
      </section>

      {/* Mid Banner Ad */}
      <section className="py-6 px-[10%] bg-gray-100">
        <AdBanner size="large" />
      </section>

      {/* Values Section */}
      <section className="py-20 px-[10%]">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prinsip-prinsip yang memandu komunitas dan pembuatan konten kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-[10%] bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Perjalanan Kami</h2>
          <p className="text-xl text-gray-600">Tonggak penting dalam pertumbuhan dan evolusi komunitas kami</p>
        </div>

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.year.slice(-2)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <Badge variant="outline">{item.year}</Badge>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-[10%] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-center">
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ingin Berbagi Cerita Anda?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Ingin berbagi tulisan di agilenesia.id? Kirim ke: info@agilenesia.id
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="mr-2 h-4 w-4" />
                Hubungi Kami
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
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
