import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

function TipsBox() {
  return (
    <Card className="max-w-[488px] w-full shadow-none rounded-2xl border-none">
      <CardContent className="px-5 py-6 space-y-6">
        <img src="/assets/images/tip_icon.png" alt="tips" />
        <CardTitle className="text-2xl leading-7">
          Tips to get the best results
        </CardTitle>
        <CardDescription className="text-base font-normal leading-5.5 text-blue-secondary-dark">
          Try to be clear on describing what your product does and what the
          problem is that you are solving for your customers. This will help our
          designers provide a better critique as they look through your flows.
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default TipsBox;
