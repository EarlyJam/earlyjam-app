import { PropsWithChildren } from "react";

function SectionTitle(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="h-10.5 bg-green-50 border-l-4 border-primary pl-5 flex items-center">
      <p className="text-functional-success-900 font-fraunces text-2xl leading-6 font-normal ">
        {children}
      </p>
    </div>
  );
}

export default SectionTitle;
