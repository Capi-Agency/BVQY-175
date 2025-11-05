import { directusClient } from "@/src/lib/directus"

export const fnGetPageBySlug = async (slug: string) => {
  try {
    const query = `
    query {
      pages_by_id (id: "${slug}") {
        raw_content
      }
    }
  `
    const response = await directusClient.query(query)
    const pageContent = response?.pages_by_id?.raw_content
    return pageContent
  } catch (error) {
    console.log("Error getting page: ", error)
  }

}