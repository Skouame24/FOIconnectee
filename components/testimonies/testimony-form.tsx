"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useReactMediaRecorder } from "react-media-recorder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mic, Video, Type, Loader2, Youtube } from "lucide-react"

interface TestimonyFormProps {
  onClose: () => void
}

export function TestimonyForm({ onClose }: TestimonyFormProps) {
  const [mediaType, setMediaType] = useState<"text" | "audio" | "video" | "youtube">("text")
  const { register, handleSubmit } = useForm()
  
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: mediaType === "video",
    audio: mediaType === "audio",
  })

  const [isRecording, setIsRecording] = useState(false)

  const handleRecord = () => {
    if (isRecording) {
      stopRecording()
      setIsRecording(false)
    } else {
      startRecording()
      setIsRecording(true)
    }
  }

  const onSubmit = (data: any) => {
    // Handle form submission with media
    console.log(data, mediaBlobUrl)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Partager votre témoignage</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label>Comment souhaitez-vous partager ?</Label>
            <RadioGroup
              defaultValue="text"
              onValueChange={(value: "text" | "audio" | "video" | "youtube") => setMediaType(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="text"
                  id="text"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="text"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Type className="mb-3 h-6 w-6" />
                  Texte
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="audio"
                  id="audio"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="audio"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Mic className="mb-3 h-6 w-6" />
                  Audio
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="video"
                  id="video"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="video"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Video className="mb-3 h-6 w-6" />
                  Vidéo
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="youtube"
                  id="youtube"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="youtube"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Youtube className="mb-3 h-6 w-6" />
                  YouTube
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input id="title" {...register("title")} />
            </div>

            {mediaType === "text" && (
              <div>
                <Label htmlFor="content">Votre témoignage</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  className="min-h-[200px]"
                />
              </div>
            )}

            {(mediaType === "audio" || mediaType === "video") && (
              <div className="space-y-4">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "default"}
                  onClick={handleRecord}
                >
                  {status === "recording" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Arrêter l'enregistrement
                    </>
                  ) : (
                    <>
                      {mediaType === "audio" ? <Mic className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                      Commencer l'enregistrement
                    </>
                  )}
                </Button>

                {mediaBlobUrl && (
                  <div className="rounded-lg border p-4">
                    {mediaType === "audio" ? (
                      <audio src={mediaBlobUrl} controls className="w-full" />
                    ) : (
                      <video src={mediaBlobUrl} controls className="w-full" />
                    )}
                  </div>
                )}
              </div>
            )}

            {mediaType === "youtube" && (
              <div>
                <Label htmlFor="youtubeUrl">Lien YouTube</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  {...register("youtubeUrl")}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Partager</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}