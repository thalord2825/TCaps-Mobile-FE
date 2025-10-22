export interface Palette {
  primary: string;
  grey: string;
  darkGrey: string;
  dark: string;
  background: string;
  card: string;
}

const Light: Palette = {
  primary: "#FF5A5F",
  grey: "#5E5D5E",
  darkGrey: "#878787",
  dark: "#1A1A1A",
  background: "#FDFFFF",
  card: "#EAEAEA",
};

const Dark: Palette = {
  primary: "#FF5A5F",
  grey: "#9A9A9A",
  darkGrey: "#B3B3B3",
  dark: "#FFFFFF",
  background: "#0F1012",
  card: "#1B1D21",
};

const Colors = { Light, Dark };

export default Colors;




