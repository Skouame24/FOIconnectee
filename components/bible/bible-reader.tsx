"use client"

import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Bookmark,
  Share2
} from "lucide-react"

interface BibleReaderProps {
  fontSize: string
}

export function BibleReader({ fontSize }: BibleReaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jean 3</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`space-y-4 ${fontSize}`}>
        <p>
          <sup className="text-sm text-muted-foreground">1</sup> Il y avait un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs,
        </p>
        <p>
          <sup className="text-sm text-muted-foreground">2</sup> qui vint, lui, auprès de Jésus, de nuit, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui.
        </p>
        {/* Add more verses */}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Chapitre précédent
        </Button>
        <Button variant="outline">
          Chapitre suivant
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}