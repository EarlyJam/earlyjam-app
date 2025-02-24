import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from "react";

import { createFileRoute } from "@tanstack/react-router";
import { v4 } from "uuid";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx";
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

export const Route = createFileRoute("/markup/image")({
  component: Page
});

function Page() {
  const [image, setImage] = useState<string>();
  const [pins, setPins] = useState<Pin[]>([]);
  const [openPin, setOpenPin] = useState<string>();

  const overlayContainer = useRef<HTMLDivElement>(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataUrl = URL.createObjectURL(file);
      setImage(dataUrl);
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

  console.log(pins);

  return (
    <div className="h-screen w-full">
      <div>
        <Input
          id="picture"
          type="file"
          onChange={handleImageChange}
          accept=".png,.jpg,.jpeg"
        />
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
