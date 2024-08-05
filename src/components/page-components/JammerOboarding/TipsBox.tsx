import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const COPY_TEXT: Record<number, { title: string; description: string }> = {
  1: {
    title: "Tips to get the best results",
    description:
      "Authenticity is key! Share a real photo and give people context on work you’ve done in the past.",
  },
  2: {
    title: "Tips to get the best results",
    description:
      "Please share everything you can about you and your experience! We want to be able to see your past work and expertise.",
  },
};

type TipsBoxProps = {
  currentStep: number;
};

function TipsBox(props: TipsBoxProps) {
  const { currentStep } = props;

  return (
    <Card className="max-w-[488px] w-full shadow-none rounded-2xl border-none">
      <CardContent className="px-5 py-6 space-y-6">
        <img src="/assets/images/tip_icon.png" alt="tips" loading="lazy" />
        <CardTitle className="text-2xl leading-7">
          {COPY_TEXT[currentStep].title}
        </CardTitle>
        <CardDescription className="text-base font-normal leading-5.5 text-blue-secondary-dark">
          {COPY_TEXT[currentStep].description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default TipsBox;
