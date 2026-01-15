/** @format */

import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="w-9/12 mx-auto">{children}</div>;
}
