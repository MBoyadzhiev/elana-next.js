import React from "react";
import { prisma } from "@/lib/prisma";
import { Flex, Heading } from "@radix-ui/themes";
import ClientLogs from "./ClientLogs";

interface Props {
  params: { id: string };
}

const ClientLogPage = async ({ params }: Props) => {
  const log = await prisma.clientlog.findMany({
    where: { clientId: parseInt(params.id) },
    orderBy: { log_created: "asc" },
  });

  const clientId = parseInt(params.id);

  return (
    <Flex direction="column" align="center" justify="center" gap="4">
      <Heading>Logs for Client {params.id}</Heading>
      <ClientLogs initialLogs={log} clientId={clientId} />
    </Flex>
  );
};

export default ClientLogPage;
