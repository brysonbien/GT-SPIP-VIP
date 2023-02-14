import {
    Autocomplete,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { percentage, summaryStats } from '../../../utils/stats';
import { amber, indigo } from '@mui/material/colors';

export default function DrillMatrix() {
    const [data, setData] = useState();
    const [metric, setMetric] = useState('');
    const [stats] = useState({});
    const [gradients] = useState({});
    const [orderBy, setOrderBy] = useState(1);
    const [order, setOrder] = useState('desc');

    const SortArrow = ({ colIndex }) => (
        <TableSortLabel
            active={orderBy === colIndex}
            direction={orderBy === colIndex ? order : 'asc'}
            onClick={() => {
                setOrder(
                    orderBy === colIndex && order === 'asc' ? 'desc' : 'asc'
                );
                setOrderBy(colIndex);
            }}
        ></TableSortLabel>
    );
    const Indicator = ({ metric, value, ...other }) => {
        return (
            <TableCell
                sx={{
                    background: gradients[metric],
                    padding: 0,
                    position: 'relative',
                }}
            >
                {/* {breakpoints.map((percentage) => (
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            width: '1px',
                            height: '100%',
                            top: '0',
                            left: `${percentage}%`,
                            position: 'absolute',
                        }}
                    ></Box>
                ))} */}
                <Box
                    sx={{
                        backgroundColor: indigo[600],
                        color: 'white',
                        width: `calc(${percentage(
                            value,
                            0,
                            (10 / 9) * stats[metric].max
                        )}% - 0.5em)`,
                        height: '30px',
                        lineHeight: '30px',
                        borderRadius: '0 4px 4px 0',
                        textAlign: 'right',
                        paddingRight: '8px',
                    }}
                    className="mono"
                >
                    {value.toFixed(2)}
                </Box>
            </TableCell>
        );
    };

    useEffect(() => {
        fetch('http://localhost:8080/drills')
            .then((response) => response.json())
            .then((data) => {
                data.metrics.forEach((metric) => {
                    stats[metric] = summaryStats(
                        data.avgs.map(([_, avgs]) => avgs[metric])
                    );
                    const max = (10 / 9) * stats[metric].max;
                    const breakpoints = [
                        0,
                        percentage(stats[metric].q1, 0, max),
                        percentage(stats[metric].med, 0, max),
                        percentage(stats[metric].q3, 0, max),
                        100,
                    ];
                    gradients[metric] = `linear-gradient(90deg, ${breakpoints
                        .slice(1)
                        .map(
                            (percentage, i) =>
                                `${amber[i * 200 + 100]} ${breakpoints[i]}%, ${
                                    amber[i * 200 + 100]
                                } ${percentage}%`
                        )
                        .join(', ')})`;
                });
                setMetric(data.metrics[0]);
                setData(data);
            });
    }, []);

    return (
        <>
            {data && (
                <>
                    <Autocomplete
                        sx={{ mb: 1 }}
                        value={metric}
                        onChange={(_, newMetric) => setMetric(newMetric)}
                        options={data.metrics}
                        renderInput={(params) => (
                            <TextField {...params} label="Select a metric" />
                        )}
                        disableClearable
                    />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            width: '30%',
                                            minWidth: '200px',
                                        }}
                                    >
                                        Drill
                                        <SortArrow colIndex={0} />
                                    </TableCell>
                                    <TableCell>
                                        {metric}
                                        <SortArrow colIndex={1} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data &&
                                    data.avgs
                                        .sort(
                                            (a, b) =>
                                                (order === 'asc' ? 1 : -1) *
                                                (orderBy === 0
                                                    ? a[0].localeCompare(b[0])
                                                    : a[orderBy][metric] -
                                                      b[orderBy][metric])
                                        )
                                        .map(([drillName, avgs]) => (
                                            <TableRow>
                                                <TableCell>
                                                    {drillName}
                                                </TableCell>
                                                <Indicator
                                                    metric={metric}
                                                    value={avgs[metric]}
                                                />
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}
