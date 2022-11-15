import React, { useContext } from "react";
import { AppContext } from "components/ecosystem/appContext";
import styled from "styled-components";
import { MdAccessibilityNew } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { motion } from "framer-motion";

const Wrapper = styled(motion.button)<{ a11yMode: boolean }>`
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5rem;
  background-color: ${({ theme, a11yMode }) =>
    a11yMode ? theme.colors.whiteTransparent : theme.colors.milkTransparent};
  box-shadow: 0 0.0625rem 0.125rem #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
  * {
    color: ${({ theme }) => theme.currentColorGroup.surface};
  }

  span {
    font-family: ${({ theme }) =>
      theme.typography.fontFamily.universalSansDisplay};
    font-weight: 700;
    font-size: 0.625rem;
    text-transform: uppercase;
  }
`;

type ICircleButton = {
  variant: string;
  text?: string;
  type?: string;
  clickHandler: () => void;
};

const CircleButton = ({ variant, text, type, clickHandler }: ICircleButton) => {
  const { a11yMode } = useContext(AppContext);
  return (
    <Wrapper
      onClick={clickHandler}
      whileTap={{ scale: 0.9 }}
      a11yMode={a11yMode}
    >
      {variant === "text" && <span>{text}</span>}
      {variant === "icon" && type === "accessibility" && (
        <MdAccessibilityNew size={25} />
      )}
      {variant === "icon" && type === "share" && <FiShare size={20} />}
    </Wrapper>
  );
};

export default CircleButton;
