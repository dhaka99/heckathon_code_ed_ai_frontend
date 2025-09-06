import { AccordionSummary, type AccordionSummaryOwnProps } from "@mui/material";

const CustomAccordionSummary: React.FC<
  AccordionSummaryOwnProps & { id?: string }
> = (props) => <AccordionSummary {...props} />;

export default CustomAccordionSummary;
