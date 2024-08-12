import SectionTitle from "@/components/page-components/Project/LeftSection/SectionTitle";
import SectionDataBlock from "@/components/page-components/Project/SectionDataBlock";
import { Project } from "@/types/project";
import { ProjectDraft } from "@/types/projectDraft";

type LeftSectionProps = {
  project: Project | ProjectDraft;
};

function LeftSection(props: LeftSectionProps) {
  const { project } = props;

  return (
    <div className="w-full min-w-96 rounded-2xl bg-white px-4 py-6 sm:w-auto sm:grow sm:px-10">
      <div className="space-y-8">
        <div className="space-y-4">
          <SectionTitle>About Product</SectionTitle>
          <div className="space-y-5">
            <SectionDataBlock
              type="text"
              title="Name of Product"
              value={project.product_name ?? ""}
            />
            <SectionDataBlock
              type="text"
              title="Product Overview"
              value={project.product_description ?? ""}
            />
            <SectionDataBlock
              type="list"
              title="Key Features"
              value={[project.product_problem_statement ?? ""]}
            />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle>Your Tasks</SectionTitle>
          <div className="space-y-5">
            <SectionDataBlock
              type="list"
              title="Critique Focus"
              value={[project.designer_critique_aspects ?? ""]}
            />
            <SectionDataBlock
              type="list"
              title="Feedback Aspects"
              value={project.feedback_aspects ?? []}
            />
            <SectionDataBlock
              type="list"
              title="Feature/Flow"
              value={[project.feedback_feature ?? ""]}
            />
            <SectionDataBlock
              type="list"
              title="Feedback Goals"
              value={project.feedback_goals ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
