// import { useCallback } from "react";
import "./MenuNavigation.css";
import CloseIcon from "../../assets/close.svg";
import TelegramIcon from "../../assets/telegramm.svg";
import SearchIcon from "../../assets/Vector.svg";
import MenuIcon from "../../assets/more.svg";

interface MenuNavigationProps {
  onClose?: () => void;
  onSearchToggle?: () => void;
  onMenuToggle?: () => void;
  telegramUrl?: string;
}

export const MenuNavigation = ({
  onClose,
  onSearchToggle,
  onMenuToggle,
  telegramUrl = "https://t.me/your_channel",
}: MenuNavigationProps) => {
  // const handleTelegramClick = useCallback(() => {
  // }, []); в случае если ссылка будет активной, можно добавить оптимизацию

  return (
    <div className="container">
      <nav className="menu-navigation" aria-label="Основная навигация">
        <ul className="menu-navigation__list">
          <li className="menu-navigation__item">
            <div className="menu-navigation__action">
              <button
                type="button"
                className="menu-navigation__button menu-navigation__button--close"
                onClick={onClose}
                aria-label="Закрыть меню"
              >
                <img src={CloseIcon} alt="" aria-hidden="true" />
                <span className="menu-navigation__label">Закрыть</span>
              </button>
            </div>
          </li>
          <li className="menu-navigation__item">
            <div className="menu-navigation__action">
              <a
                href={telegramUrl}
                className="menu-navigation__link menu-navigation__link--telegram"
                // onClick={handleTelegramClick}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Перейти в наш Telegram канал"
              >
                <img src={TelegramIcon} alt="" aria-hidden="true" />
                <span className="menu-navigation__label">наш tg-канал</span>
              </a>
            </div>
          </li>
          <li className="menu-navigation__item">
            <div className="menu-navigation__action-group">
              <button
                type="button"
                className="menu-navigation__button menu-navigation__button--search"
                onClick={onSearchToggle}
                aria-label="Открыть поиск"
              >
                <img src={SearchIcon} alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="menu-navigation__button menu-navigation__button--menu"
                onClick={onMenuToggle}
                aria-label="Открыть дополнительное меню"
              >
                <img src={MenuIcon} alt="" aria-hidden="true" />
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
