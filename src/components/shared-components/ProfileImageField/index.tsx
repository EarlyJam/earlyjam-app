import Button from "@/components/shared-components/Button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FileUploader from "@/components/util-components/FileUploader";
import { getPublicUrl, uploadFile } from "@/helpers/storage";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { Camera } from "lucide-react";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { v4 } from "uuid";

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
      file,
    );

    const url = getPublicUrl(data.path).publicUrl;

    onChange?.(url);

    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center gap-8">
      <Avatar className="bg-beige-secondary w-20 h-20">
        <AvatarImage
          className={!value ? "pt-3.5 pr-4.5" : "object-cover"}
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
            className="p-0 h-auto border-b rounded-none text-blue-secondary-dark border-blue-secondary-dark hover:no-underline"
            loading={loading}
            variant="link"
            startIcon={<Camera className="w-4.5 h-4.5 mb-1" />}
          >
            Upload profile photo
          </Button>
        )}
      </FileUploader>
    </div>
  );
}

export default ProfileImageField;
