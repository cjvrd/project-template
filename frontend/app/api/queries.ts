import { queryOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "./constants";
import type { Contact } from "@project-template/shared";

export type { Contact } from "@project-template/shared";

const ContactQueries = {
  getAllContacts: () =>
    queryOptions<Contact[]>({
      queryKey: ["contacts"],
      queryFn: async (): Promise<Contact[]> => {
        const response = await fetch(`${API_URL}/contacts`);
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error || "Failed to get contacts list");
        }
        return response.json();
      },
    }),
};

export const useGetAllContacts = () =>
  useQuery(ContactQueries.getAllContacts());
