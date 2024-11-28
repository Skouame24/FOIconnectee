"use client"

import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy } from "lucide-react"

export function BibleProgress() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold mb-4">Ma Progression</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nouveau Testament</span>
              <span className="text-primary">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ancien Testament</span>
              <span className="text-primary">30%</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm">234 chapitres lus</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="text-sm">15 jours consécutifs</span>
        </div>
      </div>

      <Card className="p-4 bg-primary/5 border-none">
        <div className="space-y-3">
          <h3 className="font-medium">Plan de lecture actuel</h3>
          <p className="text-sm text-muted-foreground">
            La Bible en 1 an - Jour 45
          </p>
          <Button className="w-full">
            Continuer la lecture
          </Button>
        </div>
      </Card>
    </div>
  )
}