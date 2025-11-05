import { directusClient } from "@/src/lib/directus"

export const fnGetMetadata = async () => {
  try {
    const query = `
    query {
      metadata {
        top_navigation
        bottom_navigation
        header_script
        contact_information
      }
    }
  `

    const response = await directusClient.query(query)
    return response.metadata
  } catch (error) {
    console.log("Error getting metadata: ", error)
  }
}