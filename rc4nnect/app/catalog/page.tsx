import React from 'react'
import Layout from '@/components/Layout';
import DynamicCatalog from '@/components/Catalog/DynamicCatalog';
import Filter from '@/components/Catalog/Filter';
import { prisma } from '../db';
import { useState } from 'react';
import Search from '@/components/Catalog/Search';

async function getIg() {
    return prisma.iG.findMany({
    })
}


export default async function page() {
    const ig = await getIg()
    return (
        <Layout routeIndex={4}>

            <DynamicCatalog igInfos={ig}/>

        </Layout>
      );
}
