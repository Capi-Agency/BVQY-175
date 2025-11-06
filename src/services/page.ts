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

export const fnGetSchemaBySlug = async (slug: string) => {
  try {
    const query = `
    query {
      pages_by_id (id: "${slug}") {
        metadata
      }
    }
  `
    const response = await directusClient.query(query)
    const schema = response?.pages_by_id?.metadata
    return schema
  } catch (error) {
    console.log("Error getting page: ", error)
  }
}

export const fnGetAllPageSlug = async () => {
  try {
    const query = `
      query {
        pages {
          slug
        }
      }
    `
    const response = await directusClient.query(query)
    return response?.pages
  } catch (error) {
    console.log("Error getting page: ", error)
  }
}


export const fnGetTopNavBySlug = async (slug: string) => {
  try {
    const query = `
    query {
      top_navigation_by_id (id: "${slug}") {
        raw_content
      }
    }
  `
    const response = await directusClient.query(query)

    const pageContent = response?.top_navigation_by_id?.raw_content
    return pageContent
  } catch (error) {
    console.log("Error getting page: ", error)
  }
}


export const fnGetBottomNavBySlug = async (slug: string) => {
  try {
    const query = `
    query {
      bottom_navigation_by_id (id: "${slug}") {
        raw_content
      }
    }
  `
    const response = await directusClient.query(query)

    const pageContent = response?.bottom_navigation_by_id?.raw_content
    return pageContent
  } catch (error) {
    console.log("Error getting page: ", error)
  }
}




