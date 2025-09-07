import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Div from "../../atoms/Div";
import CustomCheckbox from "../../atoms/CustomCheckbox";
import Text from "../../atoms/Text";
import AutocompleteInputBase from "../../atoms/AutocompleteInputBase";
type OptionType = {
  [key: string]: any;
};
interface CustomAutocompleteProps {
  value: any;
  onChange: (value: any) => void;
  valueKey: keyof OptionType;
  labelKey: string;
  options: OptionType[];
  placeholder?: string;
  loading?: boolean;
  multiple?: boolean;
  limitTags?: number;
  disabled?: boolean;
  groupBy?: (option: OptionType) => string;
  getOptionLabel?: (option: OptionType) => string;
  renderCheckbox?: boolean;
  selectAllOption?: OptionType;
  sx?: any;
}
const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  value,
  onChange,
  labelKey = "label",
  valueKey = "value",
  options,
  placeholder = "Search...",
  loading = false,
  multiple = false,
  limitTags = 2,
  disabled = false,
  groupBy,
  getOptionLabel = (opt) => opt[labelKey] || "",
  renderCheckbox = false,
  selectAllOption,
  sx = {},
}) => {
  const handleChange = (_: any, newValue: OptionType[] | OptionType | null) => {
    if (!multiple) return onChange(newValue);
    const newArr = newValue as OptionType[];
    const isSelectAllSelected = selectAllOption
      ? newArr.some(
          (val) =>
            val[valueKey] === selectAllOption[valueKey] &&
            val[labelKey] === selectAllOption[labelKey],
        )
      : false;
    if (isSelectAllSelected) {
      const allSelected = value?.length === options.length;
      onChange(allSelected ? [] : [...options]);
    } else {
      onChange(newArr);
    }
  };
  return (
    <Autocomplete
      value={value}
      multiple={multiple}
      limitTags={limitTags}
      disableCloseOnSelect={multiple}
      options={
        selectAllOption && options.length > 0
          ? [selectAllOption, ...options]
          : options
      }
      popupIcon={<ExpandMoreIcon color='primary' />}
      loading={loading}
      onChange={handleChange}
      getOptionLabel={getOptionLabel}
      groupBy={groupBy}
      sx={{
        "& .MuiInputBase-root": {
          width: "100%",
        },
        "& .MuiAutocomplete-inputRoot": {
          maxHeight: 100,
          overflowY: "auto",
        },
        ...sx,
      }}
      slotProps={{
        popupIndicator: {
          sx: {
            marginRight: 1,
          },
        },
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const isChecked =
          selectAllOption && option[valueKey] === selectAllOption[valueKey]
            ? value?.length === options.length
            : !!value?.find?.((v: any) => v[valueKey] === option[valueKey]);
        const isSelectAllOption =
          selectAllOption && option[valueKey] === selectAllOption[valueKey];
        return (
          <Div
            key={`${key}-${option[valueKey]}`}
            component='li'
            {...optionProps}
            display='flex'
            alignItems='center'
          >
            {renderCheckbox && <CustomCheckbox checked={isChecked} />}
            <Text
              variant={isSelectAllOption ? "body1SemiBold" : "body1Medium"}
              color={isSelectAllOption ? "primary.main" : "inherit"}
              sx={isSelectAllOption ? { textDecoration: "underline" } : {}}
            >
              {option[labelKey]}
            </Text>
          </Div>
        );
      }}
      renderInput={(params) => (
        <FormControl variant='standard' fullWidth sx={{ border: "2px solid", borderColor: "#E0E0E0", borderRadius: "8px" }}>
          <AutocompleteInputBase {...params} placeholder={placeholder} />
        </FormControl>
      )}
      disabled={disabled}
    />
  );
};
export default CustomAutocomplete;
