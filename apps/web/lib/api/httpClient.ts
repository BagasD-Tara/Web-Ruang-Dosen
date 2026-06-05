import { buildApiUrl } from './apiConfig';

const DEFAULT_REQUEST_TIMEOUT_MS = 5000;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

interface ApiRequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiRequest<ResponseBody>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ResponseBody> {
  const { timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS, ...requestOptions } = options;
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const response = await fetch(buildApiUrl(path), {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      },
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new ApiRequestError(`API request failed: ${path}`, response.status);
    }

    return response.json() as Promise<ResponseBody>;
  } finally {
    clearTimeout(timeoutId);
  }
}
