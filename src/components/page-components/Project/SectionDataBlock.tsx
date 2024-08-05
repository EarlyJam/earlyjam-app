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
      <p className="text-sm text-black">
        {type === "text" && value}
        {type === "list" && (
          <ul className="list-disc ml-5">
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
              ),
            )}
          </ul>
        )}
        {type === "link-list" && (
          <ul className="list-disc ml-5">
            {value.map((item, index) => (
              <li
                key={`${item}-${index.toString()}`}
                className="text-green-700 font-semibold"
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
                className="flex items-center justify-center p-2 rounded-full bg-green-50 border border-primary min-w-10"
              >
                <span className="text-xs leading-3 font-semibold text-green-800">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </p>
    </div>
  );
}

export default SectionDataBlock;
