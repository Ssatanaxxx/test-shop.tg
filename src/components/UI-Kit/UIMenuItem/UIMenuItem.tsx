import React from "react";
import HomeIcon from "../../../assets/MenuListIcon/home.svg";
import CatalogIcon from "../../../assets/MenuListIcon/catalog.svg";
import FavoriteIcon from "../../../assets/MenuListIcon/favorite.svg";
import CartIcon from "../../../assets/MenuListIcon/cart.svg";
import ProfileIcon from "../../../assets/MenuListIcon/account.svg";
import "./UIMenuItem.css";

export interface MenuItem {
  id: string;
  icon: string;
  onClick?: () => void;
  badge?: number;
}

export interface UIMenuItemProps {
  items?: MenuItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
}

export const UIMenuItem: React.FC<UIMenuItemProps> = ({
  items = defaultItems,
  activeItem,
  onItemClick,
  className = ""
}) => {
  const handleItemClick = (item: MenuItem) => {
    onItemClick?.(item.id);
    item.onClick?.();
  };

  return (
    <div className={`container ${className}`}>
      <div className="menu-item__container">
        <nav aria-label="Основное меню">
          <ul className="menu-item__list">
            {items.map((item) => (
              <li key={item.id} className="menu-item__item">
                <button
                  className={`menu-item__item-btn ${
                    activeItem === item.id ? "menu-item__item-btn--active" : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                  aria-current={activeItem === item.id ? "page" : undefined}
                >
                  <img src={item.icon} alt="" aria-hidden="true" />
                  {item.badge && item.badge > 0 && (
                    <span className="menu-item__badge">{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const defaultItems: MenuItem[] = [
  {
    id: "home",
    icon: HomeIcon,
  },
  {
    id: "catalog",
    icon: CatalogIcon,
  },
  {
    id: "favorite",
    icon: FavoriteIcon,
  },
  {
    id: "cart",
    icon: CartIcon,
    badge: 0,
  },
  {
    id: "profile",
    icon: ProfileIcon,
  },
];