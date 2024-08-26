import { useEffect, useState } from "react";

import { useIsMutating } from "@tanstack/react-query";

import ReviewTypeSelector from "@/components/page-components/JammerResponse/ReviewTypeSelector.tsx";
import Button from "@/components/shared-components/Button";
import TextArea from "@/components/shared-components/TextArea";
import { getCreateProjectJammerReviewKey } from "@/hooks/mutations/useCreateProjectJammerReview.ts";
import { getUpdateProjectJammerReviewKey } from "@/hooks/mutations/useUpdateProjectJammerReview.ts";
import { useToast } from "@/hooks/useToast.ts";

type ReviewFormProps = {
  defaultValues?: {
    reviewType?: "positive" | "negative";
    reviewSummary?: string;
  };

  onSubmit: (data: {
    reviewType: "positive" | "negative";
    reviewSummary: string;
  }) => void;
};

function ReviewForm(props: ReviewFormProps) {
  const { onSubmit, defaultValues } = props;

  const { toast } = useToast();

  const isCreating = useIsMutating({
    mutationKey: getCreateProjectJammerReviewKey()
  });
  const isUpdating = useIsMutating({
    mutationKey: getUpdateProjectJammerReviewKey()
  });

  const [reviewType, setReviewType] = useState<
    "positive" | "negative" | undefined
  >(defaultValues?.reviewType);
  const [reviewSummary, setReviewSummary] = useState(
    defaultValues?.reviewSummary ?? ""
  );

  useEffect(() => {
    if (defaultValues) {
      setReviewType(defaultValues.reviewType);
      setReviewSummary(defaultValues.reviewSummary ?? "");
    }
  }, [defaultValues]);

  const submitReview = () => {
    if (!reviewType) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a review type"
      });
      return;
    }

    onSubmit({ reviewType, reviewSummary });
  };

  const isLoading = isCreating > 0 || isUpdating > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-6">
        <span className="text-lg font-semibold text-blue-secondary-dark">
          Leave a review
        </span>
        <div className="shrink-0">
          <ReviewTypeSelector
            reviewType={reviewType}
            setReviewType={setReviewType}
          />
        </div>
      </div>
      <div className="space-y-4">
        <TextArea
          placeholder="Enter your review..."
          value={reviewSummary}
          onChange={(e) => setReviewSummary(e.target.value)}
        />
        <div className="flex flex-row-reverse">
          <Button
            className="w-auto"
            onClick={submitReview}
            loading={isLoading}
            disabled={isLoading}
          >
            Leave a Review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
