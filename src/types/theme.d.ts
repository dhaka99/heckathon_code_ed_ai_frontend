import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h1Medium: React.CSSProperties;
    h1Bold: React.CSSProperties;
    h2Medium: React.CSSProperties;
    h2Bold: React.CSSProperties;
    h3Medium: React.CSSProperties;
    h3Bold: React.CSSProperties;
    body1Medium: React.CSSProperties;
    body1Bold: React.CSSProperties;
    body2Medium: React.CSSProperties;
    body1SemiBold: React.CSSProperties;
    body2Bold: React.CSSProperties;
    body2SemiBold: React.CSSProperties;
    caption1: React.CSSProperties;
    caption1Medium: React.CSSProperties;
    caption1Bold: React.CSSProperties;
    caption2: React.CSSProperties;
    caption2Bold: React.CSSProperties;
    supportingText: React.CSSProperties;
    supportingTextMedium: React.CSSProperties;
    supportingTextBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1Medium: React.CSSProperties;
    h1Bold: React.CSSProperties;
    h2Medium: React.CSSProperties;
    h2Bold: React.CSSProperties;
    h3Medium: React.CSSProperties;
    h3Bold: React.CSSProperties;
    body1Medium: React.CSSProperties;
    body1Bold: React.CSSProperties;
    body2Medium: React.CSSProperties;
    body1SemiBold: React.CSSProperties;
    body2Bold: React.CSSProperties;
    caption1: React.CSSProperties;
    caption1Medium: React.CSSProperties;
    caption1Bold: React.CSSProperties;
    caption2: React.CSSProperties;
    caption2Bold: React.CSSProperties;
    body2SemiBold: React.CSSProperties;
    supportingText: React.CSSProperties;
    supportingTextMedium: React.CSSProperties;
    supportingTextBold: React.CSSProperties;
  }

  interface Palette {
    neutral: PaletteColor;
  }
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }

  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
  }

  interface Palette {
    neutral: PaletteColor;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1Medium: true;
    h1Bold: true;
    h2Medium: true;
    h2Bold: true;
    body1Medium: true;
    body1Bold: true;
    body2Medium: true;
    body1SemiBold: true;
    body2Bold: true;
    caption1: true;
    caption1Medium: true;
    caption1Bold: true;
    caption2: true;
    caption2Bold: true;
    supportingText: true;
    supportingTextMedium: true;
    supportingTextBold: true;
    body2SemiBold: true;
    h3Medium: true;
    h3Bold: true;
  }
}

// Extend the BreakpointOverrides interface
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
    desktop: true;
    largeDesktop: true;
    extraWide: true;
  }
}
