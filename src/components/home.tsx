import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ImageSlider from "./ImageSlider";
import GalleryGrid from "./GalleryGrid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  // Sample slider images
  const sliderImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=1200&q=80",
      alt: "Neon tabela örneği",
      title: "Neon Tabelalar",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1588412079929-791b9f489fa8?w=1200&q=80",
      alt: "Kutu harf tabela örneği",
      title: "Kutu Harf Tabelalar",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=1200&q=80",
      alt: "Işıklı tabela örneği",
      title: "Işıklı Tabelalar",
    },
  ];

  // Sample services
  const services = [
    {
      id: 1,
      title: "Neon Tabelalar",
      description:
        "Modern ve dikkat çekici neon tabela çözümleri ile işletmenizi öne çıkarın.",
      icon: "✨",
    },
    {
      id: 2,
      title: "Kutu Harf Tabelalar",
      description:
        "Profesyonel görünüm için özel tasarım kutu harf tabelalar üretiyoruz.",
      icon: "📦",
    },
    {
      id: 3,
      title: "Işıklı Tabelalar",
      description:
        "Gece de görünür olmak için ışıklı tabela çözümlerimizden faydalanın.",
      icon: "💡",
    },
    {
      id: 4,
      title: "Dijital Baskı",
      description:
        "Yüksek kaliteli dijital baskı hizmetimiz ile tabelalarınız uzun ömürlü olur.",
      icon: "🖨️",
    },
  ];

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&q=80",
      alt: "Cafe tabelası",
      category: "neon",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1563199539405-f77de6dc0be1?w=600&q=80",
      alt: "Restaurant tabelası",
      category: "kutu-harf",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1595758378938-1d1f1a36208c?w=600&q=80",
      alt: "Mağaza tabelası",
      category: "isikli",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1581373449483-44cb85246bfc?w=600&q=80",
      alt: "Otel tabelası",
      category: "neon",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1606953163351-f218ef6f52de?w=600&q=80",
      alt: "Ofis tabelası",
      category: "kutu-harf",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1625046586358-c5b9d16b8e47?w=600&q=80",
      alt: "Dükkan tabelası",
      category: "isikli",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slider */}
      <section className="relative">
        <ImageSlider images={sliderImages} />
        <div className="absolute bottom-8 right-8 z-10">
          <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full p-6 shadow-lg animate-pulse">
            <Phone className="mr-2 h-6 w-6" />
            <span className="text-lg font-bold">Hemen Ara</span>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
            Hakkımızda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                20 yılı aşkın tecrübemizle, işletmenizin ihtiyaçlarına uygun
                profesyonel tabela çözümleri sunuyoruz. Müşteri memnuniyetini ön
                planda tutarak, kaliteli malzemeler ve uzman ekibimizle hizmet
                vermekteyiz.
              </p>
              <p className="text-gray-700">
                Modern tasarım anlayışımız ve yenilikçi çözümlerimizle
                işletmenizin görünürlüğünü artırıyor, markanızın değerine değer
                katıyoruz. Tabela ihtiyaçlarınız için doğru adrestesiniz.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&q=80"
                alt="Tabela atölyemiz"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Galeri
          </h2>
          <GalleryGrid images={galleryImages} />
          <div className="text-center mt-8">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              Tüm Çalışmalarımızı Gör
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            İletişim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Bize Ulaşın
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">📍</span> Tabela Sokak No:123, İstanbul
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">📞</span> +90 555 123 45 67
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="mr-2">✉️</span> info@tabelaci.com
                </p>
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2 text-primary">
                    Çalışma Saatleri
                  </h4>
                  <p className="text-gray-700">
                    Pazartesi - Cuma: 09:00 - 18:00
                  </p>
                  <p className="text-gray-700">Cumartesi: 09:00 - 14:00</p>
                  <p className="text-gray-700">Pazar: Kapalı</p>
                </div>
              </div>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              {/* Google Maps iframe would go here */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  Google Maps Haritası Burada Görüntülenecek
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-primary/90 text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tabela Ustası</h3>
              <p className="text-blue-100">
                Profesyonel tabela çözümleri ile işletmenizi öne çıkarın.
                Kaliteli malzeme ve işçilik garantisi ile hizmetinizdeyiz.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hızlı Erişim</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    Ana Sayfa
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    Hizmetlerimiz
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    Galeri
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    İletişim
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">İletişim</h3>
              <p className="text-blue-100 mb-2">
                Tabela Sokak No:123, İstanbul
              </p>
              <p className="text-blue-100 mb-2">+90 555 123 45 67</p>
              <p className="text-blue-100">info@tabelaci.com</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/30 mt-8 pt-8 text-center text-blue-200">
            <p>
              &copy; {new Date().getFullYear()} Tabela Ustası. Tüm hakları
              saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
