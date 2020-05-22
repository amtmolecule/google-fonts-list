import React, { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { IFontsListProps } from "./fonts-list.types";
import "./fonts-list.styles.css";
import { addFontToDocument } from "../../utils/addFontToDocument";

interface IHandleScrollParams {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

const portionSize = 20;

export const FontsList: React.FunctionComponent<IFontsListProps> = (props) => {
  const { fonts, onFontSelect = console.log } = props;

  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    addFontToDocument(fonts.map((font) => font.family).slice(0, portionSize));
    setShowCount(portionSize);
  }, [fonts]);

  const showMore = () => {
    addFontToDocument(
      fonts.map((font) => font.family).slice(showCount, showCount + portionSize)
    )
    .then(console.log)
    .catch(console.log);
    setShowCount(showCount + portionSize);
  };

  const handleNearBottom = ({
    scrollHeight,
    scrollTop,
    clientHeight,
  }: IHandleScrollParams) => {
    const maxScroll = scrollHeight - clientHeight;
    const scrollBottom = maxScroll - scrollTop;
    if (scrollBottom < 20) {
      showMore();
    }
  };

  const throttledHandleNearBottom = throttle(handleNearBottom, 1000);

  const handleListScroll: React.UIEventHandler = ({
    currentTarget: { scrollHeight, scrollTop, clientHeight },
  }) => {
    throttledHandleNearBottom({ scrollHeight, scrollTop, clientHeight });
  };

  return (
    <ul onScroll={handleListScroll} className="fonts-list">
      {fonts.slice(0, showCount).map((font) => (
        // TODO: a11y
        <li
          style={{ fontFamily: font.family }}
          key={font.family}
          onClick={() => onFontSelect}
        >
          {font.family}
        </li>
      ))}
    </ul>
  );
};
