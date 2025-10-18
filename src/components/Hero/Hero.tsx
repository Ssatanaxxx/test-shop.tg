import React, { useState } from "react";
import "./Hero.css";
import Banner from "../../assets/Banner.svg";
// import Banner2 from "../../assets/Banner2.svg"; если захотим сделать свайп. А так даже в черновике, это баннер просто картинка
// import Banner3 from "../../assets/Banner3.svg"; если захотим сделать свайп. А так даже в черновике, это баннер просто картинка

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const images = [Banner]; // Banner2, Banner3

  const touchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  // const touchMove = (e: React.TouchEvent) => { Раз проект на 600px то я могу предположить,
  //  что он сделан исключительно для телефонов или для бота в тг, который перебрасывает пользователя на сайт
  //   if (!isSwiping) return;

  //   const currentX = e.touches[0].clientX;
  //   const diff = startX - currentX;

  //   if (Math.abs(diff) > 50) {
  //   }
  // };

  const touchEnd = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    }

    setIsSwiping(false);
  };

  const mouseStart = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsSwiping(true);
  };

  const mouseEnd = (e: React.MouseEvent) => {
    if (!isSwiping) return;

    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    }

    setIsSwiping(false);
  };

  return (
    <div className="container">
      <div className="hero-container">
        <div
          className="swipe-container"
          onTouchStart={touchStart}
          // onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          onMouseDown={mouseStart}
          onMouseUp={mouseEnd}
          onMouseLeave={() => setIsSwiping(false)}
        >
          <img
            src={images[currentImageIndex]}
            alt={`Banner ${currentImageIndex + 1}`}
            className={`hero__image ${isSwiping ? "swiping" : ""}`}
          />
          {/* Для пк, понимаю что index не приятный случай. Но эт пока пробный вариант без архива с баннерами */}
          <div className="dots-indicator">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
