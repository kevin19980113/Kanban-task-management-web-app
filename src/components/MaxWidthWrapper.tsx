import React from "react";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center mx-auto max-w-[1800px] bg-lines-light dark:bg-lines-dark">
      {children}
    </div>
  );
}
