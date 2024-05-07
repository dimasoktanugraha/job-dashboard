import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_APPLICANT_COLUMNS } from "@/constants";
import React, { FC } from "react";
import TableAction from "../TabelAction";

interface ApplicantsProps {
  applicants: any;
}

const Applicants: FC<ApplicantsProps> = ({ applicants }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {JOB_APPLICANT_COLUMNS.map((item: string, i: number) => (
            <TableHead key={item + i}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && (
          <>
            {applicants.map((item: any, i: number) => (
              <TableRow key={item.id + i}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <TableAction url="" />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default Applicants;
