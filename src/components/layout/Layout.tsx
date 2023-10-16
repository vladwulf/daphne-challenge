import React from "react";

interface Props {
  children: React.ReactElement;
}
export const Layout: React.FC<Props> = (props) => {
  return (
    <main className="container max-w-screen-lg px-4 mx-auto">
      {props.children}
    </main>
  );
};
