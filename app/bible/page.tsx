"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BibleNavigation } from "@/components/bible/bible-navigation"
import { BibleReader } from "@/components/bible/bible-reader"
import { BibleProgress } from "@/components/bible/bible-progress"
import { ReadingSettings } from "@/components/bible/reading-settings"

export default function BiblePage() {
  const [fontSize, setFontSize] = useState("text-lg")

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card className="p-4">
            <BibleNavigation />
          </Card>
          <Card className="p-4">
            <BibleProgress />
          </Card>
        </aside>
        <div className="space-y-6">
          <Card className="p-6">
            <ReadingSettings fontSize={fontSize} onFontSizeChange={setFontSize} />
            <BibleReader fontSize={fontSize} />
          </Card>
        </div>
      </div>
    </div>
  )
}