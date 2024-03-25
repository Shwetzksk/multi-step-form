import React from "react";

interface StepType {
  num: number;
  title: string;
  active: boolean;
}
const Step: React.FC<StepType> = ({num, title, active}) => {
  return (
    <div className="flex items-center gap-3" data-cy={`step-${num}`}>
      <div
        data-cy="step-circle"
        className={`${
          active ? "bg-primary text-white border-transparent" : "text-gray-300 "
        } border-1   rounded-full w-9 h-9 grid place-items-center`}
      >
        {num}
      </div>
      <div>
        <p className={`text-sm font-medium  ${active ? "text-primary" : "text-gray-400 "}`}>
          STEP {num}
        </p>
        <h3 className=" font-semibold text-gray-700 uppercase">{title}</h3>
      </div>
    </div>
  );
};

export default Step;
