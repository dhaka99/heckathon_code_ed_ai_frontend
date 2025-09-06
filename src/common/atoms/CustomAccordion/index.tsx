import { Accordion, type AccordionProps } from "@mui/material";
import React from "react";

const CustomAccordion: React.FC<AccordionProps> = (props) => (
  <Accordion {...props} />
);
export default CustomAccordion;
