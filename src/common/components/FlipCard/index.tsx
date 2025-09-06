import React from "react";
import Div from "../../atoms/Div";
import Text from "../../atoms/Text";
import { SxProps } from "@mui/material";

const FlipCard: React.FC<{ title: string; summary: string; sx?: SxProps }> = ({
  title,
  summary,
  sx,
}) => {
  return (
    <Div
      sx={{
        perspective: "1000px",
        cursor: "pointer",
        "&:hover .flipInner": { transform: "rotateY(180deg)" },
        ...sx,
        //   overflow: "hidden",
      }}
    >
      <Div
        className="flipInner"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",

          willChange: "transform",
        }}
      >
        <Div
          sx={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            borderRadius: "12px",
            border: "2px solid #E6F5FC",

            backgroundColor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Text variant="h6" textAlign="center">
            {title}
          </Text>
        </Div>

        <Div
          sx={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            borderRadius: "12px",
            border: "1px solid #E6F5FC",
            backgroundColor: "primary.200",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Text variant="body1" textAlign="center">
            {summary}
          </Text>
        </Div>
      </Div>
      <Text
        variant="caption"
        color="secondary"
        sx={{ mt: 1, display: "block", textAlign: "center" }}
      >
        Hover to flip
      </Text>
    </Div>
  );
};

export default FlipCard;
