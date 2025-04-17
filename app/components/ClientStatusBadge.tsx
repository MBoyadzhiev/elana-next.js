import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "red" | "yellow" }
> = {
  ACTIVE: { label: "Active", color: "green" },
  INACTIVE: { label: "Inactive", color: "red" },
  PENDING_PAYMENT: { label: "Pending Payment", color: "yellow" },
};

const ClientStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default ClientStatusBadge;
