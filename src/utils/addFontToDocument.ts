const GOOGLE_FONTS_CSS_BASE_URL = "https://fonts.googleapis.com/css2";

export const addFontToDocument = (fontFamilies: string[]) => {
  return new Promise((resolve, reject) => {
    if (fontFamilies.length === 0) return;
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    const cssURL = fontFamilies.reduce((acc, fontFamily, index) => {
      let newAcc = acc + "family=" + fontFamily;

      if (index !== fontFamilies.length - 1) {
        newAcc += "&";
      }

      return newAcc;
    }, GOOGLE_FONTS_CSS_BASE_URL + "?");

    linkElement.href = encodeURI(cssURL);

    document.head.appendChild(linkElement);

    linkElement.onload = () => {
      resolve(fontFamilies);
    };

    linkElement.onerror = (err) => {
      reject(err);
    };
  });
};
