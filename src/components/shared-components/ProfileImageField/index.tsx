import { useState } from "react";

import { DropzoneOptions } from "react-dropzone";
import { LuCamera } from "react-icons/lu";
import { v4 } from "uuid";

import Button from "@/components/shared-components/Button";
import FileUploader from "@/components/shared-components/FileUploader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getPublicUrl, uploadFile } from "@/helpers/storage";
import useAuthUser from "@/hooks/queries/useAuthUser";

type ProfileImageFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
};

function ProfileImageField(props: ProfileImageFieldProps) {
  const { value, onChange } = props;

  const { data: user } = useAuthUser();

  const [loading, setLoading] = useState(false);

  const handleChange: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    if (!user) {
      return;
    }

    setLoading(true);

    const file = acceptedFiles[0];

    const data = await uploadFile(
      `${user.id}/${v4()}_${file.name.split(" ").join("_")}`,
      file
    );

    const url = getPublicUrl(data.path).publicUrl;

    onChange?.(url);

    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center gap-8">
      <Avatar className="h-20 w-20 bg-beige-secondary">
        <AvatarImage
          className={!value ? "pr-4.5 pt-3.5" : "object-cover"}
          src={value ? value : "/assets/images/default_profile_image.png"}
        />
      </Avatar>
      <FileUploader
        onDrop={handleChange}
        accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
        maxFiles={1}
        multiple={false}
        noDrag
        maxSize={1024 * 1024 * 100} // 100 MB
      >
        {() => (
          <Button
            className="h-auto rounded-none border-b border-blue-secondary-dark p-0 text-blue-secondary-dark hover:no-underline"
            loading={loading}
            variant="link"
            startIcon={<LuCamera className="mb-1 h-4.5 w-4.5" />}
          >
            Upload profile photo
          </Button>
        )}
      </FileUploader>
    </div>
  );
}

export default ProfileImageField;
