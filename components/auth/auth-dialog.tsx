"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authApi } from "@/lib/api"
import { toast } from "sonner"

interface AuthDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: (user: any) => void
}

export function AuthDialog({ open, onClose, onSuccess }: AuthDialogProps) {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      let response
      if (tab === "login") {
        response = await authApi.login({
          email: data.email,
          password: data.password,
        })
      } else {
        response = await authApi.register({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      }
      
      // Stocker le token
      localStorage.setItem("token", response.token)
      
      // Créer l'objet utilisateur avec les initiales
      const names = response.user.name.split(" ")
      const initials = names.map((n: string) => n[0]).join("").toUpperCase()
      const user = {
        ...response.user,
        avatar: initials
      }
      
      onSuccess(user)
      reset()
      onClose()
      toast.success(tab === "login" ? "Connexion réussie" : "Inscription réussie")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Bienvenue sur FOIConnectee</DialogTitle>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={(value) => setTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Chargement..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  {...register("name")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerEmail">Email</Label>
                <Input
                  id="registerEmail"
                  type="email"
                  {...register("email")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerPassword">Mot de passe</Label>
                <Input
                  id="registerPassword"
                  type="password"
                  {...register("password")}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Chargement..." : "S'inscrire"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}