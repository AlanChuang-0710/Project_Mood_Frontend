import React, { useState, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';

// datatable document
// https://icflorescu.github.io/mantine-datatable/examples/basic-usage

const PAGE_SIZE = 10;

const ScoreReality = () => {

    const employees = [
        { firstName: "Alan", lastName: "Chuang1111111111 111111111111111111111", email: "a135@gmail.com" }
    ];

    for (let index = 0; index < 20; index++) {
        employees.push({ firstName: "Alan", lastName: "Chuang" });
    }

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(employees.slice(from, to));
    }, [page]);


    return (
        <DataTable
            style={{ backgroundColor: "transparent" }}
            highlightOnHover
            borderRadius="md"
            height={300}
            withBorder
            records={records}
            columns={[
                { accessor: 'firstName', width: 100 },
                { accessor: 'lastName', width: 100 },
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
    );
};

export default ScoreReality;