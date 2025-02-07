"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { BibleNavigation } from "@/components/bible/bible-navigation"
import { BibleReader } from "@/components/bible/bible-reader"
import { BibleProgress } from "@/components/bible/bible-progress"
import { ReadingSettings } from "@/components/bible/reading-settings"

export default function BiblePage() {
  const [fontSize, setFontSize] = useState("text-lg")
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId)
    setSelectedChapter(null)
  }

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter)
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card className="p-4">
            <BibleNavigation 
              onBookSelect={handleBookSelect}
              onChapterSelect={handleChapterSelect}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
            />
          </Card>
          {/* <Card className="p-4">
            <BibleProgress />
          </Card> */}
        </aside>
        <div className="space-y-6">
          <Card className="p-6">
            <ReadingSettings fontSize={fontSize} onFontSizeChange={setFontSize} />
            <BibleReader 
              fontSize={fontSize} 
              bookId={selectedBook}
              chapterNumber={selectedChapter}
              onChapterChange={handleChapterSelect}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}