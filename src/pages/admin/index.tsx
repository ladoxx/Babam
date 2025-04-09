import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, Save, Image, Home, Info, LayoutGrid, Phone, Clock, MapPin, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContentSection {
  title: string;
  content: string;
  images?: string[];
}

interface SiteContent {
  home: {
    hero: {
      title: string;
      subtitle: string;
      images: string[];
    };
    about: ContentSection;
    services: {
      title: string;
      items: Array<{ title: string; description: string; icon?: string }>;
    };
  };
  about: ContentSection;
  gallery: {
    title: string;
    description: string;
    categories: Array<{ name: string; images: string[] }>;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    workingHours: string;
    mapEmbed: string;
  };
}

const defaultContent: SiteContent = {
  home: {
    hero: {
      title: "Profesyonel Tabela ve Reklam Çözümleri",
      subtitle: "20 yıllık tecrübemizle işletmenizi öne çıkaracak tabela ve reklam çözümleri sunuyoruz.",
      images: [
        "https://images.unsplash.com/photo-1579430752506-3a565b16ed9f?w=800&q=80",
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
        "https://images.unsplash.com/photo-1542744094-24ba103e97b4?w=800&q=80"
      ]
    },
    about: {
      title: "Hakkımızda",
      content: "2003 yılından bu yana İstanbul'da hizmet veren firmamız, kurumsal kimliğinizi yansıtan kaliteli tabela ve reklam çözümleri sunmaktadır. Uzman ekibimiz ve modern ekipmanlarımızla müşteri memnuniyetini ön planda tutuyoruz."
    },
    services: {
      title: "Hizmetlerimiz",
      items: [
        { title: "Kutu Harf Tabela", description: "3 boyutlu, ışıklı veya ışıksız kutu harf tabela çözümleri" },
        { title: "Totem Tabela", description: "Yüksek görünürlük sağlayan totem tabela uygulamaları" },
        { title: "Işıklı Tabela", description: "LED ve neon teknolojili modern ışıklı tabelalar" },
        { title: "Araç Giydirme", description: "Kurumsal kimliğinizi yansıtan profesyonel araç giydirme" }
      ]
    }
  },
  about: {
    title: "Hakkımızda",
    content: "2003 yılında İstanbul'da kurulan firmamız, 20 yıllık tecrübesiyle tabela ve reklam sektöründe öncü konumdadır. Modern ekipmanlarımız ve uzman kadromuzla, müşterilerimizin ihtiyaçlarına özel çözümler sunuyoruz. Kalite ve müşteri memnuniyeti odaklı çalışma prensibimizle, küçük işletmelerden kurumsal firmalara kadar geniş bir müşteri portföyüne hizmet vermekteyiz. Tabela, totem, araç giydirme, dijital baskı ve kutu harf çalışmalarımızla markanızı en iyi şekilde temsil ediyoruz.",
    images: [
      "https://images.unsplash.com/photo-1577415124269-fc1140a69e8a?w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112c4e25b6?w=800&q=80"
    ]
  },
  gallery: {
    title: "Galeri",
    description: "Tamamladığımız bazı projelerimizi inceleyebilirsiniz.",
    categories: [
      {
        name: "Kutu Harf",
        images: [
          "https://images.unsplash.com/photo-1579430752506-3a565b16ed9f?w=800&q=80",
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80"
        ]
      },
      {
        name: "Totem",
        images: [
          "https://images.unsplash.com/photo-1542744094-24ba103e97b4?w=800&q=80",
          "https://images.unsplash.com/photo-1577415124269-fc1140a69e8a?w=800&q=80"
        ]
      },
      {
        name: "Araç Giydirme",
        images: [
          "https://images.unsplash.com/photo-1581094794329-c8112c4e25b6?w=800&q=80",
          "https://images.unsplash.com/photo-1581094794329-c8112c4e25b6?w=800&q=80"
        ]
      }
    ]
  },
  contact: {
    title: "İletişim",
    address: "Örnek Mahallesi, Tabela Sokak No:123 Kadıköy/İstanbul",
    phone: "+90 (212) 123 45 67",
    email: "info@ornektabela.com",
    workingHours: "Pazartesi - Cumartesi: 09:00 - 18:00",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.79327595882!2d28.872096660250475!3d41.00498228699284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1623228093268!5m2!1str!2str"
  }
};

const AdminPanel = () => {
  const [content, setContent] = useState<SiteContent>(() => {
    const savedContent = localStorage.getItem('siteContent');
    return savedContent ? JSON.parse(savedContent) : defaultContent;
  });
  
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [notification, setNotification] = useState<{show: boolean, message: string}>({show: false, message: ''});
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);

  useEffect(() => {
    // Load content from localStorage on initial render
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Error parsing saved content", e);
        setContent(defaultContent);
      }
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('siteContent', JSON.stringify(content));
      showNotification('İçerik başarıyla kaydedildi!');
    } catch (e) {
      console.error("Error saving content", e);
      showNotification('Hata: İçerik kaydedilemedi!', false);
    }
  };

  const showNotification = (message: string, success = true) => {
    setNotification({
      show: true,
      message
    });

    setTimeout(() => {
      setNotification({show: false, message: ''});
    }, 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: string, index?: number, categoryIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSection(section);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      setContent(prev => {
        const newContent = {...prev};
        
        if (section === 'hero') {
          if (typeof index === 'number') {
            newContent.home.hero.images[index] = base64String;
          } else {
            newContent.home.hero.images.push(base64String);
          }
        } else if (section === 'about' && typeof index === 'number') {
          if (!newContent.about.images) newContent.about.images = [];
          if (typeof index === 'number') {
            newContent.about.images[index] = base64String;
          } else {
            newContent.about.images.push(base64String);
          }
        } else if (section === 'gallery' && typeof categoryIndex === 'number' && typeof index === 'number') {
          newContent.gallery.categories[categoryIndex].images[index] = base64String;
        } else if (section === 'gallery' && typeof categoryIndex === 'number') {
          newContent.gallery.categories[categoryIndex].images.push(base64String);
        }
        
        return newContent;
      });
      
      setUploadingSection(null);
      showNotification('Görsel başarıyla yüklendi!');
    };
    
    reader.onerror = () => {
      setUploadingSection(null);
      showNotification('Görsel yüklenirken hata oluştu!', false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleAddService = () => {
    setContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        services: {
          ...prev.home.services,
          items: [
            ...prev.home.services.items,
            { title: "Yeni Hizmet", description: "Hizmet açıklaması" }
          ]
        }
      }
    }));
    setSelectedService(content.home.services.items.length);
  };

  const handleAddCategory = () => {
    setContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: [
          ...prev.gallery.categories,
          { name: "Yeni Kategori", images: [] }
        ]
      }
    }));
    setSelectedCategory(content.gallery.categories.length);
  };

  const handleRemoveService = (index: number) => {
    setContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        services: {
          ...prev.home.services,
          items: prev.home.services.items.filter((_, i) => i !== index)
        }
      }
    }));
    setSelectedService(0);
  };

  const handleRemoveCategory = (index: number) => {
    setContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: prev.gallery.categories.filter((_, i) => i !== index)
      }
    }));
    setSelectedCategory(0);
  };

  const handleRemoveImage = (section: string, index: number, categoryIndex?: number) => {
    setContent(prev => {
      const newContent = {...prev};
      
      if (section === 'hero') {
        newContent.home.hero.images = newContent.home.hero.images.filter((_, i) => i !== index);
      } else if (section === 'about' && newContent.about.images) {
        newContent.about.images = newContent.about.images.filter((_, i) => i !== index);
      } else if (section === 'gallery' && typeof categoryIndex === 'number') {
        newContent.gallery.categories[categoryIndex].images = 
          newContent.gallery.categories[categoryIndex].images.filter((_, i) => i !== index);
      }
      
      return newContent;
    });
    
    showNotification('Görsel başarıyla kaldırıldı!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Yönetim Paneli</h1>
              <p className="text-gray-600">Web sitenizin içeriğini buradan düzenleyebilirsiniz.</p>
            </div>
            
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          </div>
          
          {notification.show && (
            <Alert className={`mb-4 ${notification.message.includes('Hata') ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
              <AlertDescription>
                {notification.message}
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="home" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Ana Sayfa</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Hakkımızda</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Galeri</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">İletişim</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Ana Sayfa İçeriği */}
            <TabsContent value="home" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" /> Ana Sayfa Slider
                  </CardTitle>
                  <CardDescription>
                    Ana sayfada görünen slider içeriğini düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Başlık</Label>
                    <Input
                      id="hero-title"
                      value={content.home.hero.title}
                      onChange={(e) => setContent({
                        ...content,
                        home: {
                          ...content.home,
                          hero: {
                            ...content.home.hero,
                            title: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                    <Textarea
                      id="hero-subtitle"
                      value={content.home.hero.subtitle}
                      onChange={(e) => setContent({
                        ...content,
                        home: {
                          ...content.home,
                          hero: {
                            ...content.home.hero,
                            subtitle: e.target.value
                          }
                        }
                      })}
                      className="min-h-20"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Slider Görselleri</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.home.hero.images.map((image, index) => (
                        <div key={index} className="relative border rounded-md overflow-hidden group">
                          <img 
                            src={image} 
                            alt={`Slider ${index + 1}`} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                                <Upload className="h-4 w-4" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(e, 'hero', index)}
                                  disabled={uploadingSection !== null}
                                />
                              </label>
                              <button
                                onClick={() => handleRemoveImage('hero', index)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                disabled={content.home.hero.images.length <= 1}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {uploadingSection === 'hero' && index === content.home.hero.images.length - 1 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="border border-dashed rounded-md flex items-center justify-center h-40 bg-gray-50">
                        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Yeni Görsel Ekle</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'hero')}
                            disabled={uploadingSection !== null}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" /> Ana Sayfa Hakkımızda
                  </CardTitle>
                  <CardDescription>
                    Ana sayfadaki kısa tanıtım metnini düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="home-about-title">Başlık</Label>
                    <Input
                      id="home-about-title"
                      value={content.home.about.title}
                      onChange={(e) => setContent({
                        ...content,
                        home: {
                          ...content.home,
                          about: {
                            ...content.home.about,
                            title: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="home-about-content">İçerik</Label>
                    <Textarea
                      id="home-about-content"
                      value={content.home.about.content}
                      onChange={(e) => setContent({
                        ...content,
                        home: {
                          ...content.home,
                          about: {
                            ...content.home.about,
                            content: e.target.value
                          }
                        }
                      })}
                      className="min-h-32"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg> Hizmetlerimiz
                  </CardTitle>
                  <CardDescription>
                    Ana sayfada gösterilen hizmetleri düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="services-title">Başlık</Label>
                    <Input
                      id="services-title"
                      value={content.home.services.title}
                      onChange={(e) => setContent({
                        ...content,
                        home: {
                          ...content.home,
                          services: {
                            ...content.home.services,
                            title: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Hizmetler</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddService}
                        className="text-xs"
                      >
                        Hizmet Ekle
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="border rounded-md p-3 space-y-3">
                        <div className="space-y-1">
                          {content.home.services.items.map((service, index) => (
                            <Button
                              key={index}
                              variant={selectedService === index ? "default" : "outline"}
                              className="w-full justify-start text-left h-auto py-2 px-3"
                              onClick={() => setSelectedService(index)}
                            >
                              <span className="truncate">{service.title}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {content.home.services.items.length > 0 && (
                        <div className="border rounded-md p-4 space-y-4 md:col-span-3">
                          <div className="space-y-2">
                            <Label htmlFor="service-title">Hizmet Başlığı</Label>
                            <Input
                              id="service-title"
                              value={content.home.services.items[selectedService]?.title || ''}
                              onChange={(e) => {
                                const newServices = [...content.home.services.items];
                                newServices[selectedService] = {
                                  ...newServices[selectedService],
                                  title: e.target.value
                                };
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    services: {
                                      ...content.home.services,
                                      items: newServices
                                    }
                                  }
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="service-desc">Hizmet Açıklaması</Label>
                            <Textarea
                              id="service-desc"
                              value={content.home.services.items[selectedService]?.description || ''}
                              onChange={(e) => {
                                const newServices = [...content.home.services.items];
                                newServices[selectedService] = {
                                  ...newServices[selectedService],
                                  description: e.target.value
                                };
                                setContent({
                                  ...content,
                                  home: {
                                    ...content.home,
                                    services: {
                                      ...content.home.services,
                                      items: newServices
                                    }
                                  }
                                });
                              }}
                              className="min-h-20"
                            />
                          </div>
                          
                          {content.home.services.items.length > 1 && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveService(selectedService)}
                              className="mt-4"
                            >
                              Bu Hizmeti Sil
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Hakkımızda Sayfası */}
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" /> Hakkımızda Sayfası
                  </CardTitle>
                  <CardDescription>
                    Hakkımızda sayfasının içeriğini düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="about-title">Başlık</Label>
                    <Input
                      id="about-title"
                      value={content.about.title}
                      onChange={(e) => setContent({
                        ...content,
                        about: {
                          ...content.about,
                          title: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about-content">İçerik</Label>
                    <Textarea
                      id="about-content"
                      value={content.about.content}
                      onChange={(e) => setContent({
                        ...content,
                        about: {
                          ...content.about,
                          content: e.target.value
                        }
                      })}
                      className="min-h-40"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Görseller</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.about.images?.map((image, index) => (
                        <div key={index} className="relative border rounded-md overflow-hidden group">
                          <img 
                            src={image} 
                            alt={`Hakkımızda ${index + 1}`} 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                                <Upload className="h-4 w-4" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(e, 'about', index)}
                                  disabled={uploadingSection !== null}
                                />
                              </label>
                              <button
                                onClick={() => handleRemoveImage('about', index)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {uploadingSection === 'about' && index === (content.about.images?.length || 0) - 1 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="border border-dashed rounded-md flex items-center justify-center h-40 bg-gray-50">
                        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Yeni Görsel Ekle</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'about', content.about.images?.length || 0)}
                            disabled={uploadingSection !== null}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Galeri Sayfası */}
            <TabsContent value="gallery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5" /> Galeri Sayfası
                  </CardTitle>
                  <CardDescription>
                    Galeri sayfasının içeriğini düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery-title">Başlık</Label>
                    <Input
                      id="gallery-title"
                      value={content.gallery.title}
                      onChange={(e) => setContent({
                        ...content,
                        gallery: {
                          ...content.gallery,
                          title: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gallery-desc">Açıklama</Label>
                    <Textarea
                      id="gallery-desc"
                      value={content.gallery.description}
                      onChange={(e) => setContent({
                        ...content,
                        gallery: {
                          ...content.gallery,
                          description: e.target.value
                        }
                      })}
                      className="min-h-20"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Kategoriler</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddCategory}
                        className="text-xs"
                      >
                        Kategori Ekle
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="border rounded-md p-3 space-y-3">
                        <div className="space-y-1">
                          {content.gallery.categories.map((category, index) => (
                            <Button
                              key={index}
                              variant={selectedCategory === index ? "default" : "outline"}
                              className="w-full justify-start text-left h-auto py-2 px-3"
                              onClick={() => setSelectedCategory(index)}
                            >
                              <span className="truncate">{category.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {content.gallery.categories.length > 0 && (
                        <div className="border rounded-md p-4 space-y-4 md:col-span-3">
                          <div className="space-y-2">
                            <Label htmlFor="category-name">Kategori Adı</Label>
                            <Input
                              id="category-name"
                              value={content.gallery.categories[selectedCategory]?.name || ''}
                              onChange={(e) => {
                                const newCategories = [...content.gallery.categories];
                                newCategories[selectedCategory] = {
                                  ...newCategories[selectedCategory],
                                  name: e.target.value
                                };
                                setContent({
                                  ...content,
                                  gallery: {
                                    ...content.gallery,
                                    categories: newCategories
                                  }
                                });
                              }}
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Label>Kategori Görselleri</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {content.gallery.categories[selectedCategory]?.images.map((image, index) => (
                                <div key={index} className="relative border rounded-md overflow-hidden group">
                                  <img 
                                    src={image} 
                                    alt={`${content.gallery.categories[selectedCategory]?.name} ${index + 1}`} 
                                    className="w-full h-40 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex space-x-2">
                                      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                                        <Upload className="h-4 w-4" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => handleImageUpload(e, 'gallery', index, selectedCategory)}
                                          disabled={uploadingSection !== null}
                                        />
                                      </label>
                                      <button
                                        onClick={() => handleRemoveImage('gallery', index, selectedCategory)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="border border-dashed rounded-md flex items-center justify-center h-40 bg-gray-50">
                                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-500">Yeni Görsel Ekle</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, 'gallery', undefined, selectedCategory)}
                                    disabled={uploadingSection !== null}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          {content.gallery.categories.length > 1 && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveCategory(selectedCategory)}
                              className="mt-4"
                            >
                              Bu Kategoriyi Sil
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* İletişim Sayfası */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" /> İletişim Bilgileri
                  </CardTitle>
                  <CardDescription>
                    İletişim sayfasındaki bilgileri düzenleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-title">Başlık</Label>
                    <Input
                      id="contact-title"
                      value={content.contact.title}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          title: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" htmlFor="contact-address">
                      <MapPin className="h-4 w-4" /> Adres
                    </Label>
                    <Textarea
                      id="contact-address"
                      value={content.contact.address}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          address: e.target.value
                        }
                      })}
                      className="min-h-20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" htmlFor="contact-phone">
                      <Phone className="h-4 w-4" /> Telefon
                    </Label>
                    <Input
                      id="contact-phone"
                      value={content.contact.phone}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          phone: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" htmlFor="contact-email">
                      <Mail className="h-4 w-4" /> E-posta
                    </Label>
                    <Input
                      id="contact-email"
                      value={content.contact.email}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          email: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2" htmlFor="contact-hours">
                      <Clock className="h-4 w-4" /> Çalışma Saatleri
                    </Label>
                    <Input
                      id="contact-hours"
                      value={content.contact.workingHours}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          workingHours: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-map">Google Harita Kodu</Label>
                    <Textarea
                      id="contact-map"
                      value={content.contact.mapEmbed}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          mapEmbed: e.target.value
                        }
                      })}
                      className="min-h-20"
                      placeholder="<iframe src=\"https://www.google.com/maps/embed?...\" width=\"600\" height=\"450\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label className="mb-2 block">Harita Önizleme</Label>
                    <div className="border rounded-md overflow-hidden h-[300px]">
                      <iframe 
                        src={content.contact.mapEmbed} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy"
                        title="Konum"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;