"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/config";

interface TestimonyFormProps {
  onClose: () => void;
}

interface TestimonyFormData {
  title: string;
  content: string;
}

export function TestimonyForm({ onClose }: TestimonyFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TestimonyFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: TestimonyFormData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.TESTIMONIES.BASE, {
        ...data,
        isPublished: false, // Par défaut, le témoignage est en brouillon
      });

      toast({
        title: "Témoignage créé",
        description: "Votre témoignage a été enregistré avec succès.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création du témoignage:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du témoignage.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Partager votre témoignage</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                {...register("title", { 
                  required: "Le titre est requis",
                  minLength: {
                    value: 3,
                    message: "Le titre doit contenir au moins 3 caractères"
                  }
                })} 
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Votre témoignage</Label>
              <Textarea
                id="content"
                {...register("content", { 
                  required: "Le contenu est requis",
                  minLength: {
                    value: 10,
                    message: "Le témoignage doit contenir au moins 10 caractères"
                  }
                })}
                className="min-h-[200px]"
              />
              {errors.content && (
                <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Partager"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}