"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const navPostJob = () => router.push("post-job");

  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold">{session?.user.name}</div>
      </div>
      <div>
        <Button className="py-3 px-6" onClick={navPostJob}>
          <FaPlus className="mr-2 w-3 h-3" />
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default Header;
