import { ChangeEvent, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import { v4 } from "uuid";

import BoxIcon from "@/assets/svgs/BoxIcon";
import CalendarIcon from "@/assets/svgs/CalendarIcon";
import HorizontalDots from "@/assets/svgs/HorizontalDots";
import UploadFile from "@/assets/svgs/UploadFile";
import Button from "@/components/shared-components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createMarkup,
  createMarkupFile,
  getMarkups
} from "@/helpers/db/markup";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { Markup, MarkupFile } from "@/types/markup";

export const Route = createFileRoute("/_auth/_app-layout/markup")({
  component: RouteComponent
});

function RouteComponent() {
  const { data } = useAuthUser();
  const user_id: string = data?.id ?? "";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: markupData, isLoading: gettingMarkupData } = useQuery({
    queryKey: ["markup"],
    queryFn: () => {
      if (!user_id) {
        throw new Error("User ID is undefined");
      }
      return getMarkups(user_id);
    }
  });

  console.log(markupData);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    user_id: string
  ) => {
    const files = event.target.files;
    if (!files) return;

    const markup_id = v4();

    const newMarkupFile: MarkupFile[] = Array.from(files).map((file) => ({
      id: v4(),
      markup_id,
      user_id,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
      name: file.name,
      created_at: new Date().toISOString()
    }));

    const newMarkup: Markup = {
      id: markup_id,
      user_id,
      thumb_url: URL.createObjectURL(files[0]),
      type: "file",
      name: files[0].name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await createMarkup(newMarkup);

    await createMarkupFile(newMarkupFile);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (gettingMarkupData) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex h-screen flex-col space-y-2.5 overflow-auto py-10 sm:px-8 sm:pt-6">
      <div className="flex w-full flex-row justify-between px-5 py-3 sm:px-0">
        <div className="flex h-12 w-136 justify-between space-x-3">
          <div className="h-12 w-95.5 gap-3 rounded-customRadius border border-gray-300 bg-white p-2">
            <div className="flex h-8 w-91.5 items-center justify-center gap-2 pl-3">
              <CiSearch className="h-4 w-4" />
              <Input className="h-8 border-0" />
            </div>
          </div>
          <p className="flex items-center justify-center text-sm font-semibold">
            Or
          </p>
          <Input
            id="picture"
            ref={fileInputRef}
            type="file"
            onChange={(event) => handleImageChange(event, user_id)}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            multiple
          />
          <Button
            variant="ghost"
            className="hidden w-auto bg-primary px-6 py-2 text-sm font-semibold hover:bg-primary sm:flex"
            startIcon={<MdDriveFolderUpload className="h-5 w-5" />}
            onClick={handleClick}
          >
            Upload
          </Button>
        </div>
        <Button
          variant="ghost"
          className="hidden w-auto bg-beige-secondary px-6 py-2 text-sm sm:flex"
          startIcon={<IoIosAdd className="h-5 w-5" />}
        >
          Invite
        </Button>
      </div>
      <div
        className={`flex ${markupData?.length === 0 ? "min-h-0 flex-grow items-center justify-center" : ""} ${markupData ? (markupData.length ? "grid grid-cols-3 gap-4" : "") : ""}`}
      >
        {markupData
          ? markupData.map((markup: Markup) => (
              <Link
                to="/markup/$docId"
                params={{
                  docId: markup.id
                }}
                key={markup.id}
                className="flex h-[120px] w-full flex-col flex-wrap items-start gap-5"
              >
                <Card className="flex flex-[1_0_0] flex-col items-start justify-between self-stretch rounded-customRadius2 border border-gray-300 bg-white p-5">
                  <CardContent className="flex h-20 items-start gap-2 self-stretch p-0">
                    <div className="flex flex-[1_0_0] flex-col items-start justify-center gap-3">
                      <div className="flex items-center gap-2 self-stretch">
                        <div className="flex-[1_0_0] text-lg font-semibold leading-6 text-gray-900">
                          {markup.name}
                        </div>
                        <HorizontalDots />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-1">
                        <div className="flex items-center gap-4">
                          <CalendarIcon />
                          <div className="font-gilroy text-sm font-normal leading-5 text-[#475467]">
                            {`Date Created: ${dayjs(markup.created_at).format("MMM D, YYYY")}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <BoxIcon />
                          <div className="font-gilroy text-sm font-normal leading-5 text-gray-700">
                            {`Date Updated: ${dayjs(markup.updated_at).format("MMM D, YYYY")}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          : ""}
        {markupData?.length === 0 && (
          <div className="h-61 w-167.5 space-y-3 rounded-customRadius3 border-1.5 border-dashed border-gray-400-disable px-6 py-16">
            <div className="flex flex-col items-center justify-center gap-2">
              <UploadFile />
              <p className="text-center text-base font-semibold leading-5.5 text-gray-800">
                Drag and drop images, videos, PDFs & more
              </p>
            </div>
            <div className="text-center text-xs font-normal leading-4.2 tracking-normal text-gray-500">
              MarkUp supports JPG, JPEG, PNG, SVG, BMP, GIF, PDF, PSD, AI, EPS,
              TIFF,
              <br /> RTF, TXT, DOCX, PAGES, ODT, PPTX, ODP, KEY, MP4, WMV, AVI,
              MOV
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
