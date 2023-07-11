'use client'
import { IG } from "@prisma/client";
import Search from "@/components/Catalog/Search";
import Layout from "@/components/Layout";
import Container from "@/components/Catalog/Container";
import Card from "@/components/Catalog/Card";


import { useSearchParams } from "next/navigation";
import useSWR from 'swr';

const fetchIG = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to search IG');
    }

    return response.json();
};

const SearchPage = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;


    const encodedSearhQuery = encodeURI(searchQuery || "");
    const {data, isLoading} = useSWR<{ iGs: Array<IG> }>(`/api/search?q=${encodedSearhQuery}`, fetchIG)

    if (!data?.iGs) {
        return null;
    }

    return (
        <Layout routeIndex={5}>
        <Search />
        <div>
            {data.iGs.map((iG) => (
                <div>{iG.name}</div>
            ))}
        </div>

    </Layout>
        
    );
};

export default SearchPage