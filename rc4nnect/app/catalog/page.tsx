import React from 'react'
import Layout from '@/components/Layout';
import Container from '@/components/Catalog/Container';
import Filter from '@/components/Catalog/Filter';
import { prisma } from "@/app/db";
import { useState } from 'react';

function getIg(category: string) {
    return prisma.iG.findMany({
        where: {
            category: category,
        }   
    })
}


export default async function page() {
    const ig = await getIg("Sports")
    return (
        <Layout routeIndex={4}>
            <Filter />
            <Container igInfos={ig}/>

        </Layout>
      );
}
