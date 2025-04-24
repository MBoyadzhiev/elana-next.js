"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, Flex } from "@radix-ui/themes";
import Link from "../components/Link";
import ClientStatusBadge from "../components/ClientStatusBadge";
import Pagination from "../components/Pagination";

interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  status: string;
}

const ClientTable = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const [clients, setClients] = useState<Client[]>([]);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch(
        `/api/clients?page=${currentPage}&size=${pageSize}`
      );
      const data = await res.json();
      setClients(data.clients);
      setTotalClients(data.total);
    };
    fetchClients();
  }, [currentPage]);

  return (
    <Flex direction="column" gap="4">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Email
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date Joined
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
                {new Date(client.date_joined).toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ClientStatusBadge status={client.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalClients}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export default ClientTable;
