import { PropsWithChildren, ReactNode } from "react";

import { LuLoader2 } from "react-icons/lu";

import Modal from "@/components/shared-components/Modal";
import { PROFILE_STATUS_LABELS } from "@/constants";
import dayjs from "@/helpers/dayjs.ts";
import useProfile from "@/hooks/queries/useProfile.ts";
import { Profile } from "@/types/profile.ts";
import { cn, convertToLabel } from "@/utils";

const getDisplayContent = (key: keyof Profile, value: unknown) => {
  let displayValue: ReactNode = typeof value === "string" ? value : "";
  if (key === "created_at" || key === "updated_at") {
    displayValue = dayjs(value as string).format("LLLL");
  }

  if (key === "status") {
    displayValue = (
      <div className="flex items-center space-x-2">
        <div
          className={cn("h-1 w-1 rounded-full", {
            "bg-functional-success-500": value === "active",
            "bg-functional-error-100": value === "rejected",
            "bg-functional-warning-500": value === "under_review"
          })}
        />
        <div
          className={cn("text-sm font-semibold", {
            "text-functional-success-500": value === "active",
            "text-functional-error-100": value === "rejected",
            "text-functional-warning-500": value === "under_review"
          })}
        >
          {PROFILE_STATUS_LABELS[value as keyof typeof PROFILE_STATUS_LABELS]}
        </div>
      </div>
    );
  }

  if (key === "expertise") {
    displayValue = (value as Profile["expertise"]) ?? [];
  }

  if (key === "portfolio_links") {
    displayValue =
      (value as Profile["portfolio_links"])?.map((link) => link.url) ?? [];
  }

  if (key === "project_images") {
    displayValue = (
      <ul className="list-disc pl-4">
        {(value as Profile["project_images"])?.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-secondary-dark underline underline-offset-4"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (key === "profile_image" && value) {
    displayValue = (
      <a
        href={value as string}
        target="_blank"
        rel="noreferrer"
        className="text-blue-secondary-dark underline underline-offset-4"
      >
        {value as string}
      </a>
    );
  }

  if (key === "linkedin_url") {
    let url = value as string;
    if (!url.startsWith("https://")) {
      url = `https://${url}`;
    }

    displayValue = (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-secondary-dark underline underline-offset-4"
      >
        {value as string}
      </a>
    );
  }

  if (key === "email") {
    displayValue = (
      <a
        href={`mailto:${value as string}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-secondary-dark underline underline-offset-4"
      >
        {value as string}
      </a>
    );
  }

  if (key === "user_type") {
    displayValue = convertToLabel(value as string);
  }

  if (Array.isArray(displayValue)) {
    displayValue = (
      <ul className="list-disc pl-4">
        {displayValue.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (!displayValue && typeof value === "object") {
    displayValue = JSON.stringify(value, null, 2);
  }

  return displayValue;
};

type JammerInfoModalProps = PropsWithChildren<{ id?: string }>;

function JammerInfoModal(props: JammerInfoModalProps) {
  const { id, children } = props;

  const { data, isLoading } = useProfile(id);

  return (
    <Modal trigger={children} title="Jammer Info" fullScreen>
      {isLoading ? (
        <div className="flex min-h-80 items-center justify-center">
          <LuLoader2 className="h-20 w-20 animate-spin text-primary" />
        </div>
      ) : (
        <div className="h-full overflow-auto rounded-lg border border-gray-400-disable">
          <div className="grid grid-cols-2">
            {Object.entries(data ?? {}).map(([key, value], index, array) => (
              <>
                <div
                  className={cn(
                    "flex min-h-10 flex-row items-center border-r border-gray-400-disable bg-gray-100 px-4 py-2 font-semibold",
                    {
                      "border-b": index !== array.length - 1
                    }
                  )}
                >
                  {convertToLabel(key)}
                </div>
                <div
                  className={cn(
                    "clear-both flex min-h-10 flex-row items-center whitespace-pre-wrap px-4 py-2",
                    {
                      "border-b border-gray-400-disable":
                        index !== array.length - 1
                    }
                  )}
                >
                  <>{getDisplayContent(key as keyof Profile, value)}</>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default JammerInfoModal;
