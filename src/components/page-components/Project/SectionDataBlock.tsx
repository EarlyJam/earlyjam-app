import { Link } from "@tanstack/react-router";

type SectionDataBlockProps = {
  title: string;
} & (
  | {
      type: "text";
      value: string;
    }
  | {
      type: "list";
      value: { label: string; value: string }[];
    }
  | {
      type: "link-list" | "list" | "chip";
      value: string[];
    }
);

function SectionDataBlock(props: SectionDataBlockProps) {
  const { title, type, value } = props;

  return (
    <div className="space-y-2">
      <p className="font-semibold text-functional-success-900">{title}</p>
      <div className="text-sm text-black">
        {type === "text" && value}
        {type === "list" && (
          <ul className="ml-5 list-disc">
            {value.map((item, index) =>
              typeof item === "string" ? (
                <li key={`${item}-${index.toString()}`}>{item}</li>
              ) : (
                <li key={`${item.label}-${index.toString()}`}>
                  <p>
                    <span className="font-semibold">{item.label}: </span>
                    {item.value}
                  </p>
                </li>
              )
            )}
          </ul>
        )}
        {type === "link-list" && (
          <ul className="ml-5 list-disc">
            {value.map((item, index) => (
              <li
                key={`${item}-${index.toString()}`}
                className="font-semibold text-green-700"
              >
                <Link to={item} target="_blank">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {type === "chip" && (
          <div className="flex flex-row flex-wrap gap-1.5">
            {value.map((item) => (
              <div
                key={item}
                className="flex min-w-10 items-center justify-center rounded-full border border-primary bg-green-50 p-2"
              >
                <span className="text-xs font-semibold leading-3 text-green-800">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionDataBlock;
