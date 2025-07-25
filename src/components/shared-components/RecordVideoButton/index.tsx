import { useEffect, useRef, useState } from "react";

import { createInstance, LoomVideo } from "@loomhq/record-sdk";
import { isSupported } from "@loomhq/record-sdk/is-supported";

import Refresh from "@/assets/svgs/Refresh.tsx";
import Button, { ButtonProps } from "@/components/shared-components/Button";
import { callEdgeFunction } from "@/helpers/edgeFunction.ts";

// const PUBLIC_APP_ID = "ba0513b7-bf54-4b18-9fb1-7955648482a6";
const BUTTON_ID = "ej-record-sdk-button";

type RecordVideoButtonProps = Omit<ButtonProps, "value" | "onChange"> & {
  onChange?: (value: string) => void;
};

function RecordVideoButton(props: RecordVideoButtonProps) {
  const { onChange, ...rest } = props;

  const [loomVideo, setLoomVideo] = useState<LoomVideo | undefined>();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const loomJws = useRef<string>();

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error?.toString() ?? ""}`);
        return;
      }

      await checkPermissions();

      let jws = loomJws.current;
      if (!jws) {
        const data = await callEdgeFunction("getLoomJws");
        jws = data.jws;
        loomJws.current = jws;
      }

      const button = document.getElementById(BUTTON_ID);

      if (!button) {
        return;
      }

      const { configureButton } = await createInstance({
        mode: "custom",
        jws,
        config: {
          disablePreviewModal: true,
          enableOnboardingTutorial: false,
          enablePictureInPicture: false,
          insertButtonText: "Insert Video"
        }
      });

      const sdkButton = configureButton({ element: button });

      sdkButton.on("insert-click", () => {
        console.log("insert");
      });

      sdkButton.on("recording-start", () => {
        console.log("recording-start");
      });

      sdkButton.on("recording-complete", () => {
        setLoading(true);
      });

      sdkButton.on("upload-complete", (video) => {
        setLoomVideo(video);
        onChange?.(video.id);
        setLoading(false);
      });

      setButtonDisabled(false);
    }

    void setupLoom();
  }, [loomVideo?.id, onChange]);

  const checkPermissions = async () => {
    const constraints = {
      audio: false,
      video: false
    };

    const devices = await navigator.mediaDevices.enumerateDevices();

    for (const device of devices) {
      if (device.kind === "videoinput") {
        constraints.video = true;
      }

      if (device.kind === "audioinput") {
        constraints.audio = true;
      }
    }

    if (!constraints.video && !constraints.audio) {
      return;
    }

    const userMedia = navigator.mediaDevices.getUserMedia(constraints);

    await userMedia.then(
      () => {
        console.log("Permissions granted");
      },
      (e) => {
        console.log("Permissions denied", e);
      }
    );
  };

  return loomVideo ? (
    <div className="relative">
      <Button
        className="absolute -top-9 right-0 w-auto text-blue-secondary-dark underline underline-offset-4"
        textClassName="flex flex-row items-center gap-1"
        variant="link"
        id={BUTTON_ID}
        startIcon={<Refresh />}
        loading={loading}
      >
        Record Again
      </Button>
      <iframe
        className="h-96 w-full rounded-2xl"
        src={loomVideo.embedUrl}
      ></iframe>
    </div>
  ) : (
    <Button
      {...rest}
      id={BUTTON_ID}
      loading={loading}
      disabled={buttonDisabled}
    />
  );
}

export default RecordVideoButton;
