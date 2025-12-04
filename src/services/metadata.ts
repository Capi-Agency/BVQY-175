import { directusClientWithRest } from "@/src/lib/directus"
import { readSingleton } from "@directus/sdk"

export const fnGetMetadata = async () => {
  try {
    const res = await directusClientWithRest.request(readSingleton("metadata", {
      fields: ["top_navigation", "bottom_navigation", "contact_information", "header_script"]
    }))
    return res
  } catch (error) {
    console.log("Error getting metadata: ", error)
  }
}