import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Menu,
  X,
  Clock,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children = <div>Page content</div> }: LayoutProps) => {
  const [showMobileCallButton, setShowMobileCallButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowMobileCallButton(true);
        setScrolled(true);
      } else {
        setShowMobileCallButton(false);
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-black tracking-tight text-primary">
                SIGN
              </span>
              <span className="text-3xl font-black tracking-tight text-secondary">
                CRAFT
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-800 hover:text-secondary transition-colors"
            >
              ANA SAYFA
            </Link>
            <Link
              to="/hakkimizda"
              className="text-sm font-medium text-gray-800 hover:text-secondary transition-colors"
            >
              HAKKIMIZDA
            </Link>
            <Link
              to="/hizmetlerimiz"
              className="text-sm font-medium text-gray-800 hover:text-secondary transition-colors"
            >
              HİZMETLERİMİZ
            </Link>
            <Link
              to="/galeri"
              className="text-sm font-medium text-gray-800 hover:text-secondary transition-colors"
            >
              GALERİ
            </Link>
            <Link
              to="/iletisim"
              className="text-sm font-medium text-gray-800 hover:text-secondary transition-colors"
            >
              İLETİŞİM
            </Link>
          </nav>

          {/* Quick Call Button */}
          <Button className="hidden md:flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white shadow-md">
            <Phone size={16} />
            <span>0555 123 4567</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-gray-50"
            >
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-primary">
                      SIGN
                    </span>
                    <span className="text-2xl font-black tracking-tight text-secondary">
                      CRAFT
                    </span>
                  </div>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-800 hover:text-secondary transition-colors"
                  >
                    ANA SAYFA
                  </Link>
                  <Link
                    to="/hakkimizda"
                    className="text-base font-medium text-gray-800 hover:text-secondary transition-colors"
                  >
                    HAKKIMIZDA
                  </Link>
                  <Link
                    to="/hizmetlerimiz"
                    className="text-base font-medium text-gray-800 hover:text-secondary transition-colors"
                  >
                    HİZMETLERİMİZ
                  </Link>
                  <Link
                    to="/galeri"
                    className="text-base font-medium text-gray-800 hover:text-secondary transition-colors"
                  >
                    GALERİ
                  </Link>
                  <Link
                    to="/iletisim"
                    className="text-base font-medium text-gray-800 hover:text-secondary transition-colors"
                  >
                    İLETİŞİM
                  </Link>
                </nav>
                <Button className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white shadow-md">
                  <Phone size={16} />
                  <span>0555 123 4567</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Fixed Mobile Call Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 md:hidden ${showMobileCallButton ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      >
        <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white rounded-full p-4 shadow-lg">
          <Phone size={20} />
          <span className="font-bold">Hemen Ara</span>
        </Button>
      </div>

      <footer className="bg-primary text-white py-16">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white">
                SIGN
              </span>
              <span className="text-2xl font-black tracking-tight text-secondary">
                CRAFT
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Profesyonel tabela çözümleri ile işletmenizin görünürlüğünü
              artırıyoruz. Kaliteli malzeme ve uzman ekibimizle hizmetinizdeyiz.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  to="/hakkimizda"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetlerimiz"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  to="/iletisim"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">İletişim Bilgileri</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-secondary" />
                <span className="text-sm text-gray-300">
                  Örnek Mahallesi, Tabela Caddesi No:123, İstanbul
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-secondary" />
                <span className="text-sm text-gray-300">0555 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-secondary" />
                <span className="text-sm text-gray-300">
                  info@signcraft.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Çalışma Saatleri</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    Pazartesi - Cuma
                  </span>
                  <span className="text-sm text-gray-300">08:30 - 18:30</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    Cumartesi
                  </span>
                  <span className="text-sm text-gray-300">09:00 - 17:00</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    Pazar
                  </span>
                  <span className="text-sm text-gray-300">Kapalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} SignCraft. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
