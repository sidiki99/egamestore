import { useEffect, useRef, useState } from "react";

const useSlider = () => {
  const sliderRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // Get Card Width
  const getCardWidth = () => {
    const slider = sliderRef.current;

    if (!slider || !slider.children.length) {
      return 0;
    }

    const card = slider.children[0];

    const cardWidth = card.getBoundingClientRect().width;

    const gap =
      parseFloat(window.getComputedStyle(slider).gap) || 0;

    return cardWidth + gap;
  };

  // Scroll to next manually
  const next = () => {
    const slider = sliderRef.current;
    const cardWidth = getCardWidth();

    if (!slider || !cardWidth) {
      return;
    }

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      setCurrentCard(0);
      return;
    }

    slider.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    setCurrentCard((prev) => prev + 1);
  };

  // Scroll to previous manually
  const prev = () => {
    const slider = sliderRef.current;
    const cardWidth = getCardWidth();

    if (!slider || !cardWidth) {
      return;
    }

    if (slider.scrollLeft <= 5) {
      return;
    }

    slider.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });

    setCurrentCard((prev) => Math.max(prev - 1, 0));
  };

  // Set Total Cards
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const calculateCards = () => {
      const cards = slider.children.length;

      setTotalCards(cards);
    };

    calculateCards();

    window.addEventListener("resize", calculateCards);

    return () => {
      window.removeEventListener("resize", calculateCards);
    };
  }, []);

  // Check current card while scrolling
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const handleScroll = () => {
      const cardWidth = getCardWidth();

      if (!cardWidth) {
        return;
      }

      const card = Math.round(slider.scrollLeft / cardWidth);

      setCurrentCard(card);
    };

    handleScroll();

    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Go to specific card
  const goToCard = (card) => {
    const cardWidth = getCardWidth();

    if (!cardWidth || !sliderRef.current) {
      return;
    }

    sliderRef.current.scrollTo({
      left: card * cardWidth,
      behavior: "smooth",
    });

    setCurrentCard(card);
  };

  // =========================
  // AUTO SLIDER
  // =========================
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const autoSlide = setInterval(() => {
      const cardWidth = getCardWidth();

      if (!cardWidth) {
        return;
      }

      const maxScroll = slider.scrollWidth - slider.clientWidth;

      // If reached the end, go back to first card
      if (slider.scrollLeft >= maxScroll - 5) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setCurrentCard(0);
      } else {
        // Otherwise move one card
        slider.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });

        setCurrentCard((prev) => prev + 1);
      }
    }, 3000);

    return () => {
      clearInterval(autoSlide);
    };
  }, []);

  return {
    next,
    prev,
    sliderRef,
    currentCard,
    totalCards,
    goToCard,
  };
};

export default useSlider;