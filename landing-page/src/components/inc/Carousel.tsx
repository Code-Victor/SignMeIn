import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";

type Props = {
  itemsLength: number;
  selectedIndex: number;
};
const Dots = ({ itemsLength, selectedIndex }: Props) => {
  const arr = new Array(itemsLength).fill(0);
  return (
    <div className="flex gap-1 my-2 justify-center -translate-y-5">
      {arr.map((_, index) => {
        const selected = index === selectedIndex;
        return (
          <div
            className={
              "h-2 w-2 rounded-full transition-all duration-300 bg-indigo-400 " +
              (!selected ? "opacity-50" : "")
            }
            key={index}
          ></div>
        );
      })}
    </div>
  );
};

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
};

const Carousel = (props: PropType) => {
  const { children, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="">
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      <Dots itemsLength={scrollSnaps.length} selectedIndex={selectedIndex} />
    </div>
  );
};
function Slide({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"ml-2 relative flex-[0_0_100%] " + className}>
      {children}
    </div>
  );
}

Carousel.Slide = Slide;
export default Carousel;
