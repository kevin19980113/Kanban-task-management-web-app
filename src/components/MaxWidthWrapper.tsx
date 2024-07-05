import React from "react";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center mx-auto max-w-screen-2xl bg-lines-light dark:bg-lines-dark">
      {children}
    </div>
  );
}
