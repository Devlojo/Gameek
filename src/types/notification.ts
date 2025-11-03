import { z } from "zod";
import { reviewStatusEnum } from "./review";
export const notificationDbSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  receiver_id: z.number(),
  type: z.string(),
  target_type: z.string(),
  target_id: z.number(),
  is_read: z.boolean(),
  created_at: z.string(),
});

// Pour ajouter des propriétes dans le tableau d'objet notifications, il faut d'abord ajouter les nouvelles propriétés
export const notificationItemFullSchema = notificationDbSchema.extend({
  sender_name: z.string(),
  avatar: z.string(),
  game_name: z.string(),
  slug: z.string(),
  status: reviewStatusEnum,
});

// Créer ensuite le tableau d'objet en lui donnant en argument les items complet
export const notificationFullSchema = z.object({
  notifications: z.array(notificationItemFullSchema),
});

export type TNotificationDb = z.infer<typeof notificationDbSchema>;
export type TNotificationFull = z.infer<typeof notificationFullSchema>;
export type TNotification = z.infer<typeof notificationItemFullSchema>;
