"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = [
  "Tous",
  "Théologie",
  "Vie Chrétienne",
  "Prière",
  "Famille",
  "Leadership",
  "Évangélisation",
  "Études Bibliques",
  "Témoignages",
  "Histoire de l'Église",
]

export function BookFilters() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Catégories</h2>
      <ScrollArea className="h-[calc(100vh-15rem)]">
        <div className="space-y-1 pr-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "ghost"}
              className={cn(
                "w-full justify-start font-normal",
                category === selectedCategory && "font-medium"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}