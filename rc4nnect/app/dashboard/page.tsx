"use client"

import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';
import Calendar from '@/components/Calendar';
import Layout from '@/components/Layout';

const Dashboard = () => {

  return (
    <Layout>
      <div>
        <h1 className="text-center font-bold text-4xl translate-y-10">Your Schedule for the week:</h1>

      </div>
        <div className="fixed top-1/3 left-10 w-11/12">
            <Calendar/>
        </div>
    </Layout>
  );
};

export default Dashboard;
