"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestimonyList } from "@/components/testimonies/testimony-list"
import { TestimonyFilters } from "@/components/testimonies/testimony-filters"
import { PlusCircle } from "lucide-react"

// Charge dynamiquement le formulaire côté client uniquement
const TestimonyForm = dynamic(
  () => import("@/components/testimonies/testimony-form").then(mod => mod.TestimonyForm),
  { ssr: false }
)

export default function TemoignagesPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Témoignages</h1>
          <p className="text-muted-foreground">
            Partagez et découvrez des histoires inspirantes de foi
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Partager un témoignage
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <TestimonyFilters />
        </aside>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Input 
              placeholder="Rechercher des témoignages..." 
              className="w-full sm:max-w-sm"
            />
            <Tabs defaultValue="recent" className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Plus récents</TabsTrigger>
                <TabsTrigger value="popular">Plus populaires</TabsTrigger>
                <TabsTrigger value="following">Abonnements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <TestimonyList />
        </div>
      </div>

      {showForm && <TestimonyForm onClose={() => setShowForm(false)} />}
    </div>
  )
}