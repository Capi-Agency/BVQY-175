import { directusClient } from "@/src/lib/directus";

export const fnGetListHDSD = async () => {
  try {
    const query = `
        query {
            instruction_structure {
                slug
                title
                blurb
                documents {
                    document {
                        slug
                        title
                        blurb
                        sub_documents {
                           related_document {
                            title
                            slug
                           }
                        }
                    }
                }
            }
        }
    `;
    return await directusClient.query(query);
  } catch (error) {
    console.log("Error get hdsd: ", error)
  }
};

export const fnGetDetailHDSD = async (slug: string) => {
  try {
    const query = `
        query {
            documents_by_id(id: "${slug}") {
                title
                slug
                blurb
                content
            }
        }
    `;
    return await directusClient.query(query);
  } catch (error) {
    console.log("Error in hdsd: ", error)
  }
};
