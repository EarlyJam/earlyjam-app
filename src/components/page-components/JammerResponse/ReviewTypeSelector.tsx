import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";

import { cn } from "@/utils";

type ReviewTypeSelectorProps = {
  reviewType?: "positive" | "negative";
  setReviewType?: (value: "positive" | "negative") => void;
};

function ReviewTypeSelector(props: ReviewTypeSelectorProps) {
  const { reviewType, setReviewType } = props;

  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-2",
          {
            "border-green-500 bg-primary/24": reviewType === "positive"
          }
        )}
        onClick={() => setReviewType?.("positive")}
      >
        <LuThumbsUp className="h-5 w-5 text-green-500" />
        <span
          className={cn("text-sm font-semibold text-gray-700", {
            "text-secondary-blue-dark": reviewType === "positive"
          })}
        >
          Recommend
        </span>
      </div>
      <div
        className={cn(
          "flex cursor-pointer flex-row items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-2",
          {
            "border-gray-700 bg-gray-400-disable": reviewType === "negative"
          }
        )}
        onClick={() => setReviewType?.("negative")}
      >
        <LuThumbsDown className="h-5 w-5 text-gray-700" />
        <span className="text-sm font-semibold text-gray-700">
          Not Recommend
        </span>
      </div>
    </div>
  );
}

export default ReviewTypeSelector;
