import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ClientStatusBadge from "../components/ClientStatusBadge";
import ClientActions from "./ClientActions";

const ClientsPage = async () => {
  const clients = await prisma.client.findMany();

  return (
    <div>
      <ClientActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Email
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>
                <Link href={`/clients/${client.id}`}>{client.first_name}</Link>
              </Table.Cell>
              <Table.Cell>
                <Link href={`/clients/${client.id}`}>{client.last_name}</Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {client.email}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ClientStatusBadge status={client.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ClientsPage;
