import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, MobileStepper, Typography } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Div from "../../atoms/Div";

export type ImageItem = {
  src: string;
  alt?: string;
  caption?: React.ReactNode;
};

type ImageCarouselProps = {
  images: ImageItem[];
  height?: number | string;
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  loop?: boolean;
  sx?: any;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = "100%",
  autoPlay = false,
  interval = 3000,
  showIndicators = false,
  loop = true,
  sx,
}) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = images?.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerH, setContainerH] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragDeltaY, setDragDeltaY] = useState(0);
  const [animating, setAnimating] = useState(false);

  const prevIndex = (active - 1 + max) % max;
  const nextIndex = (active + 1) % max;

  useEffect(() => {
    setActive(0);
    setPaused(false);
    setDragStartY(null);
    setDragDeltaY(0);
    setAnimating(false);
  }, [images.toString()]);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current)
        setContainerH(containerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [height]);

  const slideToNext = () => {
    if (max <= 1) return;
    if (!loop && active === max - 1) {
      setAnimating(true);
      setDragDeltaY(0);
      return;
    }
    setAnimating(true);
    setDragDeltaY(-containerH);
  };

  const slideToPrev = () => {
    if (max <= 1) return;
    if (!loop && active === 0) {
      setAnimating(true);
      setDragDeltaY(0);
      return;
    }
    setAnimating(true);
    setDragDeltaY(containerH);
  };

  useEffect(() => {
    if (!autoPlay || paused || max <= 1 || animating || dragStartY !== null)
      return;
    const id = setInterval(slideToNext, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, max, animating, dragStartY]);

  if (max === 0) return null;

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      borderRadius={2}
      sx={{ backgroundColor: "neutral.200", ...sx, touchAction: "none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      minWidth={"300px"}
      height={height}
      onPointerDown={(e) => {
        setDragStartY(e.clientY);
        setPaused(true);
      }}
      onPointerMove={(e) => {
        if (dragStartY !== null && !animating) {
          setDragDeltaY(e.clientY - dragStartY);
        }
      }}
      onPointerUp={() => {
        if (dragStartY === null) return;
        const threshold = Math.min(60, containerH * 0.15);
        if (dragDeltaY <= -threshold) {
          slideToNext();
        } else if (dragDeltaY >= threshold) {
          slideToPrev();
        } else {
          setAnimating(true);
          setDragDeltaY(0);
        }
        setDragStartY(null);
        setPaused(false);
      }}
      onPointerCancel={() => {
        setAnimating(true);
        setDragDeltaY(0);
        setDragStartY(null);
        setPaused(false);
      }}
    >
      <Box
        onTransitionEnd={() => {
          if (!animating) return;
          if (dragDeltaY === -containerH) {
            setActive(nextIndex);
          } else if (dragDeltaY === containerH) {
            setActive(prevIndex);
          }
          setAnimating(false);
          setDragDeltaY(0);
        }}
        sx={{
          height: containerH ? containerH * 3 : "300%",
          transform: `translateY(${-containerH + dragDeltaY}px)`,
          transition: animating ? "transform 300ms ease" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Div
          component="video"
          src={images[prevIndex]?.src}
        //   autoPlay
          loop
          controls
          sx={{
            width: "100%",
            height: containerH || "100%",
            objectFit: "cover",
            userSelect: "none",
          }}
        />
        <Box
          position="relative"
          sx={{ width: "100%", height: containerH || "100%" }}
        >
          <Div
            component="video"
            src={images[active]?.src}
            // autoPlay
            loop
            controls
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              userSelect: "none",
            }}
          />
          {images[active]?.caption ? (
            <Box
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              p={1.5}
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0))",
                color: "neutral.100",
              }}
            >
              {typeof images[active]?.caption === "string" ? (
                <Typography variant="body2" color="neutral.100">
                  {images[active].caption}
                </Typography>
              ) : (
                images[active]?.caption
              )}
            </Box>
          ) : null}
        </Box>
        <Div
          component="video"
          src={images[nextIndex]?.src}
        //   autoPlay
          loop
          controls
          sx={{
            width: "100%",
            height: containerH || "100%",
            objectFit: "cover",
            userSelect: "none",
          }}
        />
      </Box>

      {max > 1 && (
        <>
          <IconButton
            onClick={slideToPrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.35)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
            size="small"
            aria-label="previous image"
            disabled={!loop && active === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={slideToNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.35)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
            size="small"
            aria-label="next image"
            disabled={!loop && active === max - 1}
          >
            <KeyboardArrowRight />
          </IconButton>

          {showIndicators && (
            <MobileStepper
              variant="dots"
              steps={max}
              position="static"
              activeStep={active}
              nextButton={<span />}
              backButton={<span />}
              sx={{
                pointerEvents: "none",
                background: "transparent",
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                "& .MuiMobileStepper-dot": { backgroundColor: "neutral.400" },
                "& .MuiMobileStepper-dotActive": {
                  backgroundColor: "primary.main",
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;
