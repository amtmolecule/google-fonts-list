import { IGoogleFontsResponse } from "../types/google-fonts.types";

// TODO: move to .env
const GOOGLE_API_KEY = "AIzaSyAkbSRiq-OEdMzG8B4kHaRSmGTwsq0tyOo";
const GOOGLE_FONTS_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`;

export const fetchGoogleFonts: () => Promise<IGoogleFontsResponse> = () =>
  fetch(GOOGLE_FONTS_URL).then((res) => res.json());
