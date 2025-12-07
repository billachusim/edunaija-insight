import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SchoolPhoto } from '@/types/school';

interface PhotoGalleryProps {
  photos: SchoolPhoto[];
  className?: string;
}

const photoTypeLabels: Record<string, string> = {
  compound: 'School Compound',
  toilet: 'Toilets',
  classroom: 'Classrooms',
  dining: 'Dining Area',
  playground: 'Playground',
  waste_area: 'Waste Area',
  staff_toilet: 'Staff Toilets',
  uncompleted_building: 'Uncompleted Buildings',
  erosion: 'Erosion Areas',
  car_park: 'Car Park',
  teachers_quarters: "Teachers' Quarters",
};

export function PhotoGallery({ photos, className }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;
  
  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };
  
  return (
    <>
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer glass-card"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={photo.photo_url}
              alt={photo.caption || photoTypeLabels[photo.photo_type] || 'School photo'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {photoTypeLabels[photo.photo_type] || photo.photo_type}
              </span>
              {photo.caption && (
                <p className="text-sm text-foreground mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl p-0 bg-background/95 backdrop-blur-xl border-border">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.photo_url}
                alt={selectedPhoto.caption || 'School photo'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {photoTypeLabels[selectedPhoto.photo_type] || selectedPhoto.photo_type}
                </span>
                {selectedPhoto.caption && (
                  <p className="text-lg text-foreground mt-2">
                    {selectedPhoto.caption}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedIndex !== null && `${selectedIndex + 1} of ${photos.length}`}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
