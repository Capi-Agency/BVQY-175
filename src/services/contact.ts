import { directusClient } from "@/src/lib/directus";

interface ContactFormInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  message?: string | null;
}

export const fnSendContact = async ({ fullName, email, phoneNumber, message }: ContactFormInfo) => {
  try {
    const query = `
        mutation {
            create_contact_tickets_item (data: {
              full_name: "${fullName}",
              email: "${email}",
              phone_number: "${phoneNumber}",
              message: "${message}",
            })
        }
    `;

    const response = await directusClient.query(query);
    return response?.create_contact_tickets_item
  } catch (error) {
    console.log("Error sending contact: ", error)
  }
}