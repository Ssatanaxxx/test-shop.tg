import React from 'react';
import type { Category } from '../../types/types';
import './Filters.css';

interface FiltersProps {
  categories: Category[];
  popularSearches: string[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  onPopularSearchClick?: (search: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
}) => {
  return (
    <div className="filters">
      <div className="filters__categories-scroll">
        <div className="filters__categories">
          <button
            className={`filters__category ${selectedCategory === null ? 'filters__category--active' : ''}`}
            onClick={() => onCategoryChange(null)}
          >
            Все
          </button>
          {categories.slice(0, 6).map(category => (
            <button
              key={category.Category_ID}
              className={`filters__category ${selectedCategory === category.Category_ID ? 'filters__category--active' : ''}`}
              onClick={() => onCategoryChange(category.Category_ID)}
            >
              {category.Category_Name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;