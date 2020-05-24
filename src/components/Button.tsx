import styled from "styled-components";

interface IButtonProps {
  color?: string;
  isCompact?: boolean;
  accentColor?: string;
}

export const Button = styled.button<IButtonProps>`
  align-self: center;
  justify-self: center;
  background: none;
  color: ${(props) => props.color || "white"};
  border: 3px solid ${(props) => props.color || "white"};
  border-radius: 25px;
  font-size: ${(props) => (props.isCompact ? "18px" : "24px")};
  padding: 10px 15px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${(props) => (props.accentColor ? props.accentColor : "#51ac30")};
    border: 3px solid
      ${(props) => (props.accentColor ? props.accentColor : "#51ac30")};
    outline: none;
  }
  transition: all 0.2s;
`;
