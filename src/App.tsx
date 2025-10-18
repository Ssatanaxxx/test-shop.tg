import React, { useState, useEffect, useCallback } from "react";
import UISearch from "./components/UISearch/UISearch";
import Hero from "./components/Hero/Hero";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Filters from "./components/Filters/Filters";
import Footer from "./components/Footer/Footer";
import type { Product, Category, ApiMainResponse, FilterParams } from "./types/types";
import { useApi } from "./hooks/useApi";
import "./App.css";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { MenuNavigation } from "./components/MenuNavigation/MenuNavigation";
import { UIMenuItem } from "./components/UI-Kit/UIMenuItem/UIMenuItem";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { loading, fetchMainProducts, fetchFilteredProducts } = useApi();

  // Загрузка основных данных
  useEffect(() => {
    const loadMainProducts = async () => {
      try {
        const data: ApiMainResponse = await fetchMainProducts();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setCategories(data.categories || []);
        setPopularSearches(
          data.special_project_parameters_json?.fast_search_strings
            ?.parameters_list || []
        );
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    loadMainProducts();
  }, [fetchMainProducts]);

  const applyFilters = useCallback(async () => {
    const filters: FilterParams = {
      per_page: 50,
      page: 1,
    };

    if (searchQuery.trim()) {
      filters.search = searchQuery;
    }

    if (selectedCategory !== null) {
      filters.category = selectedCategory;
    }

    // Если нет фильтров - показываем все товары
    if (!filters.search && !filters.category) {
      setFilteredProducts(products);
      return;
    }

    try {
      const filtered = await fetchFilteredProducts(filters);
      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Failed to filter products:", error);
      const locallyFiltered = products.filter(product => {
        const matchesSearch = !searchQuery || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || true; // Для простоты
        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(locallyFiltered);
    }
  }, [searchQuery, selectedCategory, fetchFilteredProducts, products]);

  // Объединенный эффект для поиска и фильтрации по категории с дебаунсом
  useEffect(() => {
    const timeoutId = setTimeout(applyFilters, 300);
    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  // Обработчик сброса фильтров
  const handleCategoryChange = useCallback((categoryId: number | null) => {
    setSelectedCategory(categoryId);
    // Можно сбросить поиск при выборе категории, если нужно:
    // if (categoryId !== null) {
    //   setSearchQuery("");
    // }
  }, []);

  // Обработчик поиска
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Можно сбросить категорию при поиске, если нужно:
    // if (query.trim()) {
    //   setSelectedCategory(null);
    // }
  }, []);

  return (
    <div className="app">
      <NavigationBar />
      <MenuNavigation />
      
      <UISearch 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      
      <Hero />
      
      <div className="container">
        <Filters
          categories={categories}
          popularSearches={popularSearches}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onPopularSearchClick={handleSearchChange}
        />
        
        <ProductGrid 
          products={filteredProducts} 
          loading={loading}
        />
      </div>
      
      <Footer />
      <UIMenuItem />
    </div>
  );
};

export default App;