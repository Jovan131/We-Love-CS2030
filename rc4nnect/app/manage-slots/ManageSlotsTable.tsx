'use client'

import React, { useReducer, useState } from 'react'
import { Table, Row, Col, Tooltip, User, Text } from '@nextui-org/react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import NewSlotButton from './NewSlotButton'
import { useTheme } from 'next-themes'

type AppProps = {
  slots: {
    id: string;
    capacity: number | null;
    venue: string;
    startDateTime: Date;
    duration: number;
    description: string | null;
    igName: string;
    residents: { name: string }[]
  }[],
  igsHeaded: string[]
}

type Slot = {
  id: string;
  capacity: number | null;
  venue: string;
  startDateTime: Date;
  duration: number;
  description: string | null;
  igName: string;
  residents: { name: string }[]
}

function ManageSlotsTable({ slots, igsHeaded }: AppProps) {
  const columns = [
    { name: "IG", uid: "igName" },
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "time" },
    { name: "VENUE", uid: "venue" },
    { name: "SLOT AVAILABILITY", uid: "slotAvailability" },
    { name: "ACTIONS", uid: "actions" },
  ];

  function addHours(date: Date, hours: number) {
    let dummyDate = new Date(date);   // create a new copy of the date object to prevent side effects
    dummyDate.setTime(dummyDate.getTime() + (hours*60*60*1000))  // this allows the function to work if `hours` is a decimal
  
    return dummyDate.toLocaleTimeString('en-SG', {
      hour12: false,
      hour: "2-digit", 
      minute: "2-digit",
    });
  }

  function renderCell(slot: Slot, columnKey) {
    const cellValue = slot[columnKey];
    switch (columnKey) {
      case "date":
        return (
          slot.startDateTime.toLocaleDateString('en-SG')
        );
      case "time":
        return (
          `${slot.startDateTime.toLocaleTimeString('en-SG', {
            hour12: false,
            hour: "2-digit", 
            minute: "2-digit",
          })}-${addHours(slot.startDateTime, slot.duration)}`
        );
      case "slotAvailability":
        return " " + slot.residents.length + "/" + (slot.capacity ?? "~")

      case "actions":
        return (
          <div className='flex gap-3.5 justify-center'>
            <EditButton slot={slot} />
            <DeleteButton slotId={slot.id} />
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>
      <NewSlotButton igsHeaded={igsHeaded} />
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              css={{color: "black"}}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={slots}>
          {(slot: Slot) => (
            <Table.Row key={slot.id} css={{themecolor: "white"}}>
              {(columnKey) => (
                <Table.Cell>{renderCell(slot, columnKey)}</Table.Cell>
              )}
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
    </>
  )
}

export default ManageSlotsTable