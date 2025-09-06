import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Select, styled, type SelectProps } from "@mui/material";
import React from "react";
import type { CustomTypographyVariantTypes } from "../../../types/common-types";
import CustomFormControl from "../CustomFormControl/index.tsx";
import CustomMenuItem from "../CustomMenuItem/index.tsx";
import Text from "../Text/index.tsx";

interface Proptypes {
  placeholder?: string;
  transparent?: boolean;
  placeholderColor?: string;
  placeHolderVarient?: CustomTypographyVariantTypes;
}

const StyledSelect = styled(Select)<SelectProps & Proptypes>(
  ({ theme, transparent, placeholderColor }) => ({
    "&": {
      background: transparent ? "transparent" : theme.palette.neutral[100],
    },
    "& .MuiOutlinedInput-root": {
      border: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      color: placeholderColor || theme.palette.primary.main,
    },
    "&.Mui-error": {
      background: theme.palette.error,
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.error.main} !important`, // Show a red border on error
    },
  }),
);

const Dropdown: React.FC<Proptypes & SelectProps> = (props) => {
  const { children, placeholder, placeHolderVarient, ...restProps } = props;
  return (
    <CustomFormControl>
      <StyledSelect
        defaultValue={""} // This is required to show the placeholder
        displayEmpty
        IconComponent={ExpandMoreIcon}
        MenuProps={{ sx: { "& ul": { padding: 0 } } }}
        {...restProps}
      >
        <CustomMenuItem
          disabled
          hidden
          value=''
          sx={{ opacity: 0, visibility: "hidden", height: 0, p: 0 }}
        >
          <Text
            color={props.placeholderColor || "neutral.300"}
            variant={placeHolderVarient || "body1"}
          >
            {placeholder || "Select"}
          </Text>
        </CustomMenuItem>

        {children}
      </StyledSelect>
    </CustomFormControl>
  );
};

export default Dropdown;
