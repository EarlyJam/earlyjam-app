import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectGridItemSkeleton() {
  return (
    <Card className="h-42">
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-full max-w-80 bg-gray-400-disable" />
          <div className="space-y-1 text-gray-700">
            <Skeleton className="h-4 w-full max-w-60 bg-gray-400-disable" />
            <Skeleton className="h-4 w-full max-w-60 bg-gray-400-disable" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-full max-w-40 bg-gray-400-disable" />
          <Skeleton className="h-6 w-full max-w-20 bg-gray-400-disable" />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectGridItemSkeleton;
