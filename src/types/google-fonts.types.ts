export interface IGoogleFontsResponse {
  items: IGoogleFont[];
  kind: string;
}

export interface IGoogleFont {
  kind: string;
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: { [key: string]: string };
}
