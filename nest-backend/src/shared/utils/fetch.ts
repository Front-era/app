import { isServer, PORT } from '../constants/env';

const envAwareFetch = (url: string, options?: Record<string, unknown>) => {
  const fetchUrl =
    isServer && url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;

  return fetch(fetchUrl as RequestInfo, options as RequestInit).then((res) =>
    res.json(),
  );
};

export { envAwareFetch };
