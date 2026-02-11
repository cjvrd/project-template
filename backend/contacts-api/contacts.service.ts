import { ContactRepository } from "./contacts.repository";
import type { ContactFormData } from "@project-template/shared";

export const ContactService = {
  getContacts: async () => ContactRepository.getAllContacts(),

  addContact: async (contact: ContactFormData) =>
    ContactRepository.createNewContact(contact),

  deleteContact: async (id: string) => ContactRepository.deleteContact(id),

  verifyContact: async (id: string) => ContactRepository.verifyContact(id),
};
