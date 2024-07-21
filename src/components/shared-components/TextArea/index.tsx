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
    <div className="flex flex-col items-end gap-1.5">
      <Textarea
        className={cn("resize-none", className)}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      {showCharacterCount && (
        <span className="text-gray-600-secondary text-sm font-normal">
          {count}/{maxCharacters}
        </span>
      )}
    </div>
  );
}

export default TextArea;
