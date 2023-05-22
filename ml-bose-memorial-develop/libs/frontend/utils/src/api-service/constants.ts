import { environment } from '@kleeen/environment';

export const ENDPOINT_URL = environment.settings.middlewareAPI;

export const GRAPHQL_ENDPOINT = `${ENDPOINT_URL}/graphql`;
