'use client'

import React from 'react';
import 'tailwindcss/tailwind.css';
import { Table, User, Col, Row, Text, Tooltip } from '@nextui-org/react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import Image from 'next/image';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';


type AppProps = {
  applications: {
    id: string;
    applicantFullName: string;
    applicantTeleHandle: string;
    igName: string;
    applicantEmail: string;
  }[]
}

type Application = {
  id: string;
  applicantFullName: string;
  applicantTeleHandle: string;
  igName: string;
  applicantEmail: string;
}

export default function ApplicationsTable({ applications }: AppProps) {
  const columns = [
    { name: "APPLICANT", uid: "applicant" },
    { name: "APPLICANT TELE HANDLE", uid: "applicantTeleHandle" },
    { name: "IG APPLIED FOR", uid: "igName" },
    { name: "ACTIONS", uid: "actions" },
  ];

  function renderCell(application: Application, columnKey: any) {
    const cellValue = application[columnKey];
    switch (columnKey) {
      case "applicant":
        return (
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            <div className="font-medium dark:text-white">
              <div>{application.applicantFullName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{application.applicantEmail}</div>
            </div>
          </div>
        );
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <AcceptButton application={application}/>
            </Col>
            <Col css={{ d: "flex" }}>
              <RejectButton application={application}/>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className='mt-10 ml-3'>
      <Table
        aria-label="IG Head applications table"
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
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
              css={{color: "black"}}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={applications}>
          {(application) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell css={{color: "white"}}>{renderCell(application, columnKey)}</Table.Cell>
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
    </div>
  );
}   