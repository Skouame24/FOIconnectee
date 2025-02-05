"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoGrid } from "@/components/videos/video-grid"
import { VideoFilters } from "@/components/videos/video-filters"
import { Search } from "lucide-react"

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vidéos Chrétiennes</h1>
        <p className="text-muted-foreground">
          Découvrez des témoignages vidéo inspirants et des enseignements enrichissants
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <VideoFilters 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher des vidéos..." 
                className="pl-9"
              />
            </div>
            <Tabs defaultValue="recent" className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Récentes</TabsTrigger>
                <TabsTrigger value="popular">Populaires</TabsTrigger>
                <TabsTrigger value="featured">En vedette</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <VideoGrid category={selectedCategory} />
        </div>
      </div>
    </div>
  )
}