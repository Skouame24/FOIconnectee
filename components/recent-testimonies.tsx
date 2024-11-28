"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"

export function RecentTestimonies() {
  const testimonies = [
    {
      author: "Sophie L.",
      avatar: "SL",
      date: "Il y a 2 jours",
      content: "La prière a transformé ma vie d'une manière extraordinaire...",
      likes: 24,
      comments: 8,
    },
    {
      author: "Marc D.",
      avatar: "MD",
      date: "Il y a 3 jours",
      content: "Après des années de doute, j'ai enfin trouvé la paix...",
      likes: 32,
      comments: 12,
    },
    {
      author: "Anne M.",
      avatar: "AM",
      date: "Il y a 4 jours",
      content: "Un miracle s'est produit dans ma famille...",
      likes: 45,
      comments: 15,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonies.map((testimony) => (
        <Card key={testimony.author} className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback>{testimony.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{testimony.author}</p>
              <p className="text-sm text-muted-foreground">{testimony.date}</p>
            </div>
          </div>
          <p className="mb-4">{testimony.content}</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              {testimony.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              {testimony.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}