"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Send, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12">
          <div className="rounded-2xl bg-primary/5 px-6 py-10 sm:py-12 md:px-12 lg:px-16">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Recevez votre inspiration quotidienne
              </h3>
              <p className="mt-2.5 text-muted-foreground">
                Inscrivez-vous à notre newsletter pour recevoir des versets, méditations et ressources spirituelles.
              </p>
              <div className="mt-6 flex max-w-md mx-auto gap-x-4">
                <Input
                  type="email"
                  placeholder="Entrez votre email"
                  className="min-w-0 flex-auto"
                />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-lg">FOIConnectee</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre compagnon spirituel pour une foi vivante et connectée au quotidien.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation Rapide</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/bible" className="text-muted-foreground hover:text-primary">
                  Bible en Ligne
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-muted-foreground hover:text-primary">
                  Plans de Lecture
                </Link>
              </li>
              <li>
                <Link href="/temoignages" className="text-muted-foreground hover:text-primary">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/bibliotheque" className="text-muted-foreground hover:text-primary">
                  Bibliothèque
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/guide" className="text-muted-foreground hover:text-primary">
                  Guide d'Utilisation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/conditions" className="text-muted-foreground hover:text-primary">
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-primary">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                  Politique de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FOIConnectee. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}