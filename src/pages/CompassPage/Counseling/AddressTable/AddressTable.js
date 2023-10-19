import React, { useState, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { Modal, useMantineTheme, HoverCard, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import classes from "./AddressTable.module.scss";
import { IconInfoCircleFilled } from '@tabler/icons-react';

// datatable document
// https://icflorescu.github.io/mantine-datatable/examples/basic-usage

const PAGE_SIZE = 10;
const employees = [];
for (let index = 1; index < 20; index++) {
    employees.push({ id: index, name: "心安診所", address: `台中市大里區中興里新安路${index}號45689789789` });
}

const AddressTable = ({ title, subtitle }) => {
    const theme = useMantineTheme();
    const [opened, { close, toggle }] = useDisclosure(false);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(employees.slice(from, to));
    }, [page]);


    return (
        <div style={{ borderRadius: "5px 5px 0 0" }}>
            <div style={{ position: "relative" }}>
                <div className={classes.title}>{title}</div>
                <div style={{ position: "absolute", right: "0", top: "3px" }}>
                    <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                            <IconInfoCircleFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text size="sm">
                                {subtitle}
                            </Text>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </div>
            </div>
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
                        { accessor: 'name', width: 40, textAlignment: "center" },
                        { accessor: 'address', width: 130, ellipsis: true, },
                    ]}
                    totalRecords={employees.length}
                    recordsPerPage={PAGE_SIZE}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    onRowClick={() => {
                        toggle();
                    }}
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
            <Modal opened={opened} onClose={close} title="Authentication" centered zIndex={9999}>
                {/* Modal content */}
            </Modal>
        </div>
    );
};

export default AddressTable;