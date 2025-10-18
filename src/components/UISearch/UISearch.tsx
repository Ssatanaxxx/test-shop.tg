import React, { useRef, useEffect } from "react";
import "./UISearch.css";
import SearchIcon from "../../assets/search.svg"; // Импортируем иконку

interface UISearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  label?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const UISearch: React.FC<UISearchProps> = ({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  label = "Поиск товаров",
  autoFocus = false,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = "search-input";

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    onSearchChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="container">
      <div className="search-field">
        <label htmlFor={inputId} className="search-field__label">
          {label}
        </label>

        <div className="search-field__input-wrapper">
          <img
            src={SearchIcon}
            alt=""
            className="search-field__icon"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            className="search-field__input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            disabled={disabled}
            enterKeyHint="search"
            placeholder="Найти товары" 
          />
          {searchQuery && (
            <button
              type="button"
              className="search-field__clear"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UISearch;
