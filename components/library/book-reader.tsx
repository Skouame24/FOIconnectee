"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface BookReaderProps {
  bookId: string
  onClose: () => void
}

export function BookReader({ bookId, onClose }: BookReaderProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>La Puissance de la Prière</DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-6">
          {/* Embed PDF viewer here */}
          <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Lecteur PDF en cours de chargement...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}