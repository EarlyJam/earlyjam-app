import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectGridItemSkeleton() {
  return (
    <Card className="h-42">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-full h-4 max-w-80 bg-gray-400-disable" />
          <div className="text-gray-700 space-y-1">
            <Skeleton className="w-full h-4 max-w-60 bg-gray-400-disable" />
            <Skeleton className="w-full h-4 max-w-60 bg-gray-400-disable" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="w-full h-8 max-w-40 bg-gray-400-disable" />
          <Skeleton className="w-full h-6 max-w-20 bg-gray-400-disable" />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectGridItemSkeleton;
