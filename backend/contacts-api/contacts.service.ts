import { ContactRepository } from "./contacts.repository";
import { ContactReq } from "./contacts.controller";

export const ContactService = {
  getContacts: async () => ContactRepository.getAllContacts(),

  addContact: async (contact: ContactReq) =>
    ContactRepository.createNewContact(contact),

  deleteContact: async (id: number) => ContactRepository.deleteContact(id),

  verifyContact: async (id: number) => ContactRepository.verifyContact(id),
};
