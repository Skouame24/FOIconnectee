"use client"

import { Button } from "@/components/ui/button"
import { 
  ZoomIn, 
  ZoomOut,
  Bookmark,
  Share2,
  Sun,
  Moon,
  Type
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ReadingSettingsProps {
  fontSize: string
  onFontSizeChange: (size: string) => void
}

export function ReadingSettings({ fontSize, onFontSizeChange }: ReadingSettingsProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-6 border-b">
      <div className="flex items-center gap-2">
        <Select value={fontSize} onValueChange={onFontSizeChange}>
          <SelectTrigger className="w-[180px]">
            <Type className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Taille du texte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text-base">Normal</SelectItem>
            <SelectItem value="text-lg">Grand</SelectItem>
            <SelectItem value="text-xl">Très grand</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="h-4 w-4 hidden dark:block" />
        </Button>
      </div>
    </div>
  )
}