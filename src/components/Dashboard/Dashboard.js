import React, { useState } from 'react';
import './Dashboard.css';
import DrillMatrix from './components/DrillMatrix';
import Dropdown from './components/Dropdown';
import Viz from './components/Viz';
import mbbdata from './data/mbbdata.json';
import { Box, Tab, Tabs } from '@mui/material';
import { Container } from '@mui/system';

export default function Dashboard() {
    const [person, setPerson] = useState('Lance Terry');
    const [tab, setTab] = React.useState(0);
    var playerData = [];

    var sumx = 0;
    var sumy = 0;
    mbbdata.forEach((element) => {
        if (element.Player_Name === person) {
            playerData.push({
                x: element.Mechanical_Load,
                y: element.Physio_Load,
                day: element.Date,
            });
            sumx += element.Mechanical_Load;
            sumy += element.Physio_Load;
        }
    });

    var averageData = [
        {
            x: Math.round(sumx / playerData.length),
            y: Math.round(sumy / playerData.length),
            day: 'average',
        },
    ];

    function TabPanel({ children, value, index, ...other }) {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`dashboard-tabpanel-${index}`}
                aria-labelledby={`dashboard-tab-${index}`}
                {...other}
            >
                {value === index && children}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `dashboard-tab-${index}`,
            'aria-controls': `dashboard-tabpanel-${index}`,
        };
    }

    //brayden daniels is broken
    return (
        <>
            <h1 className="viz">Dashboard</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={(_, newTab) => setTab(newTab)}
                    centered
                >
                    <Tab label="Mechanical vs Physio Graph" {...a11yProps(0)} />
                    <Tab label="Phases Graph" {...a11yProps(1)} />
                    <Tab label="Drill Matrix" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <TabPanel value={tab} index={0}>
                    <div>
                        <h1 className="viz">Mechanical vs Physio Graph</h1>
                        <div className="dropdown">
                            <Dropdown player={person} setPlayer={setPerson} />
                        </div>
                        <div className="viz">
                            <Viz
                                player={person}
                                playerData={playerData}
                                averageData={averageData}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <DrillMatrix />
                </TabPanel>
            </Container>
        </>
    );
}
