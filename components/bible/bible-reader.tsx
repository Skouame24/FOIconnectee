"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark,
  Share2,
  PenLine,
  Highlighter,
  X
} from "lucide-react"
import bibleApi, { Chapter, Note, Highlight, Book } from "@/lib/api/bible"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BibleReaderProps {
  fontSize: string;
  bookId: string | null;
  chapterNumber: number | null;
  onChapterChange: (chapter: number) => void;
}

export function BibleReader({ fontSize, bookId, chapterNumber, onChapterChange }: BibleReaderProps) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [selectedVerseText, setSelectedVerseText] = useState<string>("");
  const [noteContent, setNoteContent] = useState("");
  const [currentBook, setCurrentBook] = useState<{ id: string, chapters: number } | null>(null);
  const [isHighlightMode, setIsHighlightMode] = useState(false);

  useEffect(() => {
    async function loadBookData() {
      if (!bookId) return;
      try {
        const books = await bibleApi.getBooks();
        const book = books.find((b: Book) => b.id === bookId);
        if (book) {
          setCurrentBook(book);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des informations du livre:", err);
      }
    }
    loadBookData();
  }, [bookId]);

  useEffect(() => {
    async function loadData() {
      if (!bookId || !chapterNumber) {
        setChapter(null);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const [chapterData, notesData, highlightsData] = await Promise.all([
          bibleApi.getChapter(bookId, chapterNumber),
          bibleApi.getNotes(),
          bibleApi.getHighlights()
        ]);
        setChapter(chapterData);
        setNotes(notesData);
        setHighlights(highlightsData);
      } catch (err) {
        setError("Impossible de charger les données. Veuillez réessayer.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [bookId, chapterNumber]);

  const handleAddNote = async () => {
    if (!selectedVerse || !noteContent.trim()) return;
    
    try {
      const newNote = await bibleApi.createNote(selectedVerse, noteContent);
      setNotes(prevNotes => [...prevNotes, newNote]);
      setNoteContent("");
      setSelectedVerse(null);
      setSelectedVerseText("");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la note:", err);
    }
  };

  const handleHighlight = async (verseId: string, color: string) => {
    try {
      const newHighlight = await bibleApi.createHighlight(verseId, color);
      setHighlights(prevHighlights => [...prevHighlights, newHighlight]);
      setIsHighlightMode(false);
    } catch (err) {
      console.error("Erreur lors du surlignage:", err);
    }
  };

  const colorClasses = {
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      button: "bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700"
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      button: "bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700"
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      button: "bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700"
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      button: "bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700"
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      button: "bg-pink-200 hover:bg-pink-300 dark:bg-pink-800 dark:hover:bg-pink-700"
    }
  };

  if (!bookId || !chapterNumber) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Sélectionnez un livre et un chapitre pour commencer la lecture
      </div>
    );
  }

  if (loading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (!chapter) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{chapter.id}</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsHighlightMode(!isHighlightMode)}
                  className={isHighlightMode ? "bg-secondary" : ""}
                >
                  <Highlighter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mode surlignage {isHighlightMode ? "activé" : "désactivé"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`space-y-4 ${fontSize}`}>
        {chapter.verses.map((verse) => {
          const verseNote = notes.find(n => n.verseId === verse.id);
          const verseHighlight = highlights.find(h => h.verseId === verse.id);
          
          return (
            <div key={verse.id} className="group relative p-2 -mx-2 rounded-lg hover:bg-secondary/20 transition-colors">
              <div className={`p-2 rounded-lg ${verseHighlight ? colorClasses[verseHighlight.color as keyof typeof colorClasses].bg : ''}`}>
                <div className="flex items-start gap-2">
                  <span className="text-sm text-muted-foreground min-w-[1.5rem] mt-1">{verse.number}</span>
                  <div className="flex-1">
                    <p>{verse.text}</p>
                    
                    {verseNote && (
                      <div className="mt-2 pl-4 border-l-2 border-primary/20">
                        <div className="flex items-start gap-2">
                          <PenLine className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{verseNote.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-2">
                {isHighlightMode ? (
                  <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
                    {Object.entries(colorClasses).map(([color, classes]) => (
                      <Button
                        key={color}
                        size="sm"
                        variant="ghost"
                        className={`w-6 h-6 p-0 rounded-sm ${classes.button}`}
                        onClick={() => handleHighlight(verse.id, color)}
                      />
                    ))}
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedVerse(verse.id);
                          setSelectedVerseText(verse.text);
                        }}
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter une note</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{selectedVerseText}</p>
                        </div>
                        <Textarea
                          value={noteContent}
                          onChange={(e) => setNoteContent(e.target.value)}
                          placeholder="Votre note..."
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={handleAddNote}>Enregistrer</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button 
          variant="outline"
          disabled={!chapterNumber || chapterNumber <= 1}
          onClick={() => chapterNumber && onChapterChange(chapterNumber - 1)}
          className="w-[140px]"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
        <div className="text-sm text-muted-foreground">
          Chapitre {chapterNumber} {currentBook && `sur ${currentBook.chapters}`}
        </div>
        <Button 
          variant="outline"
          disabled={!currentBook || !chapterNumber || chapterNumber >= currentBook.chapters}
          onClick={() => chapterNumber && onChapterChange(chapterNumber + 1)}
          className="w-[140px]"
        >
          Suivant
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}