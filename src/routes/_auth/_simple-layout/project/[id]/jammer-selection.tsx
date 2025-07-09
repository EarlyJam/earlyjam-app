import { useState } from "react";

import { createFileRoute, redirect } from "@tanstack/react-router";

import DataBlock from "@/components/page-components/Project/DataBlock";
import Button from "@/components/shared-components/Button";
import Chip from "@/components/shared-components/Chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Divider from "@/components/ui/divider";
import Heading3 from "@/components/ui/heading3";
import Heading5 from "@/components/ui/heading5";
import { UserType } from "@/enums/user.ts";
import { getProfileFullName } from "@/helpers/profile";
import useCreateProjectJammers from "@/hooks/mutations/useCreateProjectJammers";
import useActiveJammers from "@/hooks/queries/useActiveJammers.ts";
import { useToast } from "@/hooks/useToast.ts";
import { getNameInitials } from "@/utils";

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/[id]/jammer-selection"
)({
  beforeLoad({ context }) {
    const { authProfile } = context;

    if (!authProfile || authProfile.user_type !== UserType.Client) {
      return redirect({ to: "/" });
    }
  },
  component: JammerSelection
});

function JammerSelection() {
  const { id } = Route.useParams();

  const { toast } = useToast();

  const [selectedJammers, setSelectedJammers] = useState<string[]>([]);

  const { data: jammers = [] } = useActiveJammers();
  const {
    mutateAsync: createProjectJammers,
    isPending: isCreatingProjectJammers
  } = useCreateProjectJammers();
  // Removed payment-related hooks
  // const {
  //   mutateAsync: createProjectPayment,
  //   isPending: isCreatingProjectPayment
  // } = useCreateProjectPayment();
  // const {
  //   mutateAsync: createCheckoutSession,
  //   isPending: isCreatingCheckoutSession
  // } = useCreateCheckoutSession();

  const handleAddJammers = async () => {
    if (selectedJammers.length === 2) {
      await createProjectJammers({
        projectId: id,
        userIds: selectedJammers
      });
      toast({
        title: "Success",
        description: "Jammers added to project.",
        variant: "success"
      });
    } else {
      toast({
        title: "Error",
        description: "Please select 2 Jammers",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="px-5 py-10">
      <div className="m-auto w-1/2">
        <div className="flex flex-row items-start gap-8">
          <div className="mb-6 w-full max-w-[488px] shrink-0 space-y-2">
            <Heading3>Here’s your list of Jammers</Heading3>
            <p className="text-sm text-gray-700">
              We’ve selected the most related Jammers. All our Jammers are
              seasoned, senior designers diverse experience and expertise.
            </p>
          </div>
          <div className="h-px w-70" />
        </div>
        <div className="flex flex-row items-start gap-8">
          <div className="w-full max-w-[488px] shrink-0 space-y-4">
            {jammers.map((jammer) => (
              <Card key={jammer.id}>
                <CardContent className="p-6">
                  <div className="mb-3 flex flex-row items-start justify-between">
                    <div className="flex flex-row items-center gap-3">
                      <Avatar className="h-13.5 w-13.5">
                        <AvatarImage src={jammer.profile_image} alt="avatar" />
                        <AvatarFallback>
                          {getNameInitials(getProfileFullName(jammer))}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold leading-6 text-blue-secondary-dark">
                          {getProfileFullName(jammer)}
                        </p>
                        <p className="text-sm font-normal text-green-800">
                          Approval rate&nbsp;
                          <span className="font-semibold">98%</span>
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      className="border-gray-600-secondary text-blue-secondary-dark accent-blue-secondary-dark outline-none data-[state=checked]:bg-transparent"
                      checked={selectedJammers.includes(jammer.id)}
                      disabled={
                        !selectedJammers.includes(jammer.id) &&
                        selectedJammers.length === 2
                      }
                      onCheckedChange={() => {
                        setSelectedJammers((prev) =>
                          prev.includes(jammer.id)
                            ? prev.filter((id) => id !== jammer.id)
                            : [...prev, jammer.id]
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-row flex-wrap gap-1.5">
                    {jammer.expertise?.map((option) => (
                      <Chip key={option} label={option} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="w-70 space-y-4 rounded-2xl border border-gray-200 bg-white px-4 py-5">
            <Heading5>Payment</Heading5>
            <Divider />
            <div className="space-y-6">
              <DataBlock
                title="Number of Jammer"
                value={selectedJammers.length}
              />
              <DataBlock title="Total payment" value="$99" />
            </div>
            <Button
              loading={isCreatingProjectJammers}
              onClick={handleAddJammers}
            >
              Add Jammers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
