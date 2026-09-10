import { useEffect, useRef, useState } from "react"

const useSlider=()=>{
  const sliderRef = useRef(null);
  const [currentCard,setCurrentCard] = useState(0);
  const[totalCards,setTotalCards]= useState(0);

  // Get Card Width
  const getCardWidth=()=>{
    const slider = sliderRef.current;

    if(!slider || !slider.children.length){
      return 0
    }

    const card = slider.children[0];

    const cardWidth = card.getBoundingClientRect().width;

    const gap = parseFloat(
      window.getComputedStyle(slider).gap
    ) || 0;

    return cardWidth + gap;
  }

  // Scroll to next
  const next = ()=>{
    const cardWidth = getCardWidth();

    if(currentCard >= totalCards - 1){
      return
    }

    sliderRef.current?.scrollBy({
      left:cardWidth,
      behavior:"smooth",
    });

    setCurrentCard((prev)=>prev + 1);
  };

  // Scroll to prev
  const prev =()=>{
    const cardWidth = getCardWidth();

    if(currentCard <= 0){
      return
    }

    sliderRef.current?.scrollBy({
      left:-cardWidth,
      behavior:"smooth"
    });

    setCurrentCard((prev)=>prev - 1);
  };

  // Set Total Cards
  useEffect(()=>{
    const slider = sliderRef.current;

    if(!slider){
      return
    }

    const calculateCards=(()=>{
      const cards = slider.children.length;

      setTotalCards(cards);
    })

    calculateCards()

    window.addEventListener("resize", calculateCards);

    return () => {
      window.removeEventListener("resize", calculateCards);
    };
  },[])

  // to check current card
  useEffect(()=>{
    const slider = sliderRef.current

    if(!slider){
      return
    }

    const handleScroll=(()=>{
      const cardWidth = getCardWidth();

      if(!cardWidth){
        return
      }

      const card = Math.round(
        slider.scrollLeft/cardWidth
      )

      setCurrentCard(card);
    })

    handleScroll();

    slider.addEventListener("scroll",handleScroll);

    return()=>{
      slider.removeEventListener("scroll",handleScroll)
    }

  },[])

  // go to card
  const goToCard=((card)=>{
    const cardWidth = getCardWidth();

    sliderRef.current?.scrollTo({
      left: card*cardWidth,
      behavior: "smooth",
    })

    setCurrentCard(card);
  })

  return{
    next,prev,sliderRef,currentCard,totalCards,goToCard
  }

}

export default useSlider;