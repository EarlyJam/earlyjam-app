import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";

function TipsBox() {
  return (
    <Card className="w-full rounded-2xl border border-[#eaecf0] bg-white shadow-none">
      <CardContent className="space-y-6 px-5 py-6">
        <img src="/assets/images/tip_icon.png" alt="tips" loading="lazy" />
        <CardTitle className="text-2xl leading-7">
          Tips for sharing your work
        </CardTitle>
        <CardDescription className="text-base font-normal leading-5.5 text-blue-secondary-dark">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>Upload relevant files:</b> Share Figma, PDF, or image files that best represent the work you want feedback on.
            </li>
            <li>
              <b>Share links:</b> Add live links or prototypes so reviewers can experience your product in context.
            </li>
            <li>
              <b>Give context:</b> Briefly explain what you want feedback on and any specific areas you’d like reviewers to focus on.
            </li>
            <li>
              <b>Be concise:</b> The more focused your request, the more actionable the feedback will be.
            </li>
          </ul>
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default TipsBox;
