import React from "react";

interface AppInfoProps {
  children: React.ReactNode;
  title?: string;
  background?: string;
}

const AppInfo: React.FC<AppInfoProps> = ({
  children,
  title,
  background = "bg-primary/5",
}) => {
  return (
    <div className="flex justify-center no-scrollbar overflow-y-scroll w-full">
      <div
        className={`relative mt-4 max-w-[700px] p-6 rounded-xl xs:p-5 ${background}`}
      >
        <h1 className="text-2xl font-inter-medium xs:text-3xl">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AppInfo;
