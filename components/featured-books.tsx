"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FeaturedBooks() {
  const books = [
    {
      title: "La Puissance de la Prière",
      author: "Jean Dupont",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      category: "Prière",
    },
    {
      title: "Vivre par la Foi",
      author: "Marie Martin",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      category: "Foi",
    },
    {
      title: "Le Chemin de la Grâce",
      author: "Paul Richard",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
      category: "Théologie",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card key={book.title} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {book.category}
            </div>
            <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">par {book.author}</p>
            <Button className="w-full">Lire maintenant</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}