import { PropsWithChildren } from "react";

function SectionTitle(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex h-10.5 items-center border-l-4 border-primary bg-green-50 pl-5">
      <p className="font-fraunces text-2xl font-normal leading-6 text-functional-success-900">
        {children}
      </p>
    </div>
  );
}

export default SectionTitle;
