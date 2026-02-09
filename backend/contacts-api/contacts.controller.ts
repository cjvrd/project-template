import { Request, Response } from "express";
import { ContactService } from "./contacts.service";
import { z } from "zod";

const zContactReq = z.object({
  first_name: z.string().min(1, "first_name is required"),
  last_name: z.string().min(1, "last_name is required"),
  email: z.string().email("invalid email address"),
  phone: z
    .string()
    .regex(/^(?:\+61|0)4(?:[ -]?\d){8}$/, "invalid phone number"),
  notes: z.string().max(1000).nullable(),
});

export type ContactReq = z.infer<typeof zContactReq>;

export const ContactController = {
  getContacts: async (_req: Request, res: Response) => {
    const contacts = await ContactService.getContacts();
    res.json(contacts);
  },

  addContact: async (req: Request, res: Response) => {
    const parsed = zContactReq.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const result = await ContactService.addContact(parsed.data);
    res.status(201).json(result);
  },

  deleteContact: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const result = await ContactService.deleteContact(id);
    if (!result) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(result);
  },

  verifyContact: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const result = await ContactService.verifyContact(id);
    if (!result) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(result);
  },
};
