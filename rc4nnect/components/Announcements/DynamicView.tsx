'use client'

import { useState } from "react"
import Container from "./Container"
import { prisma } from "@/app/db"

type AppProps = {
    announcements: {
        id: string,
        title: string,
        content: string,
        createdDateTime: Date,
        igName: string,

    }[],
    email: string
}

export default function DynamicView({announcements, email} : AppProps) {
    function getAnnouncements() {
        return announcements
    }

    return (
        <>
          <Container announcements={getAnnouncements()} email={email} />
        </>
    )
}