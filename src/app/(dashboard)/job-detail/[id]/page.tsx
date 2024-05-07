import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import prisma from "../../../../../lib/prisma";

type paramsType = {
  id: string;
};

interface JobDetailPageProps {
  params: paramsType;
}

export const revalidate = 0;

async function getJobDetail(id: string) {
  const job = prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      applicant: {
        include: {
          User: true,
        },
      },
      CategoryJob: true,
    },
  });

  return job;
}

const JobDetailPage: FC<JobDetailPageProps> = async ({ params }) => {
  const job = await getJobDetail(params.id);

  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href="/job-listings">
            <ArrowLeftIcon className="w-9 h-9" />
          </Link>
        </div>
        <div>
          <div className="text-2xl font-semibold mb-1">{job?.roles}</div>
          <div>
            {job?.CategoryJob?.name} . {job?.jobType} . {job?.applicants}/
            {job?.needs} Hired
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetail">Job Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicants={job?.applicants} />
        </TabsContent>
        <TabsContent value="jobDetail">
          <JobDetail detail={job} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobDetailPage;
