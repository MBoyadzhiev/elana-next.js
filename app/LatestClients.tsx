import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import React from "react";

const LatestClients = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { date_joined: "desc" },
    take: 5,
  });
  return (
    <Table.Root>
      <Table.Body>
        {clients.map((client) => (
          <Table.Row key={client.id}>
            <Table.Cell>{client.first_name}</Table.Cell>
            <Table.Cell>{client.last_name}</Table.Cell>
            <Table.Cell>{client.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default LatestClients;
