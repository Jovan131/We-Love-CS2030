'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const encodedQuery = encodeURI(query);
        router.push(`/search?q=${encodedQuery}`);
    };

    return (
        <form className="flex justify-center p-5" onSubmit={onSearch}>
            <input 
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-1/3 sm:px-5 sm:py-3 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="Search for an IG"></input>
        </form>
    )
    
}

export default Search;