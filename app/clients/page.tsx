// import React from "react";
// import { Flex, Table } from "@radix-ui/themes";
// import { prisma } from "@/lib/prisma";
// import Link from "../components/Link";
// import ClientStatusBadge from "../components/ClientStatusBadge";
// import ClientActions from "./ClientActions";
// import Pagination from "../components/Pagination";

// interface Props {
//   searchParams: { page?: string };
// }

// const ClientsPage = async ({ searchParams }: Props) => {
//   const pageSize = 10;
//   const currentPage = parseInt(searchParams.page || "1");
//   const skip = (currentPage - 1) * pageSize;

//   const [clients, totalClients] = await Promise.all([
//     prisma.client.findMany({
//       skip,
//       take: pageSize,
//       orderBy: { date_joined: "desc" },
//     }),
//     prisma.client.count(),
//   ]);

//   return (
//     <Flex direction="column" gap="4">
//       <ClientActions />
//       <Table.Root variant="surface">
//         <Table.Header>
//           <Table.Row>
//             <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
//             <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
//             <Table.ColumnHeaderCell className="hidden md:table-cell">
//               Email
//             </Table.ColumnHeaderCell>
//             <Table.ColumnHeaderCell className="hidden md:table-cell">
//               Date Joined
//             </Table.ColumnHeaderCell>
//             <Table.ColumnHeaderCell className="hidden md:table-cell">
//               Status
//             </Table.ColumnHeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {clients.map((client) => (
//             <Table.Row key={client.id}>
//               <Table.Cell>
//                 <Link href={`/clients/${client.id}`}>{client.first_name}</Link>
//               </Table.Cell>
//               <Table.Cell>
//                 <Link href={`/clients/${client.id}`}>{client.last_name}</Link>
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell">
//                 {client.email}
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell">
//                 {new Date(client.date_joined).toDateString()}
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell">
//                 <ClientStatusBadge status={client.status} />
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>

//       <Pagination
//         itemCount={totalClients}
//         pageSize={pageSize}
//         currentPage={currentPage}
//       />
//     </Flex>
//   );
// };

// export default ClientsPage;

import ClientActions from "./ClientActions";
import ClientTable from "./ClientTable";
const ClientsPage = () => {
  return (
    <div>
      <ClientActions />
      <ClientTable />
    </div>
  );
};

export default ClientsPage;
