"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Search } from "lucide-react"
import { BookFilters } from "@/components/library/book-filters"
import { BookGrid } from "@/components/library/book-grid"
import { BookReader } from "@/components/library/book-reader"

export default function BiblioPage() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bibliothèque Chrétienne</h1>
        <p className="text-muted-foreground">
          Découvrez notre collection de livres chrétiens pour approfondir votre foi
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <BookFilters />
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par titre, auteur..." 
                className="pl-9"
              />
            </div>
            <Tabs defaultValue="recent" className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Récents</TabsTrigger>
                <TabsTrigger value="popular">Populaires</TabsTrigger>
                <TabsTrigger value="recommended">Recommandés</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <BookGrid onBookSelect={setSelectedBook} />
        </div>
      </div>

      {selectedBook && (
        <BookReader bookId={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  )
}