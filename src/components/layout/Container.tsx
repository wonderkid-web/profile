import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className }: ContainerProps) {
  return <main className={`max-w-screen-sm md:max-w-screen-lg mx-auto ${className}`}>{children}</main>;
}

export default Container;
