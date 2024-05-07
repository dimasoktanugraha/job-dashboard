import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMNS } from "@/constants";
import { Badge } from "@/components/ui/badge";
import TableAction from "@/components/organisms/TabelAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";
import { Job } from "@prisma/client";
import { dateFormat } from "@/lib/utils";
import moment from "moment";

interface JobListingsPageProps {}

export const revalidate = 0;

async function getDataJob() {
  const session = await getServerSession(authOptions);

  const jobs = prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  return jobs;
}

const JobListingsPage: FC<JobListingsPageProps> = async ({}) => {
  const jobs = await getDataJob();

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listings</div>
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((item: Job, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <TableAction url={`/job-detail/${item.id}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
