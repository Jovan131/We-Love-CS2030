'use client'

import React from 'react';
import 'tailwindcss/tailwind.css';
import { Table, useAsyncList, useCollator } from '@nextui-org/react';
import { UserRole } from '@prisma/client';

type AppProps = {
  users: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[]
}

export default function UsersTable({ users }: AppProps) {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "role",
      label: "ROLE",
    }
  ]

  const collator = useCollator({ numeric: true });
  async function load() {
    return {
      items: users,
    };
  }
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList({ load, sort });

  return (
    <div className='mt-10 ml-3'>
      <Table
        aria-label="Table of user information"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key} allowsSorting css={{color: "black", width: "40%"}}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={list.items}>
          {(user) => (
            <Table.Row key={user.id}>
              {(columnKey) => <Table.Cell><div className='text-black dark:text-white'>{user[columnKey]}</div></Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </div>
  );
}   