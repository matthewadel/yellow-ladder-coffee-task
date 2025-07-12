// Shared HTTP Client for Web and Mobile
export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  response?: any;
}

export class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = config.baseUrl || '';
    this.defaultTimeout = config.timeout || 10000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private async makeRequest<T>(
    url: string,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout,
    } = options;

    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      requestInit.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(fullUrl, {
        ...requestInit,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value: string, key: string) => {
        responseHeaders[key] = value;
      });

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as any;
      }

      if (!response.ok) {
        const error: HttpError = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        error.status = response.status;
        error.statusText = response.statusText;
        error.response = data;
        throw error;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (err) {
      clearTimeout(timeoutId);
      
      if (err instanceof Error && err.name === 'AbortError') {
        const timeoutError: HttpError = new Error(`Request timeout after ${timeout}ms`);
        timeoutError.status = 408;
        throw timeoutError;
      }
      
      throw err;
    }
  }

  async get<T>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, body?: any, options?: Omit<HttpRequestOptions, 'method'>): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, { ...options, method: 'POST', body });
  }

  async put<T>(url: string, body?: any, options?: Omit<HttpRequestOptions, 'method'>): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, { ...options, method: 'PUT', body });
  }

  async patch<T>(url: string, body?: any, options?: Omit<HttpRequestOptions, 'method'>): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, { ...options, method: 'PATCH', body });
  }

  async delete<T>(url: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, { ...options, method: 'DELETE' });
  }

  // Utility method to create a new instance with different config
  createInstance(config: HttpClientConfig): HttpClient {
    return new HttpClient({
      baseUrl: this.baseUrl,
      timeout: this.defaultTimeout,
      headers: this.defaultHeaders,
      ...config,
    });
  }
}

// Default instance for immediate use
export const httpClient = new HttpClient();

// Factory function for creating configured instances
export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  return new HttpClient(config);
};
