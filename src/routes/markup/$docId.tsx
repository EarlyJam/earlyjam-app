import {
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { v4 } from "uuid";

import Add from "@/assets/svgs/Add";
import ChevronDown from "@/assets/svgs/ChevronDown";
import ChevronLeft from "@/assets/svgs/ChevronLeft";
import ChevronRight from "@/assets/svgs/ChevronRight";
import Elements from "@/assets/svgs/Elements";
import TextArea from "@/components/shared-components/TextArea";
import { Button } from "@/components/ui/button.tsx";
import Heading5 from "@/components/ui/heading5.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils";





type Pin = {
  id: string;
  x: number;
  y: number;
  text?: string;
  tag?: "fix" | "improve" | "idea";
};

function CommentBox(props: {
  value?: string;
  tag?: Pin["tag"];
  onSubmit: (text: string, tag: Pin["tag"]) => void;
}) {
  const { value, onSubmit } = props;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [tag, setTag] = useState<Pin["tag"]>(props.tag ?? "fix");

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = value ?? "";
  }, [value]);

  const handleSubmit = () => {
    if (!inputRef.current) return;

    const text = inputRef.current.value;
    if (!text) return;

    onSubmit(text, tag);

    inputRef.current.value = "";
  };

  return (
    <div className="flex w-[348px] flex-col gap-4 rounded-xl border border-gray-30 bg-white p-4 shadow-ej-markup-comment-box">
      <div className="flex flex-col gap-1.5">
        <Heading5>Comment</Heading5>
        <TextArea
          ref={inputRef}
          rows={4}
          className="p-4"
          placeholder="Problem: ... Suggestion: ..."
        />
      </div>
      <div>
        <Heading5>Priority tag</Heading5>
        <div className="grid grid-cols-3 gap-1">
          <div
            onClick={() => setTag("fix")}
            className={cn(
              "flex cursor-pointer flex-row items-baseline justify-center gap-1 rounded-xl border p-2",
              {
                "border-sys-outline-light": tag !== "fix",
                "border-primary": tag === "fix"
              }
            )}
          >
            <div className="h-2 w-2 rounded-full bg-fix-red" />
            <p className="text-xs font-normal leading-4 text-fix-red">Fix</p>
          </div>
          <div
            onClick={() => setTag("improve")}
            className={cn(
              "flex cursor-pointer flex-row items-baseline justify-center gap-1 rounded-xl border p-2",
              {
                "border-sys-outline-light": tag !== "improve",
                "border-primary": tag === "improve"
              }
            )}
          >
            <div className="h-2 w-2 rounded-full bg-improvement-orange" />
            <p className="text-xs font-normal leading-4 text-improvement-orange">
              Improvement
            </p>
          </div>
          <div
            onClick={() => setTag("idea")}
            className={cn(
              "flex cursor-pointer flex-row items-baseline justify-center gap-1 rounded-xl border p-2",
              {
                "border-sys-outline-light": tag !== "idea",
                "border-primary": tag === "idea"
              }
            )}
          >
            <div className="h-2 w-2 rounded-full bg-idea-blue" />
            <p className="text-xs font-normal leading-4 text-idea-blue">Idea</p>
          </div>
        </div>
        <p className="text-xs font-normal leading-4 text-sys-on-surface-lighter">
          This needs to be{" "}
          {tag === "fix" ? "fixed" : tag === "improve" ? "improved" : "ideated"}
        </p>
      </div>
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}

export const Route = createFileRoute("/markup/$docId")({
  component: RouteComponent
});

function RouteComponent() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [openPin, setOpenPin] = useState<string>();
  const [mode, setMode] = useState<"edit" | "view">("edit");

  const overlayContainer = useRef<HTMLDivElement>(null);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (mode === "view") return;
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

    setPins((pins) => [
      ...pins,
      { x: percentageX, y: percentageY, id: pinId, tag: "improve" }
    ]);
    setOpenPin(pinId);
  };

  // const { docId } = Route.useLoaderData();
  return (
    <>
      {/* HEADER PART  */}
      <div className="borer-gray-200 header flex h-20 w-full justify-between border-b bg-white px-8 py-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-center">
          <Link className="h-7 w-17.25 gap-2 rounded-customRadius" to="/markup">
            <div className="flex h-7 w-17.25 gap-2 p-1">
              <ChevronLeft />
              <div className="h-5 w-8.25 text-sm font-semibold leading-4.9 tracking-normal text-secondary">
                Back
              </div>
            </div>
          </Link>
        </div>
        <Button className="h-12 max-h-12 min-h-12 w-28.75 gap-2 rounded-[99px] bg-primary hover:bg-primary">
          <div className="flex gap-3">
            <Elements />
            <h5 className="text-base font-semibold leading-5.6 text-secondary">
              Share
            </h5>
          </div>
        </Button>
      </div>
      {/* BODY PART  */}
      <div className="body flex flex-1 items-end justify-center self-stretch">
        <div className="frame flex h-auto flex-[1_0_0] items-center">
          {/* LEFT PART OF BODY  */}
          <div className="file flex w-35 flex-col items-start gap-0 self-stretch bg-white">
            {/* HEADING PART  */}
            <div className="title flex h-[44px] items-center self-stretch border-b border-gray-200 p-3">
              <div className="frame flex flex-[1_0_0] items-center gap-1">
                <div className="font-gilroy text-sm font-semibold leading-5 text-gray-950">
                  File
                </div>
              </div>
              <div className="flex h-5 w-5 items-center justify-center p-0.8325">
                <Add />
              </div>
            </div>
            {/* SCREEN PART  */}
            <div className="list-img flex max-h-[calc(100vh-124px)] flex-1 flex-col items-start gap-3 self-stretch overflow-y-auto p-3">
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file1.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name1.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file2.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name-long-long.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file1.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name1.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file2.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name-long-long.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file1.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name1.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file2.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name-long-long.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file1.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name1.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file2.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name-long-long.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file1.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name1.png
                </div>
              </div>
              <div className="screen flex flex-col items-start gap-1 self-stretch">
                <div className="frame flex h-18 items-start gap-2.5 self-stretch rounded-lg border border-primary bg-gray-250 p-2.5">
                  <img
                    src="/assets/images/file2.png"
                    className="flex-1 self-stretch bg-[lightgray_-6.56px_-2.532px] bg-[url('<path-to-image>')] bg-no-repeat"
                  />
                </div>
                <div className="flex self-stretch overflow-hidden truncate text-ellipsis font-sans text-sm font-normal leading-4.2 text-gray-950">
                  file-name-long-long.png
                </div>
              </div>
            </div>
          </div>
          {/* MIDDLE PART OF BODY  */}
          <div className="frame flex flex-1 flex-col items-start">
            <div className="title flex h-[48px] items-center justify-between self-stretch p-3 px-6">
              <div className="frame flex items-center gap-2">
                <div className="font-sans text-base font-normal leading-4.2 text-gray-950">
                  Fit Horizontally (70%)
                </div>
                <ChevronDown />
              </div>
              <div className="toggle-options flex items-start gap-2.5">
                <Switch
                  checked={mode === "view"}
                  onCheckedChange={(checked) => setMode(checked ? "view" : "edit")}
                />
                <div className="flex items-center justify-center gap-2.5">
                  <h5 className="font-manrope text-base font-normal leading-5.6 tracking-customLetterSpacing text-gray-920">
                    View only mode
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <div className="markup-zone max-h-[calc(100vh-128px)] w-full overflow-y-auto py-19.5 pl-8.5 pr-13">
                <div className="relative">
                  <img
                    src="/assets/images/file3.png"
                    className="bg-lightgray h-147.25 w-full flex-shrink-0 bg-[url('<path-to-image>')] bg-[length:101.526%_100.265%] bg-[position:-11.095px_-10.074px] bg-no-repeat"
                  />
                  <div
                    ref={overlayContainer}
                    className={cn("absolute left-0 top-0 h-full w-full", {
                      "pointer-events-none": openPin != null,
                      "cursor-pin": mode === "edit",
                      "cursor-default": mode === "view"
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
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-t-full rounded-br-full border border-white text-white",
                            {
                              "bg-fix-red": pin.tag === "fix",
                              "bg-improvement-orange": pin.tag === "improve",
                              "bg-idea-blue": pin.tag === "idea"
                            }
                          )}
                        >
                          <p className="text-sm">{index + 1}</p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="border-none p-0 shadow-none outline-0">
                        <CommentBox
                          value={pin.text}
                          tag={pin.tag}
                          onSubmit={(text, tag) => {
                            setPins((prev) => {
                              const updatedPins = [...prev];
                              updatedPins[index].text = text;
                              updatedPins[index].tag = tag;
                              return updatedPins;
                            });
                            setOpenPin(undefined);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT PART OF BODY  */}
          <div className="file flex w-60.5 flex-col items-start gap-0 self-stretch bg-white">
            <div className="title flex h-[44px] items-center self-stretch border-b border-gray-200 p-3">
              <div className="h-5 flex-1 text-sm font-semibold leading-5 text-gray-950">
                Comments
              </div>
              <ChevronRight />
            </div>
            <div className="list-img flex max-h-[calc(100vh-124px)] flex-1 flex-col items-start gap-0.5 self-stretch overflow-y-auto">
              {pins.map((pin, index) => (
                <Fragment key={pin.id}>
                  <div className="comment flex flex-col items-start gap-3 self-stretch rounded-customRadius2 bg-white px-4 py-3">
                    <div className="flex items-center gap-1 self-stretch">
                      <div
                        className={cn(
                          "flex h-5 w-5 flex-row items-center justify-center rounded-full text-white",
                          {
                            "bg-fix-red": pin.tag === "fix",
                            "bg-improvement-orange": pin.tag === "improve",
                            "bg-idea-blue": pin.tag === "idea"
                          }
                        )}
                      >
                        <p className="mt-0.5 text-xs">{index + 1}</p>
                      </div>
                      <div
                        className={cn("text-xs font-semibold leading-4.2", {
                          "text-fix-red": pin.tag === "fix",
                          "text-improvement-orange": pin.tag === "improve",
                          "text-idea-blue": pin.tag === "idea"
                        })}
                      >
                        This needs to be{" "}
                        {pin.tag === "fix"
                          ? "fixed"
                          : pin.tag === "improve"
                            ? "improved"
                            : "ideated"}
                      </div>
                    </div>
                    <p className="text-xs font-normal leading-4.2">
                      {pin.text}
                    </p>
                  </div>
                  <hr className="w-full border-t border-[#DFE2E1]" />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
