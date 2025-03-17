import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Generic fetch function for API requests
 * @param endpoint API endpoint
 * @param options Fetch options
 * @returns Promise with response data
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: (error as Error).message || 'An error occurred',
    };
  }
}

/**
 * GET request helper
 * @param endpoint API endpoint
 * @param options Additional fetch options
 * @returns Promise with response data
 */
export function get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'GET',
    ...options,
  });
}

/**
 * POST request helper
 * @param endpoint API endpoint
 * @param data Request body data
 * @param options Additional fetch options
 * @returns Promise with response data
 */
export function post<T>(
  endpoint: string,
  data: any,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT request helper
 * @param endpoint API endpoint
 * @param data Request body data
 * @param options Additional fetch options
 * @returns Promise with response data
 */
export function put<T>(
  endpoint: string,
  data: any,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * DELETE request helper
 * @param endpoint API endpoint
 * @param options Additional fetch options
 * @returns Promise with response data
 */
export function del<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
} 