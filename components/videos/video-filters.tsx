"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "Toutes les vidéos" },
  { id: "testimonies", label: "Témoignages" },
  { id: "teachings", label: "Enseignements" },
  { id: "worship", label: "Louange" },
  { id: "miracles", label: "Miracles" },
  { id: "missions", label: "Missions" },
  { id: "youth", label: "Jeunesse" },
  { id: "family", label: "Famille" },
]

interface VideoFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function VideoFilters({ selectedCategory, onCategoryChange }: VideoFiltersProps) {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Catégories</h2>
      <ScrollArea className="h-[calc(100vh-15rem)]">
        <div className="space-y-1 pr-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={category.id === selectedCategory ? "default" : "ghost"}
              className={cn(
                "w-full justify-start font-normal",
                category.id === selectedCategory && "font-medium"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}