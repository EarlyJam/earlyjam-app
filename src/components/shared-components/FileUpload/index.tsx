import { memo, useEffect, useState } from "react";

import { DropzoneOptions } from "react-dropzone";
import { LuLoader2, LuX } from "react-icons/lu";
import { v4 } from "uuid";

import Upload from "@/assets/svgs/Upload";
import FileUploader from "@/components/shared-components/FileUploader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getPublicUrl, uploadFile } from "@/helpers/storage";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { EJFile } from "@/types/global";

type FileListItemProps = {
  file: EJFile;
  onRemove(): void;
};

const FileListItem = memo(
  function FileListItem(props: FileListItemProps) {
    const { file, onRemove } = props;

    return (
      <div
        key={file.id}
        className="flex flex-row items-center justify-between rounded-lg border border-gray-400-disable p-2"
      >
        <div className="flex flex-row items-center gap-3">
          {file.status === "uploading" ? (
            <LuLoader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={
                  file.url ?? (file.file ? URL.createObjectURL(file.file) : "")
                }
                alt="user profile image"
              />
            </Avatar>
          )}
          <p className="w-60 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600-secondary sm:w-96">
            {file.name}
          </p>
        </div>
        <LuX
          className="h-5 w-5 cursor-pointer text-blue-secondary-dark"
          onClick={onRemove}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.file.id === nextProps.file.id &&
    prevProps.file.url === nextProps.file.url &&
    prevProps.file.name === nextProps.file.name
);

type FileUploadProps = {
  value?: EJFile[];
  onChange?(value: EJFile[]): void;
} & Omit<DropzoneOptions, "value" | "onChange">;

function FileUpload(props: FileUploadProps) {
  const { value, onChange, ...dropzoneProps } = props;

  const { data: user } = useAuthUser();

  const [files, setFiles] = useState<EJFile[]>([]);

  useEffect(() => {
    setFiles(
      (value ?? []).map((file) => ({
        ...file,
        id: file.id ?? v4(),
        status: file.status ?? "uploaded",
        url: file.url
      }))
    );
  }, [value]);

  const handleChange: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    if (!user) {
      return;
    }

    let newFiles = acceptedFiles.map(
      (file) =>
        ({
          id: v4(),
          name: file.name,
          file,
          status: "uploading"
        }) as EJFile
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Track uploaded files
    const uploadedFiles: EJFile[] = [];
    for (const file of newFiles) {
      const data = await uploadFile(
        `${user.id}/${v4()}_${file.name.split(" ").join("_")}`,
        file.file!
      );
      const url = getPublicUrl(data.path).publicUrl;
      uploadedFiles.push({
        ...file,
        url,
        status: "uploaded"
      });
    }

    // Remove uploading files and add uploaded ones
    setFiles((prevFiles) => [
      ...prevFiles.filter((f) => !newFiles.some((nf) => nf.id === f.id)),
      ...uploadedFiles
    ]);

    onChange?.(
      [
        ...files.filter((f) => !newFiles.some((nf) => nf.id === f.id)),
        ...uploadedFiles.map((f) => ({ id: f.id, name: f.name, url: f.url }))
      ]
    );
  };

  return (
    <div>
      <FileUploader
        onDrop={handleChange}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"]
        }}
        {...dropzoneProps}
      >
        {() => (
          <div className="cursor-pointer space-y-3 rounded-lg border border-gray-400-disable px-6 py-4 text-center">
            <div className="mx-auto w-fit p-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white outline outline-6 outline-primary/24">
                <Upload />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                <span className="text-sm font-semibold leading-4.5 text-blue-secondary-dark underline underline-offset-4">
                  Click to upload
                </span>
                &nbsp;or drag and drop images
              </p>
              <p className="text-xs leading-4.5 text-gray-500">
                JPG, PNG (max. 200mb)
              </p>
            </div>
          </div>
        )}
      </FileUploader>
      <div className="mt-2 flex flex-col gap-2">
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            onRemove={() => {
              const filtered = files.filter((f) => f.id !== file.id);
              setFiles(filtered);
              onChange?.(
                filtered.map((f) => ({
                  id: f.id,
                  name: f.name,
                  url: f.url
                }))
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
