'use client'

import { useState } from "react"
import Container from "./Container"
import Filter from "./Filter"

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
    const [filtered, setFiltered] = useState("Today");

    function changeFilter(newFilter: string) {
        setFiltered(newFilter)
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    function getAnnouncements() {
        if (filtered === 'Today') {
            return announcements.filter((a) => a.createdDateTime >= today);
        } else if (filtered === 'Past Week') {
            return announcements.filter((a) => a.createdDateTime >= lastWeek);
        } else if (filtered === 'All') {
            return announcements;
        } else {
            return announcements;
        }
    }

    return (
        <>
        <div className = 'flex pt-5 justify-end'>
            <Filter changeFilter={changeFilter} />
        </div>
        <div className='pt-6 ml-3'>
          <Container announcements={getAnnouncements()} email={email} />
        </div>
        </>
    )
}