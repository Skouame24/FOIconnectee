"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export function ReadingPlans() {
  const plans = [
    {
      title: "Les Psaumes en 30 jours",
      progress: 65,
      description: "Une exploration quotidienne des Psaumes",
      currentDay: 19,
      totalDays: 30,
    },
    {
      title: "Évangile de Jean",
      progress: 45,
      description: "Découvrez la vie de Jésus",
      currentDay: 9,
      totalDays: 21,
    },
    {
      title: "Proverbes - Sagesse quotidienne",
      progress: 30,
      description: "La sagesse de Salomon",
      currentDay: 9,
      totalDays: 31,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.title} className="p-6">
          <BookOpen className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{plan.progress}%</span>
            </div>
            <Progress value={plan.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Jour {plan.currentDay} sur {plan.totalDays}
            </p>
          </div>
          <Button className="w-full mt-4">Continuer</Button>
        </Card>
      ))}
    </div>
  )
}