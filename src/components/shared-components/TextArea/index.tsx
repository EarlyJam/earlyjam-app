import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  showCharacterCount?: boolean;
};

function TextArea(
  props: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const { className, value, showCharacterCount, maxLength, ...rest } = props;

  const count = typeof value === "string" ? value.length : 0;
  const maxCharacters = maxLength ?? 0;

  return (
    <div className="relative">
      <Textarea
        ref={ref}
        className={cn("resize-none", className)}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      {showCharacterCount && (
        <span className="-bottom-6.5 absolute right-0 text-sm font-normal text-gray-600-secondary">
          {count}/{maxCharacters}
        </span>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
