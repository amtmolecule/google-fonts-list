import React, { useEffect, useState } from "react";
import { fetchGoogleFonts } from "../../utils/fetchGoogleFonts";
import { IGoogleFont } from "../../types/google-fonts.types";
import { FontsList } from "../fonts-list/fonts-list";

export const FontsProvider: React.FunctionComponent = () => {
  const [fonts, setFonts] = useState<IGoogleFont[]>([]);

  useEffect(() => {
    fetchGoogleFonts().then((res) => {
      setFonts(res.items);
    });
  }, []);

  return <FontsList fonts={fonts} />;
};
