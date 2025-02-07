"use client"

import { useState, useEffect } from "react"
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
import bibleApi, { Book } from "@/lib/api/bible"

interface BibleNavigationProps {
  onBookSelect: (bookId: string) => void;
  onChapterSelect: (chapter: number) => void;
  selectedBook: string | null;
  selectedChapter: number | null;
}

export function BibleNavigation({ 
  onBookSelect, 
  onChapterSelect, 
  selectedBook, 
  selectedChapter 
}: BibleNavigationProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [books, setBooks] = useState<{ [key: string]: Book[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await bibleApi.getBooks();
        // Organiser les livres par testament
        const organizedBooks = booksData.reduce((acc: { [key: string]: Book[] }, book: Book) => {
          if (!acc[book.testament]) {
            acc[book.testament] = [];
          }
          acc[book.testament].push(book);
          return acc;
        }, {} as { [key: string]: Book[] });
        

        
        setBooks(organizedBooks);
      } catch (err) {
        setError("Erreur lors du chargement des livres");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
          {Object.entries(books).map(([testament, testamentBooks]) => (
            <AccordionItem key={testament} value={testament}>
              <AccordionTrigger className="text-sm font-medium">
                {testament}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {testamentBooks
                    .filter(book => 
                      book.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((book) => (
                      <div key={book.id}>
                        <Button
                          variant={selectedBook === book.id ? "secondary" : "ghost"}
                          className="w-full justify-between text-sm"
                          onClick={() => onBookSelect(book.id)}
                        >
                          {book.name}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        {selectedBook === book.id && (
                          <div className="ml-4 mt-2 grid grid-cols-5 gap-2">
                            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
                              <Button
                                key={chapter}
                                variant={selectedChapter === chapter ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8"
                                onClick={() => onChapterSelect(chapter)}
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