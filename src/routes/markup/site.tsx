import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from "react";

import { createFileRoute } from "@tanstack/react-router";
import { v4 } from "uuid";

import Button from "@/components/shared-components/Button";
import TextField from "@/components/shared-components/TextField";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx";
import { createScreenshot } from "@/helpers/screenshot.ts";
import { toast } from "@/hooks/useToast.ts";
import { cn } from "@/utils";

type Pin = {
  id: string;
  x: number;
  y: number;
  text?: string;
};

function CommentBox(props: {
  value?: string;
  onSubmit: (text: string) => void;
}) {
  const { value, onSubmit } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = value ?? "";
  }, [value]);

  const handleSubmit = () => {
    if (!inputRef.current) return;

    const text = inputRef.current.value;
    if (!text) return;

    onSubmit(text);

    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <Input ref={inputRef} />
      <Button onClick={handleSubmit}>Post</Button>
    </div>
  );
}

export const Route = createFileRoute("/markup/site")({
  component: Page
});

function Page() {
  const [image, setImage] = useState<string>();
  const [pins, setPins] = useState<Pin[]>([]);
  const [openPin, setOpenPin] = useState<string>();
  const [siteUrl, setSiteUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const overlayContainer = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setSiteUrl(value);
  };

  const handleSubmit = async () => {
    setImage(undefined);
    setPins([]);
    console.log(siteUrl);
    setLoading(true);
    try {
      const response = await createScreenshot(siteUrl);
      console.log(response.screenshot);
      setImage(response.screenshot);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Screenshot Failed!",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    console.log(event);

    const container = overlayContainer.current;
    if (!container) return;

    // Get container's bounding rectangle
    const rect = container.getBoundingClientRect();

    // Calculate click position relative to container
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert to percentages
    const percentageX = (x / rect.width) * 100;
    const percentageY = (y / rect.height) * 100;

    const pinId = v4();

    setPins((pins) => [...pins, { x: percentageX, y: percentageY, id: pinId }]);
    setOpenPin(pinId);
  };

  return (
    <div className="h-screen w-full">
      <div className="flex w-full flex-row gap-2 p-2">
        <TextField
          id="site"
          containerClassName="grow"
          value={siteUrl}
          onChange={handleChange}
        />
        <Button className="w-auto" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="relative inline-block h-auto w-auto">
        {image && <img src={image} width="800" alt="image" />}
        <div
          ref={overlayContainer}
          className={cn("absolute left-0 top-0 h-full w-full cursor-pin", {
            "pointer-events-none": openPin != null
          })}
          onClick={handleOverlayClick}
        ></div>
        {pins.map((pin, index) => (
          <Popover
            key={pin.id}
            open={openPin === pin.id}
            onOpenChange={(open) => {
              if (open) {
                setOpenPin(pin.id);
              } else if (openPin === pin.id) {
                setOpenPin(undefined);
              }
            }}
          >
            <PopoverTrigger
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pin.x.toString()}%`,
                top: `${pin.y.toString()}%`
              }}
            >
              <div className="flex h-8 w-8 flex-row items-center justify-center rounded-full bg-blue-800 text-white">
                <p className="text-sm">{index + 1}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <CommentBox
                value={pin.text}
                onSubmit={(text) => {
                  setPins((pins) => {
                    const newPins = [...pins];
                    newPins[index].text = text;
                    return newPins;
                  });
                  setOpenPin(undefined);
                }}
              />
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
