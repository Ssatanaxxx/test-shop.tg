import React from "react";
import type { Product } from "../../types/types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const getMainImage = () => {
    const mainImage =
      product.images.find((img) => img.MainImage) || product.images[0];
    return mainImage?.Image_URL || mainImage?.image_url || "";
  };

  const getBadgeType = () => {
    if (product.marks.some((mark) => mark.Mark_Name === "sale")) return "sale";
    if (product.marks.some((mark) => mark.Mark_Name === "new")) return "new";
    if (product.marks.some((mark) => mark.Mark_Name === "hit")) return "hit";
    return null;
  };

  const badgeType = getBadgeType();

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={getMainImage()}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {badgeType && (
          <span
            className={`product-card__badge product-card__badge--${badgeType}`}
          >
            {badgeType.toUpperCase()}
          </span>
        )}
      </div>

      <div className="product-card__info">
        <div className="product-card__pricing">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          {product.old_price && product.old_price > product.price && (
            <span className="product-card__old-price">
              {formatPrice(product.old_price)}
            </span>
          )}
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <button className="product-card__button">Выбрать</button>
      </div>
    </div>
  );
};

export default ProductCard;
