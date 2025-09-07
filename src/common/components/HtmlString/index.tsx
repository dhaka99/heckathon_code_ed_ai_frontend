import React from "react";
import Div from "../../atoms/Div";
import type { SxProps, Theme } from "@mui/material";

type HtmlStringProps = {
  text: string;
  asHtml?: boolean; // set true only for trusted HTML
  sx?: SxProps<Theme>;
};

const HtmlString: React.FC<HtmlStringProps> = ({ text, asHtml = false, sx }) => {
  if (asHtml) {
    return <Div sx={sx} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <Div sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", ...sx }}>{text}</Div>;
};

export default HtmlString;