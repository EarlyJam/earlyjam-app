import { TextareaHTMLAttributes } from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  showCharacterCount?: boolean;
};

function TextArea(props: TextAreaProps) {
  const { className, value, showCharacterCount, maxLength, ...rest } = props;

  const count = typeof value === "string" ? value.length : 0;
  const maxCharacters = maxLength ?? 0;

  return (
    <div className="relative">
      <Textarea
        className={cn("resize-none", className)}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      {showCharacterCount && (
        <span className="absolute -bottom-6.5 right-0 text-sm font-normal text-gray-600-secondary">
          {count}/{maxCharacters}
        </span>
      )}
    </div>
  );
}

export default TextArea;
