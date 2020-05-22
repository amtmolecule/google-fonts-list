import { IGoogleFont } from "../../types/google-fonts.types";

export interface IFontsListProps {
  fonts: IGoogleFont[];
  onFontSelect?: (fontFamily: string) => void;
}
