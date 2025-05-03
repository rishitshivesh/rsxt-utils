"use client";

import type React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
// import Image from "next/image";
import { cn } from "./utils";
import type { ImageTrackProps, ImageProps } from "./types";

export const DraggableImageTrack: React.FC<ImageTrackProps> = ({
  images = defaultImages,
  className,
  sourceLink,
  youtubeLink,
  gap = "4vmin",
  imageWidth = "40vmin",
  imageHeight = "56vmin",
  animationDuration = 1200,
  backgroundColor = "black",
  enableDrag = true,
  enableScroll = true,
  scrollSensitivity = 1,
  enableSSR = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseDownAt, setMouseDownAt] = useState<string>("0");
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Handle SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize image refs
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length);
  }, [images]);

  const animateTrack = useCallback(
    (nextPercentage: number) => {
      if (!trackRef.current) return;

      setPercentage(nextPercentage);

      // Animate the track position
      trackRef.current.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: animationDuration, fill: "forwards" }
      );

      // Animate each image's object position
      const imageElements = trackRef.current.querySelectorAll(".track-image");
      imageElements.forEach((img) => {
        img.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: animationDuration, fill: "forwards" }
        );
      });
    },
    [animationDuration]
  );

  // Drag interaction handlers
  const handleOnDown = useCallback((clientX: number) => {
    setMouseDownAt(clientX.toString());
  }, []);

  const handleOnUp = useCallback(() => {
    setMouseDownAt("0");
    setPrevPercentage(percentage);
  }, [percentage]);

  const handleOnMove = useCallback(
    (clientX: number) => {
      if (mouseDownAt === "0" || !trackRef.current || !enableDrag) return;

      const mouseDelta = Number.parseFloat(mouseDownAt) - clientX;
      const maxDelta = window.innerWidth / 2;

      const nextPercentageUnconstrained =
        prevPercentage + (mouseDelta / maxDelta) * -100;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      animateTrack(nextPercentage);
    },
    [mouseDownAt, prevPercentage, enableDrag, animateTrack]
  );

  // Scroll interaction handler
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!enableScroll || !trackRef.current) return;

      e.preventDefault();

      const delta = e.deltaY * scrollSensitivity * 0.01;
      const nextPercentageUnconstrained = prevPercentage - delta * 10;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      animateTrack(nextPercentage);
      setPrevPercentage(nextPercentage);
    },
    [enableScroll, prevPercentage, scrollSensitivity, animateTrack]
  );

  // Set up event listeners
  useEffect(() => {
    if (!isMounted) return;

    const currentContainer = containerRef.current;

    // Set up drag event listeners if enabled
    let cleanupDragListeners = () => {};
    if (enableDrag) {
      const handleMouseDown = (e: MouseEvent) => {
        // Only handle drag if the click is on the track or an image
        if (
          trackRef.current?.contains(e.target as Node) ||
          (e.target as HTMLElement).closest(".image")
        ) {
          handleOnDown(e.clientX);
        }
      };
      const handleTouchStart = (e: TouchEvent) => {
        // Only handle drag if the touch is on the track or an image
        if (
          trackRef.current?.contains(e.target as Node) ||
          (e.target as HTMLElement).closest(".image")
        ) {
          handleOnDown(e.touches[0].clientX);
        }
      };
      const handleMouseUp = () => handleOnUp();
      const handleTouchEnd = () => handleOnUp();
      const handleMouseMove = (e: MouseEvent) => handleOnMove(e.clientX);
      const handleTouchMove = (e: TouchEvent) =>
        handleOnMove(e.touches[0].clientX);

      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);

      cleanupDragListeners = () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }

    // Set up scroll event listeners if enabled
    let cleanupScrollListeners = () => {};
    if (enableScroll && currentContainer) {
      currentContainer.addEventListener("wheel", handleScroll, {
        passive: false,
      });

      cleanupScrollListeners = () => {
        currentContainer?.removeEventListener("wheel", handleScroll);
      };
    }

    return () => {
      cleanupDragListeners();
      cleanupScrollListeners();
    };
  }, [
    isMounted,
    enableDrag,
    enableScroll,
    handleOnDown,
    handleOnUp,
    handleOnMove,
    handleScroll,
  ]);

  // Apply initial transform to track
  useEffect(() => {
    if (trackRef.current && isMounted) {
      trackRef.current.style.transform = `translate(${percentage}%, -50%)`;

      // Set initial object position for all images
      const imageElements = trackRef.current.querySelectorAll(".track-image");
      imageElements.forEach((img: any) => {
        (img as HTMLElement).style.objectPosition = `${
          100 + percentage
        }% center`;
      });
    }
  }, [isMounted, percentage]);

  // Handle SSR
  if (!isMounted && !enableSSR) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn("h-screen w-screen overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <div
        ref={trackRef}
        className="flex absolute left-1/2 top-1/2 transform -translate-y-1/2 select-none"
        style={{ gap }}
        data-mouse-down-at={mouseDownAt}
        data-prev-percentage={prevPercentage.toString()}
        data-percentage={percentage.toString()}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="image relative"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          >
            {image.useNextImage ? (
              <div className="relative w-full h-full">
                {/* <Image
                  ref={(el: any) => (imageRefs.current[index] = el)}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || `Image ${index + 1}`}
                  fill
                  className="track-image object-cover"
                  style={{ objectPosition: "100% center" }}
                  priority={index < 2}
                  sizes={`(max-width: 768px) 80vw, ${imageWidth}`}
                  draggable="false"
                /> */}
              </div>
            ) : (
              <img
                ref={(el: any) => (imageRefs.current[index] = el)}
                className="track-image w-full h-full object-cover"
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `Image ${index + 1}`}
                draggable="false"
                style={{ objectPosition: "100% center" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Default images to use if none are provided
const defaultImages: ImageProps[] = [
  {
    src: "/majestic-mountain-vista.png",
    alt: "Mountain landscape",
    useNextImage: false,
  },
  {
    src: "/ocean-sunset-palms.png",
    alt: "Ocean sunset",
    useNextImage: false,
  },
  {
    src: "/placeholder.svg?key=x6yew",
    alt: "Misty forest",
    useNextImage: false,
  },
  {
    src: "/desert-dunes.png",
    alt: "Desert dunes",
    useNextImage: false,
  },
  {
    src: "/snowy-mountains.png",
    alt: "Snowy mountains",
    useNextImage: false,
  },
  {
    src: "/tropical-beach-paradise.png",
    alt: "Tropical beach",
    useNextImage: false,
  },
  {
    src: "/colorful-autumn-forest.png",
    alt: "Autumn forest",
    useNextImage: false,
  },
  {
    src: "/northern-lights.png",
    alt: "Northern lights",
    useNextImage: false,
  },
];

export default DraggableImageTrack;
