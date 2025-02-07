"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, MoreVertical, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { testimoniesApi, type Testimony } from "@/lib/api/testimonies";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

export function TestimonyList() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      setIsLoading(true);
      const data = await testimoniesApi.getAll();
      setTestimonies(data);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les témoignages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReaction = async (testimonyId: string) => {
    try {
      const testimony = testimonies.find((t) => t.id === testimonyId);
      if (!testimony) return;

      if (testimony.reactions?.hasReacted) {
        await testimoniesApi.removeReaction(testimonyId);
      } else {
        await testimoniesApi.addReaction(testimonyId);
      }

      // Mise à jour optimiste de l'interface
      setTestimonies((prev) =>
        prev.map((t) => {
          if (t.id === testimonyId) {
            const currentReactions = t._count.reactions;
            return {
              ...t,
              _count: {
                ...t._count,
                reactions: t.reactions?.hasReacted
                  ? currentReactions - 1
                  : currentReactions + 1,
              },
              reactions: {
                count: t.reactions?.hasReacted
                  ? currentReactions - 1
                  : currentReactions + 1,
                hasReacted: !t.reactions?.hasReacted,
              },
            };
          }
          return t;
        })
      );
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de réagir au témoignage",
        variant: "destructive",
      });
    }
  };

  const toggleComments = async (testimonyId: string) => {
    if (!expandedComments.includes(testimonyId)) {
      try {
        const comments = await testimoniesApi.getComments(testimonyId);
        setTestimonies((prev) =>
          prev.map((testimony) => {
            if (testimony.id === testimonyId) {
              return {
                ...testimony,
                comments,
              };
            }
            return testimony;
          })
        );
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les commentaires",
          variant: "destructive",
        });
      }
    }

    setExpandedComments((prev) =>
      prev.includes(testimonyId)
        ? prev.filter((id) => id !== testimonyId)
        : [...prev, testimonyId]
    );
  };

  const submitComment = async (testimonyId: string) => {
    const content = newComments[testimonyId];
    if (!content?.trim()) return;

    try {
      const newComment = await testimoniesApi.addComment(testimonyId, content);
      setTestimonies((prev) =>
        prev.map((testimony) => {
          if (testimony.id === testimonyId) {
            return {
              ...testimony,
              comments: [...(testimony.comments || []), newComment],
              _count: {
                ...testimony._count,
                comments: testimony._count.comments + 1,
              },
            };
          }
          return testimony;
        })
      );

      setNewComments((prev) => ({
        ...prev,
        [testimonyId]: "",
      }));

      toast({
        title: "Succès",
        description: "Commentaire ajouté",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire",
        variant: "destructive",
      });
    }
  };

  const shareTestimony = async (testimony: Testimony) => {
    try {
      await navigator.share({
        title: testimony.title,
        text: testimony.content,
        url: window.location.href,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de partager le témoignage",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (testimonies.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun témoignage pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {testimonies.map((testimony) => (
        <Card key={testimony.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {testimony.user?.name ? testimony.user.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimony.user?.name || "Anonyme"}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(testimony.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Signaler</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{testimony.title}</h2>
              <p className="text-base leading-relaxed">{testimony.content}</p>
            </div>

            <div className="flex gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className={testimony.reactions?.hasReacted ? "text-primary" : ""}
                onClick={() => toggleReaction(testimony.id)}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    testimony.reactions?.hasReacted ? "fill-current" : ""
                  }`}
                />
                {testimony._count.reactions}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComments(testimony.id)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {testimony._count.comments}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => shareTestimony(testimony)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>

            {expandedComments.includes(testimony.id) && (
              <div className="mt-4 space-y-4">
                <div className="border-t pt-4 space-y-4">
                  {testimony.comments?.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {comment.author ? comment.author[0] : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-medium text-sm">
                            {comment.author || "Anonyme"}
                          </p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ajouter un commentaire..."
                    value={newComments[testimony.id] || ""}
                    onChange={(e) =>
                      setNewComments((prev) => ({
                        ...prev,
                        [testimony.id]: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        submitComment(testimony.id);
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    onClick={() => submitComment(testimony.id)}
                    disabled={!newComments[testimony.id]?.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}