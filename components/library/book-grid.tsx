"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const books = [
  {
    id: "1",
    title: "La Puissance de la Prière",
    author: "Jean Martin",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=600",
    category: "Prière",
    rating: 4.5,
    downloads: 1234,
  },
  {
    id: "2",
    title: "Vivre par la Foi",
    author: "Marie Dubois",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=600",
    category: "Vie Chrétienne",
    rating: 4.8,
    downloads: 2341,
  },
  // Add more books here
]

interface BookGridProps {
  onBookSelect: (bookId: string) => void
}

export function BookGrid({ onBookSelect }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="group overflow-hidden">
            <div className="relative aspect-[2/3]">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{book.title}</h3>
                <p className="text-sm text-white/80">{book.author}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{book.rating}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Download className="h-4 w-4 mr-1" />
                  {book.downloads}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onBookSelect(book.id)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Lire
                </Button>
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}