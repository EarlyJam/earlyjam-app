import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { TextareaHTMLAttributes } from "react";

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
        <span className="absolute right-0 -bottom-6.5 text-gray-600-secondary text-sm font-normal">
          {count}/{maxCharacters}
        </span>
      )}
    </div>
  );
}

export default TextArea;
