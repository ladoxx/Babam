import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

interface GalleryGridProps {
  items?: GalleryItem[];
  categories?: string[];
}

const GalleryGrid = ({
  items = [
    {
      id: "1",
      title: "Işıklı Tabela",
      category: "isikli",
      imageUrl:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80",
      description: "Modern tasarımlı ışıklı tabela örneği",
    },
    {
      id: "2",
      title: "Kutu Harf",
      category: "kutu-harf",
      imageUrl:
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&q=80",
      description: "Özel tasarım kutu harf çalışması",
    },
    {
      id: "3",
      title: "Totem Tabela",
      category: "totem",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      description: "Yüksek görünürlüklü totem tabela",
    },
    {
      id: "4",
      title: "Pleksi Tabela",
      category: "pleksi",
      imageUrl:
        "https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=800&q=80",
      description: "Modern pleksi tabela tasarımı",
    },
    {
      id: "5",
      title: "Işıklı Tabela",
      category: "isikli",
      imageUrl:
        "https://images.unsplash.com/photo-1515965885361-f1e0095517ea?w=800&q=80",
      description: "Gece görünümlü ışıklı tabela",
    },
    {
      id: "6",
      title: "Kutu Harf",
      category: "kutu-harf",
      imageUrl:
        "https://images.unsplash.com/photo-1579541591970-e5a7882a53af?w=800&q=80",
      description: "Paslanmaz çelik kutu harf",
    },
    {
      id: "7",
      title: "Dijital Baskı",
      category: "dijital",
      imageUrl:
        "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=800&q=80",
      description: "Yüksek çözünürlüklü dijital baskı",
    },
    {
      id: "8",
      title: "Araç Giydirme",
      category: "arac",
      imageUrl:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      description: "Profesyonel araç giydirme çalışması",
    },
  ],
  categories = [
    "tumu",
    "isikli",
    "kutu-harf",
    "totem",
    "pleksi",
    "dijital",
    "arac",
  ],
}: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState("tumu");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredItems =
    activeCategory === "tumu"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const categoryLabels: Record<string, string> = {
    tumu: "Tümü",
    isikli: "Işıklı Tabelalar",
    "kutu-harf": "Kutu Harfler",
    totem: "Totem Tabelalar",
    pleksi: "Pleksi Tabelalar",
    dijital: "Dijital Baskılar",
    arac: "Araç Giydirme",
  };

  return (
    <div className="w-full bg-white py-8 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Galeri
        </h2>
        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Profesyonel tabela çalışmalarımızdan örnekleri inceleyebilirsiniz.
          Kategorilere göre filtreleyerek size uygun tabela tiplerini keşfedin.
        </p>

        <Tabs
          defaultValue="tumu"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 rounded-full"
              >
                {categoryLabels[category] || category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    <CardContent className="p-0">
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-blue-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {categoryLabels[item.category]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedItem && (
          <DialogContent className="sm:max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <AspectRatio ratio={1}>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-orange-500 font-medium mb-4">
                  {categoryLabels[selectedItem.category]}
                </p>
                <p className="text-gray-600">{selectedItem.description}</p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Özellikler
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Yüksek kalite malzeme</li>
                    <li>Uzun ömürlü kullanım</li>
                    <li>Özel tasarım seçenekleri</li>
                    <li>Profesyonel montaj hizmeti</li>
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
