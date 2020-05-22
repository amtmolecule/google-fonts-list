import React, { useEffect, useState } from "react";
import { fetchGoogleFonts } from "../../utils/fetchGoogleFonts";
import { IGoogleFont } from "../../types/google-fonts.types";

export const FontsProvider: React.FunctionComponent = () => {
  const [fonts, setFonts] = useState<IGoogleFont[]>([]);

  useEffect(() => {
    fetchGoogleFonts().then((res) => {
      setFonts(res.items);
    });
  }, []);

  return <div className="">{fonts.length}</div>;
};
