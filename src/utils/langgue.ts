// src/utils/getLanguage.ts

import { cookies } from "next/headers";
import useStoreLanguage from "../store/store";

// ✅ Dùng trên server
export async function getServerLanguage() {
  const cookieStore = await cookies();
  return cookieStore.get("language")?.value ?? "vi";
}

// ✅ Dùng trên client
export function getClientLanguage() {
  return useStoreLanguage.getState().language ?? "vi";
}
