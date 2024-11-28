import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Heart, MessageCircle, BookText, ChevronRight } from "lucide-react";
import { VerseOfDay } from "@/components/verse-of-day";
import { ReadingPlans } from "@/components/reading-plans";
import { RecentTestimonies } from "@/components/recent-testimonies";
import { FeaturedBooks } from "@/components/featured-books";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center space-y-6 p-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Enrichissez Votre Vie Spirituelle
          </h1>
          <p className="text-xl text-white/90">
            Découvrez une nouvelle façon de vivre votre foi au quotidien
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              Commencer
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Verse of the Day */}
        <section>
          <VerseOfDay />
        </section>

        {/* Reading Plans Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Plans de Lecture</h2>
              <p className="text-muted-foreground mt-1">
                Suivez votre progression spirituelle
              </p>
            </div>
            <Button variant="ghost">Voir tous les plans</Button>
          </div>
          <ReadingPlans />
        </section>

        {/* Featured Books */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Bibliothèque</h2>
              <p className="text-muted-foreground mt-1">
                Ressources pour approfondir votre foi
              </p>
            </div>
            <Button variant="ghost">Explorer la bibliothèque</Button>
          </div>
          <FeaturedBooks />
        </section>

        {/* Recent Testimonies */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Témoignages Récents</h2>
              <p className="text-muted-foreground mt-1">
                Partagez et découvrez des histoires inspirantes
              </p>
            </div>
            <Button variant="ghost">Voir tous les témoignages</Button>
          </div>
          <RecentTestimonies />
        </section>
      </div>
      <Footer />

    </main>
  );
}