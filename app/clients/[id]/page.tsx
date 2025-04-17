import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, Flex, Heading } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

const ClientLogPage = async ({ params }: Props) => {
  const log = await prisma.clientLog.findMany({
    where: {
      clientId: parseInt(params.id),
    },
    orderBy: {
      log_created: "asc",
    },
  });

  if (log.length === 0) notFound();

  return (
    <div>
      <Heading>Logs for Client {params.id}</Heading>
      <ul>
        {log.map((log) => (
          <Flex gap="4" my="4" key={log.id}>
            {" "}
            <li key={log.id}>
              <Card>{log.log_message}</Card>
              <p>
                {" "}
                Created at {new Date(log.log_created).toLocaleString()}
              </p>{" "}
            </li>
          </Flex>
        ))}
      </ul>
    </div>
  );
};

export default ClientLogPage;
