import React, { useState, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { useMantineTheme } from "@mantine/core";
import classes from "./ScoreReality.module.scss";

// datatable document
// https://icflorescu.github.io/mantine-datatable/examples/basic-usage

const PAGE_SIZE = 10;

const ScoreReality = () => {
    const theme = useMantineTheme();
    const employees = [];

    for (let index = 0; index < 20; index++) {
        employees.push({ rank: index, lastName: "Chuang" });
    }

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(employees.slice(from, to));
    }, [page]);


    return (
        <div className={classes["table-wrapper"]}>
            <DataTable
                styles={{
                    header: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.brand[0] : "#fff" },
                    pagination: { backgroundColor: "transparent", }
                }}
                highlightOnHover
                borderRadius="md"
                height={300}
                withBorder
                records={records}
                columns={[
                    { accessor: 'rank', width: 30 },
                    { accessor: 'lastName', width: 150, ellipsis: true, },
                ]}
                totalRecords={employees.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={(p) => setPage(p)}
            // uncomment the next line to use a custom loading text
            // loadingText="Loading..."
            // uncomment the next line to display a custom text when no records were found
            // noRecordsText="No records found"
            // uncomment the next line to use a custom pagination text
            // paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
            // uncomment the next line to use a custom pagination color (see https://mantine.dev/theming/colors/)
            // paginationColor="grape"
            // uncomment the next line to use a custom pagination size
            // paginationSize="md"
            />
        </div>
    );
};

export default ScoreReality;