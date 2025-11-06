import { directusClient } from "@/src/lib/directus";

export interface ContactInfo {
  name: string;
  email?: string | null;
  phone: string;
  message: string;
}

export const fnSendContact = async ({ name, email, phone, message }: ContactInfo) => {
  try {
    const query = `
        mutation {
            create_contact_tickets_item (data: {
              full_name: "${name}",
              email: "${email}",
              phone_number: "${phone}",
              message: "${message?.trim()}",
            })
        }
    `;

    const response = await directusClient.query(query);
    return response?.create_contact_tickets_item
  } catch (error) {
    console.log("Error sending contact: ", error)
  }
}