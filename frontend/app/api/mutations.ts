import { mutationOptions, useMutation } from "@tanstack/react-query";
import { GlobalQueryClient } from "~/query-client";
import type { ContactFormData } from "@project-template/shared";
import { API_URL } from "./constants";

const ContactMutations = {
  addContact: () => {
    return mutationOptions({
      mutationFn: async (contact: ContactFormData) => {
        const response = await fetch(`${API_URL}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error || "Failed to add contact");
        }
        return response.json();
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
  deleteContact: () => {
    return mutationOptions({
      mutationFn: async (contactId: string) => {
        const response = await fetch(`${API_URL}/contacts/${contactId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "DELETED" }),
        });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error || "Failed to delete contact");
        }
        return response.ok;
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
  verifyContact: () => {
    return mutationOptions({
      mutationFn: async (contactId: string) => {
        const response = await fetch(`${API_URL}/contacts/${contactId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verified: true }),
        });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error || "Failed to verify contact");
        }
        return response.json();
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
};

export const useAddContact = () => useMutation(ContactMutations.addContact());
export const useDeleteContact = () =>
  useMutation(ContactMutations.deleteContact());
export const useVerifyContact = () =>
  useMutation(ContactMutations.verifyContact());
