"use client"

import { Card } from "@/components/ui/card"
import ReactPlayer from "react-player"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuredVideos = [
  {
    id: 1,
    title: "Le pouvoir de la prière",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    author: "Jean Martin",
  },
  {
    id: 2,
    title: "Témoignage de guérison",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    author: "Marie Dubois",
  },
  {
    id: 3,
    title: "La foi en action",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    author: "Pierre Durand",
  },
]

export function FeaturedVideos() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Vidéos inspirantes</h2>
            <p className="text-muted-foreground mt-1">
              Découvrez des témoignages vidéo qui touchent les cœurs
            </p>
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredVideos.map((video) => (
              <CarouselItem key={video.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <ReactPlayer
                      url={video.url}
                      width="100%"
                      height="100%"
                      light={true}
                      controls={true}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.author}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}