import React, { useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import { IFontsListProps } from "./fonts-list.types";
import "./fonts-list.styles.css";
import { addFontsToDocument } from "../../utils/addFontToDocument";

const portionSize = 20;

const checkIfNearBottom = (element: Element) => {
  const { scrollHeight, scrollTop, clientHeight } = element;
  const maxScroll = scrollHeight - clientHeight;
  const scrollBottom = maxScroll - scrollTop;
  return scrollBottom < 20;
};

export const FontsList: React.FunctionComponent<IFontsListProps> = (props) => {
  const { fonts, onFontSelect = console.log } = props;

  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    addFontsToDocument(fonts.map((font) => font.family).slice(0, portionSize));
    setShowCount(portionSize);
  }, [fonts]);

  const showMore = () => {
    addFontsToDocument(
      fonts.map((font) => font.family).slice(showCount, showCount + portionSize)
    )
      .then(console.log)
      .catch(console.log);
    setShowCount(showCount + portionSize);
  };

  const throttledHandleListScroll = useCallback(
    throttle((element: Element, showMore: Function) => {
      if (checkIfNearBottom(element)) {
        showMore();
      }
    }, 100),
    []
  );

  const handleListScroll: React.UIEventHandler = ({ currentTarget }) => {
    throttledHandleListScroll(currentTarget, showMore);
  };

  return (
    <ul onScroll={handleListScroll} className="fonts-list">
      {fonts.slice(0, showCount).map((font) => (
        <li key={font.family}>
          <button
            style={{ fontFamily: font.family }}
            className="fonts-list__font-btn"
            onClick={() => onFontSelect(font.family)}
          >
            {font.family}
          </button>
        </li>
      ))}
    </ul>
  );
};
