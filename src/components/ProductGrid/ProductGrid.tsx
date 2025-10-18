import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/types';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-card product-card--skeleton">
            <div className="product-card__image-skeleton"></div>
            <div className="product-card__info-skeleton">
              <div className="skeleton-line skeleton-line--title"></div>
              <div className="skeleton-line skeleton-line--price"></div>
              <div className="skeleton-line skeleton-line--button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <p>Товары не найдены</p>
        <p className="product-grid__empty-sub">Попробуйте изменить поисковый запрос</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;