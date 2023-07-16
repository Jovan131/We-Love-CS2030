'use client'

import { useState } from "react"
import Container from "./Container"
import Filter from "./Filter"

type AppProps = {
    igInfos: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
        members: {email: string}[],
        subscribed: boolean,
    }[],
    email: string
}

export default function DynamicCatalog({igInfos, email} : AppProps) {
    const [filtered, setFiltered] = useState("All");

    function changeFilter(newFilter: string) {
        setFiltered(newFilter)
    }

    function getIGs() {
        if (filtered === 'Sports') {
            return igInfos.filter((iG) => iG.category === "Sports");
        } else if (filtered === 'Music') {
            return igInfos.filter((iG) => iG.category === "Music");
        } else if (filtered === 'Lifestyle') {
            return igInfos.filter((iG) => iG.category === "Lifestyle");
        } else if (filtered === 'Arts') {
            return igInfos.filter((iG) => iG.category === "Arts");
        } else if (filtered === 'Cogpods') {
            return igInfos.filter((iG) => iG.category === "Cogpods");
        } else if (filtered === 'Community') {
            return igInfos.filter((iG) => iG.category === "Community");
        } else {
            return igInfos;
        }
    }

    return (
        <>
        <div className='flex justify-center pt-5'>
          <Filter changeFilter={changeFilter} />
        </div>
          <Container igInfos={getIGs()} email={email} />
        </>
    )
}