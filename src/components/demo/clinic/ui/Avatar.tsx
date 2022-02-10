import * as React from "react";

interface Props {
  size: number;
  src: string;
}
export const Avatar = ({ size, src }: Props) => {
  return (
    <img
      height={size}
      width={size}
      className="rounded-full"
      src={src}
      alt="Avatar"
    />
  );
};
