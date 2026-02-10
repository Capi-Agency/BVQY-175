import { createDirectus, graphql, rest } from '@directus/sdk';

const apiUrl =
  import.meta.env.PUBLIC_API_URL ||
  import.meta.env.NEXT_PUBLIC_API_URL ||
  'https://admin175.minhkhang.net/';

const directusClient = createDirectus(apiUrl).with(graphql());
const directusClientWithRest = createDirectus(apiUrl).with(rest());

export { directusClient, directusClientWithRest };
