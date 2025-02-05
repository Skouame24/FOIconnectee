"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import ReactPlayer from "react-player"
import { motion } from "framer-motion"

const videos = [
  {
    id: "1",
    title: "Le pouvoir de la prière",
    description: "Un témoignage puissant sur la façon dont la prière a transformé ma vie...",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&h=450&fit=crop",
    author: {
      name: "Marie Laurent",
      avatar: "ML"
    },
    likes: 245,
    comments: 18,
    category: "Témoignages"
  },
  {
    id: "2",
    title: "Guérison miraculeuse",
    description: "Comment Dieu m'a guéri d'une maladie incurable...",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=450&fit=crop",
    author: {
      name: "Pierre Dubois",
      avatar: "PD"
    },
    likes: 189,
    comments: 23,
    category: "Miracles"
  }
]

interface VideoGridProps {
  category: string
}

export function VideoGrid({ category }: VideoGridProps) {
  const filteredVideos = category === "all" 
    ? videos 
    : videos.filter(video => video.category === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{video.author.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.author.name}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Heart className="h-4 w-4 mr-2" />
                  {video.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {video.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground ml-auto">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}