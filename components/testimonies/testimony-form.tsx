"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TestimonyFormProps {
  onClose: () => void
}

export function TestimonyForm({ onClose }: TestimonyFormProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Partager un témoignage</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" placeholder="Donnez un titre à votre témoignage" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priere">Prière</SelectItem>
                <SelectItem value="guerison">Guérison</SelectItem>
                <SelectItem value="foi">Foi</SelectItem>
                <SelectItem value="miracle">Miracle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Votre témoignage</Label>
            <Textarea
              id="content"
              placeholder="Partagez votre histoire..."
              className="min-h-[200px]"
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button>Publier</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}