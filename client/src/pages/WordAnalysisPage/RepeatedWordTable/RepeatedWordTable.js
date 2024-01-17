import React, { useState, useEffect } from 'react';
import { useMantineTheme, } from "@mantine/core";
import { DataTable } from 'mantine-datatable';
import ChartTableHeader from "@/components/ChartTableHeader/ChartTableHeader";
import classes from "./RepeatedWordTable.module.scss";

// datatable document
// https://icflorescu.github.io/mantine-datatable/examples/basic-usage

const PAGE_SIZE = 10;
const employees = [];
for (let index = 1; index < 20; index++) {
    employees.push({ id: index, rank: index, repeatedWord: "Chuang", count: 5 });
}

const RepeatedWordTable = ({ title, subtitle, repeatedWordData }) => {
    const theme = useMantineTheme();

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(repeatedWordData?.slice(0, PAGE_SIZE));

    useEffect(() => {
        if (repeatedWordData) {
            const data = repeatedWordData.map((keyword, index) => ({ ...keyword, id: keyword.name, rank: index + 1 }));
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE;
            setRecords(data?.slice(from, to));
        }
    }, [page, repeatedWordData]);


    return (
        <div style={{ borderRadius: "5px 5px 0 0" }}>
            <ChartTableHeader title={title} subtitle={subtitle} />
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
                        { accessor: 'rank', width: 30, textAlignment: "center" },
                        { accessor: 'name', width: 80, ellipsis: true, },
                        { accessor: 'weight', width: 30, ellipsis: true, textAlignment: "center" },
                        { accessor: 'value', width: 30, ellipsis: true, textAlignment: "center" },
                    ]}
                    totalRecords={repeatedWordData?.length || 0}
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
        </div>
    );
};

export default RepeatedWordTable;