import { Font } from "@react-pdf/renderer";

// Register fonts with Turkish character support
export const registerFonts = () => {
  // Roboto font family with full Unicode support (including Turkish characters)
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
        fontWeight: 700,
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
        fontWeight: 300,
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
        fontWeight: 500,
      },
    ],
  });

  // Open Sans as alternative with Turkish support
  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVI.ttf",
        fontWeight: 700,
      },
      {
        src: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4gaVI.ttf",
        fontWeight: 300,
      },
      {
        src: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0B4gaVI.ttf",
        fontWeight: 600,
      },
    ],
  });

  // Noto Sans for maximum Unicode coverage
  Font.register({
    family: "Noto Sans",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNr5TRG.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/notosans/v27/o-0NIpQlx3QUlC5A4PNjXhFVZNyB.ttf",
        fontWeight: 700,
      },
    ],
  });
};

// Call this function to register all fonts
registerFonts();

// Export font family names to use in templates
export const FONTS = {
  primary: "Roboto",
  secondary: "Open Sans",
  fallback: "Noto Sans",
};

// Common font styles with Turkish character support
export const fontStyles = {
  base: {
    fontFamily: FONTS.primary,
    fontSize: 11,
    lineHeight: 1.6,
  },
  heading: {
    fontFamily: FONTS.primary,
    fontWeight: 700,
  },
  subheading: {
    fontFamily: FONTS.primary,
    fontWeight: 500,
  },
  body: {
    fontFamily: FONTS.primary,
    fontWeight: 400,
  },
};
