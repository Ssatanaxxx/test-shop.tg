import { useState, useCallback } from 'react';
import type { Product, FilterParams, ApiMainResponse } from './types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMainProducts = useCallback(async (): Promise<ApiMainResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://noxer-test.ru/webapp/api/products/on_main');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiMainResponse = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFilteredProducts = useCallback(async (filters: FilterParams): Promise<Product[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (filters.per_page) queryParams.append('per_page', filters.per_page.toString());
      if (filters.page) queryParams.append('page', filters.page.toString());
      
      const url = `https://noxer-test.ru/webapp/api/products/filter?${queryParams}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: filters.search,
          category: filters.category,
          min_price: filters.min_price,
          max_price: filters.max_price
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.products || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchMainProducts,
    fetchFilteredProducts
  };
};