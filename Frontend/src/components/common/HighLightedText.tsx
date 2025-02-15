import React from "react";

const HighLightedText = ({
  children,
  customclasses,
}: {
  children: any;
  customclasses: any;
}) => {
  return (
    <div>
      <p
        className={`font-arcuata w-fit bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-center text-4xl font-semibold text-transparent ${customclasses}`}
      >
        {children}
      </p>
    </div>
  );
};

export default HighLightedText;
