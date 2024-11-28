"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ChevronRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const bibleBooks = {
  "Ancien Testament": [
    { name: "Genèse", chapters: 50 },
    { name: "Exode", chapters: 40 },
    { name: "Lévitique", chapters: 27 },
    // Add more books
  ],
  "Nouveau Testament": [
    { name: "Matthieu", chapters: 28 },
    { name: "Marc", chapters: 16 },
    { name: "Luc", chapters: 24 },
    // Add more books
  ]
}

export function BibleNavigation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Navigation</h2>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un livre..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(bibleBooks).map(([testament, books]) => (
            <AccordionItem key={testament} value={testament}>
              <AccordionTrigger className="text-sm font-medium">
                {testament}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {books
                    .filter(book => 
                      book.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((book) => (
                      <div key={book.name}>
                        <Button
                          variant={selectedBook === book.name ? "secondary" : "ghost"}
                          className="w-full justify-between text-sm"
                          onClick={() => setSelectedBook(book.name)}
                        >
                          {book.name}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        {selectedBook === book.name && (
                          <div className="ml-4 mt-2 grid grid-cols-5 gap-2">
                            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
                              <Button
                                key={chapter}
                                variant={selectedChapter === chapter ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8"
                                onClick={() => setSelectedChapter(chapter)}
                              >
                                {chapter}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}