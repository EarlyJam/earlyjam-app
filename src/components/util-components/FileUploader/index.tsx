import { ReactElement } from "react";
import { DropzoneOptions, DropzoneState, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  children(
    state: Omit<DropzoneState, "getRootProps" | "getInputProps">,
  ): ReactElement;
} & DropzoneOptions;

function FileUploader(props: FileUploaderProps) {
  const { children, ...restProps } = props;

  const { getRootProps, getInputProps, ...dropzoneState } =
    useDropzone(restProps);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children(dropzoneState)}
    </div>
  );
}

export default FileUploader;
