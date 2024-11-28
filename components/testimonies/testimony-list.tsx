"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const testimonies = [
  {
    id: 1,
    author: "Marie L.",
    avatar: "ML",
    date: "Il y a 2 heures",
    content: "Je veux partager comment Dieu a transformé ma vie à travers la prière. Après des mois de lutte...",
    category: "Prière",
    likes: 42,
    comments: 12,
  },
  {
    id: 2,
    author: "Pierre D.",
    avatar: "PD",
    date: "Il y a 5 heures",
    content: "Un témoignage de guérison qui m'a profondément touché lors de notre dernière réunion...",
    category: "Guérison",
    likes: 38,
    comments: 8,
  },
]

export function TestimonyList() {
  return (
    <div className="space-y-6">
      {testimonies.map((testimony) => (
        <Card key={testimony.id} className="p-6 transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{testimony.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimony.author}</p>
                <p className="text-sm text-muted-foreground">{testimony.date}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Signaler</DropdownMenuItem>
                <DropdownMenuItem>Masquer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {testimony.category}
            </div>
            <p className="text-base leading-relaxed">{testimony.content}</p>
            
            <div className="flex gap-4 pt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Heart className="h-4 w-4 mr-2" />
                {testimony.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4 mr-2" />
                {testimony.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}