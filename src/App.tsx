import React, { useState, useEffect } from "react";
import UISearch from "./components/UISearch/UISearch";
import Hero from "./components/Hero/Hero";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Filters from "./components/Filters/Filters";
import Footer from "./components/Footer/Footer";
import type { Product, Category, ApiMainResponse } from "./types/types";
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

  // Поиск с дебаунсом
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim()) {
        const filters = {
          search: searchQuery,
          per_page: 50,
          page: 1,
        };
        const filtered = await fetchFilteredProducts(filters);
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchFilteredProducts, products]);

  // Фильтрация по категории
  useEffect(() => {
    if (selectedCategory !== null) {
      const filters = {
        category: selectedCategory,
        per_page: 50,
        page: 1,
      };
      const filterByCategory = async () => {
        const filtered = await fetchFilteredProducts(filters);
        setFilteredProducts(filtered);
      };
      filterByCategory();
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, fetchFilteredProducts, products]);

  return (
    <div className="app">
      <NavigationBar />
      <MenuNavigation />
      <UISearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <div className="container">
        <Filters
          categories={categories}
          popularSearches={popularSearches}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
      <Footer />
      <UIMenuItem />
    </div>
  );
};

export default App;
