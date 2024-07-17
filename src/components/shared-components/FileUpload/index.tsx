import Upload from "@/assets/svgs/Upload";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FileUploader from "@/components/util-components/FileUploader";
import { getPublicUrl, uploadFile } from "@/helpers/storage";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { EJFile } from "@/types/global";
import { Loader2, X } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { v4 } from "uuid";

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
        className="flex flex-row justify-between items-center p-2 rounded-lg border border-gray-400-disable"
      >
        <div className="flex flex-row items-center gap-3">
          {file.status === "uploading" ? (
            <Loader2 className="animate-spin h-5 w-5" />
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
          <p className="text-sm text-gray-600-secondary overflow-hidden text-ellipsis whitespace-nowrap w-96">
            {file.name}
          </p>
        </div>
        <X
          className="text-blue-secondary-dark h-5 w-5 cursor-pointer"
          onClick={onRemove}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.file.id === nextProps.file.id &&
    prevProps.file.url === nextProps.file.url &&
    prevProps.file.name === nextProps.file.name,
);

type FileUploadProps = {
  value?: EJFile[];
  onChange?(value: EJFile[]): void;
};

function FileUpload(props: FileUploadProps) {
  const { value, onChange } = props;

  const { data: user } = useAuthUser();

  const [files, setFiles] = useState<EJFile[]>([]);

  useEffect(() => {
    setFiles(
      (value ?? []).map((file) => ({
        ...file,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        id: file.id ?? v4(),
        status: "uploaded",
      })),
    );
  }, [value]);

  const handleChange: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    if (!user) {
      return;
    }

    let files = acceptedFiles.map(
      (file) =>
        ({
          id: v4(),
          name: file.name,
          file,
          status: "uploading",
        }) as EJFile,
    );
    setFiles((prevFiles) => [...prevFiles, ...files]);

    for (const file of files) {
      const data = await uploadFile(
        `${user.id}/${v4()}_${file.name.split(" ").join("_")}`,
        file.file!,
      );

      const url = getPublicUrl(data.path).publicUrl;
      files = files.map((f) =>
        f.id === file.id
          ? {
              ...file,
              url,
              status: "uploaded",
            }
          : f,
      );
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id
            ? {
                ...file,
                url,
                status: "uploaded",
              }
            : f,
        ),
      );
    }

    onChange?.(
      files.map((f) => ({
        id: f.id,
        name: f.name,
        url: f.url,
      })),
    );
  };

  return (
    <div>
      <FileUploader
        onDrop={handleChange}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        }}
      >
        {() => (
          <div className="px-6 py-4 border border-gray-400-disable rounded-lg text-center space-y-3 cursor-pointer">
            <div className="mx-auto w-fit p-1.5">
              <div className="w-8 h-8 rounded-full bg-primary outline outline-6 outline-primary/24 text-white flex justify-center items-center">
                <Upload />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                <span className="text-sm text-blue-secondary-dark font-semibold underline leading-4.5 underline-offset-4">
                  Click to upload
                </span>
                &nbsp;or drag and drop images
              </p>
              <p className="text-xs text-gray-500 leading-4.5">
                JPG, PNG (max. 200mb)
              </p>
            </div>
          </div>
        )}
      </FileUploader>
      <div className="flex flex-col gap-2 mt-2">
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
                  url: f.url,
                })),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
