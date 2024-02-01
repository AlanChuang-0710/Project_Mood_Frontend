import React, { useEffect, useState } from 'react';
import { useMantineTheme, Grid } from "@mantine/core";
import { Table, HeaderRow, Row, HeaderCell, Cell } from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import classes from "@/pages/Administrator/EventSettingTable/EventSettingTable.module.scss";

let data = {
    nodes: [],
    pageInfo: {
        totalPages: 10,
        total: 100,
        limit: 10
    }
};

for (let index = 0; index < 20; index++) {
    data.nodes.push({
        id: '0',
        bpId: "0001",
        name: 'Dashboard:HappyAction',
        type: 'Click',
        trackEnd: "FrontEnd",
        des: "用戶點擊XXXXX",
    });
}


const EventSettingTable = () => {
    /* Table 樣式 */
    const mantainTheme = useMantineTheme();
    const searchStyle = {
        color: mantainTheme.colorScheme === 'light' ? "black" : "white",
        marginBottom: "10px",
        border: "none",
        borderBottom: "1px solid black",
        borderColor: mantainTheme.colorScheme === "dark" ? "white" : "black",
        borderRadius: "2px",
        backgroundColor: "transparent",
        "&:focus, &:focus-visible": {
            outline: " none"
        }
    };
    const theme = useTheme([getTheme(), {
        Table: " --data-table-library_grid-template-columns:  25% 25% 25% 25% minmax(150px, 1fr);",
        HeaderRow: `
        color:${mantainTheme.colorScheme === "dark" ? "white" : "black"};
        font-szie: 18px;
        background-color: ${mantainTheme.colorScheme === "dark" ? mantainTheme.colors.brand[0] : "#fff"};
        border-bottom: 1px solid black;
        `,
        HeaderCell: `
        &:nth-child(1) {
            text-align: center;
        }
        `,
        BaseCell: `
        &:nth-child(1) {
            text-align: center
        }
        `,
        Row: `
        background-color: transparent;
        color:${mantainTheme.colorScheme === "dark" ? "white" : "black"};
        &:hover {
            background-color: #c8dbfa;
            color: black !important
        }`,
        Cell: `
        padding: 2px 10px`
    }]);

    /* Search */
    const [search, setSearch] = useState("");
    const [showData, setShowData] = useState({
        nodes: [], pageInfo: {
            totalPages: 10,
            total: 100,
            limit: 10
        }
    });
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        let filterData = data.nodes.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setShowData((preVal) => ({ ...preVal, nodes: filterData }));
    }, [search]);

    /* Pagination */
    // const pagination = usePagination(data, {
    //     state: {
    //         page: 0,
    //         size: 2,
    //     },
    //     onChange: onPaginationChange,
    // });

    // function onPaginationChange(action, state) {
    //     console.log(action, state);
    // }

    return (
        <>
            <Grid>
                <Grid.Col xs={12} md={4}></Grid.Col>
            </Grid>
            <label htmlFor="search" style={{ fontSize: "18px" }}>
                <span>&nbsp;&nbsp;Search:&nbsp;</span>
                <input className={classes.search} style={searchStyle} id="search" type="text" value={search} onChange={handleSearch} />
            </label>
            <div style={{ height: "300px", borderRadius: "4px 4px 0 0", overflow: 'hidden' }}>
                <Table data={showData} theme={theme} layout={{ isDiv: true, fixedHeader: true, horizontalScroll: true }}>
                    {(tableList) => (
                        <Virtualized
                            tableList={tableList}
                            rowHeight={36}
                            header={() => (
                                <HeaderRow>
                                    <HeaderCell stiff>Index</HeaderCell>
                                    <HeaderCell>BP Id</HeaderCell>
                                    <HeaderCell>Name</HeaderCell>
                                    <HeaderCell>Trackend</HeaderCell>
                                    <HeaderCell>Type</HeaderCell>
                                    <HeaderCell>Description</HeaderCell>
                                    <HeaderCell>Edit</HeaderCell>
                                    <HeaderCell>Delete</HeaderCell>
                                </HeaderRow>
                            )}
                            body={(item, index) => (
                                <Row item={item}>
                                    <Cell stiff>{index + 1}</Cell>
                                    <Cell>{item.bpId}</Cell>
                                    <Cell>{item.name}</Cell>
                                    <Cell>{item.trackEnd}</Cell>
                                    <Cell>{item.type}</Cell>
                                    <Cell>{item.des}</Cell>
                                    <Cell>Edit Icon</Cell>
                                    <Cell>Delete Icon</Cell>
                                </Row>
                            )}
                        />
                    )}
                </Table>
            </div >
            <br />

        </>
    );
};

export default EventSettingTable;;