"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, BookOpen, Quote } from "lucide-react";
import { motion } from "framer-motion";

export function VerseOfDay() {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-2 text-primary">
            <Quote className="h-6 w-6" />
            <h3 className="text-lg font-medium">Verset du Jour</h3>
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-serif italic">
            "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
          </blockquote>
          
          <div className="flex items-center text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Jean 3:16</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="secondary" size="sm">
              Lire le chapitre
            </Button>
          </div>
        </div>

        <div className="hidden md:block w-px bg-border" />

        <div className="md:w-1/3 space-y-4">
          <h4 className="font-medium">Méditation</h4>
          <p className="text-muted-foreground">
            Ce verset nous rappelle l'amour inconditionnel de Dieu et Son sacrifice ultime pour notre salut. 
            Il nous invite à réfléchir sur la profondeur de cet amour et sur notre réponse à ce don extraordinaire.
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </Card>
  );
}