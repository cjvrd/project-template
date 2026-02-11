import { Request, Response } from "express";
import { ContactService } from "./contacts.service";
import { contactFormSchema } from "@project-template/shared";

export const ContactController = {
  getContacts: async (_req: Request, res: Response) => {
    const contacts = await ContactService.getContacts();
    res.json(contacts);
  },

  addContact: async (req: Request, res: Response) => {
    const parsed = contactFormSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid request body", details: parsed.error.issues });
    }

    const result = await ContactService.addContact(parsed.data);
    res.status(201).json(result);
  },

  deleteContact: async (req: Request, res: Response) => {
    const result = await ContactService.deleteContact(req.params.id);
    if (!result) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(result);
  },

  verifyContact: async (req: Request, res: Response) => {
    const result = await ContactService.verifyContact(req.params.id);
    if (!result) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(result);
  },
};
