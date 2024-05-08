"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

interface TableActionProps {
  url: string;
}

const TableAction: FC<TableActionProps> = ({ url }) => {
  const router = useRouter();

  return (
    <Button size="icon" variant="outline" onClick={() => router.push(url)}>
      <MoreVertical className="w-4 h-4" />
    </Button>
  );
};

export default TableAction;
