import { LuPencil } from "react-icons/lu";

import ReviewTypeSelector from "@/components/page-components/JammerResponse/ReviewTypeSelector.tsx";
import Button from "@/components/shared-components/Button";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import dayjs from "@/helpers/dayjs.ts";
import { getProfileFullName } from "@/helpers/profile";
import useAuthProfile from "@/hooks/queries/useAuthProfile.ts";
import { JammerReview } from "@/types/jammerReview.ts";

type ReviewDisplayProps = {
  review: JammerReview;

  onEditClick: () => void;
};

function ReviewDisplay(props: ReviewDisplayProps) {
  const { review, onEditClick } = props;

  const { data: profile } = useAuthProfile();

  const name = getProfileFullName(profile);

  const reviewType = review.review_type;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-6">
            <span className="text-lg font-semibold text-blue-secondary-dark">
              Leave a review
            </span>
            <div className="hidden shrink-0 md:block">
              <ReviewTypeSelector reviewType={reviewType} />
            </div>
          </div>
          <Button
            className="w-auto font-semibold text-gray-700"
            variant="link"
            startIcon={<LuPencil className="h-4 w-4" />}
            onClick={onEditClick}
          >
            Edit
          </Button>
        </div>
        <div className="block shrink-0 md:hidden">
          <ReviewTypeSelector reviewType={reviewType} />
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="h-13.5 w-13.5">
            <AvatarImage src={profile?.profile_image} />
          </Avatar>
          <div className="space-y-1">
            <p className="max-w-64 truncate text-lg font-semibold text-blue-secondary-dark">
              {name}
            </p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm text-gray-700">
                {dayjs(review.updated_at).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <p className="text-base text-gray-700">{review.summary}</p>
      </div>
    </div>
  );
}

export default ReviewDisplay;
