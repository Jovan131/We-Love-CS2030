"use client"

import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (eventKey: string | null) => {
    if (eventKey) {
      setActiveTab(eventKey);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200">
        <Tabs activeKey={activeTab} onSelect={handleTabChange} className="flex flex-col h-full">
          <Tab eventKey="home" title="Home">
            {/* Home Tab Content */}
          </Tab>
          <Tab eventKey="browse" title="Browse">
            {/* Browse Tab Content */}
          </Tab>
          <Tab eventKey="settings" title="Settings">
            {/* Settings Tab Content */}
          </Tab>
        </Tabs>
      </div>
      <div className="w-3/4">
        <Container className="py-4">
          <Row>
            <Col>
              {/* Calendar Component with weekly view */}
              {/* Replace this with your actual calendar component */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
