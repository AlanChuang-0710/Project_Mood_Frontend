import React, { useEffect, useState, useCallback } from 'react';
import { useMantineTheme, Grid, Modal, TextInput, Button } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Table, HeaderRow, Row, HeaderCell, Cell } from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import SVG from "react-inlinesvg";
import { deleteIcon, editIcon, uploadIcon } from "@/assets/index";
import classes from "@/pages/Administrator/EventSettingTable/EventSettingTable.module.scss";
let data = {
    nodes: [],
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
        "&:focus, &:focusVisible": {
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
        HeaderCell: ``,
        BaseCell: ``,
        Row: `
        background-color: transparent;
        color:${mantainTheme.colorScheme === "dark" ? "white" : "black"};
        svg{
            cursor: pointer
        };
        &:hover {
            background-color: #c8dbfa;
            color: black !important;
            svg {fill: black}
        }`,
        Cell: `
        padding: 2px 10px;
        `
    }]);

    /* Search */
    const [search, setSearch] = useState("");
    const [showData, setShowData] = useState({
        nodes: []
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

    /* Model */
    const [opened, { open, close }] = useDisclosure(false);
    const closeModalHandler = useCallback(() => {
        close();
    });
    const [bpTitle, setbpTitle] = useState("Edit Bury Point");
    const editBuryPoint = useCallback(() => {
        open();
    });
    // 統一控管提交資料
    const form = useForm({
        initialValues: {
            bpId: "",
            name: "",
            trackend: "",
            type: "",
            description: ""
        },

        validate: {
            bpId: (value) => value ? null : 'Invalid bpId',
            name: (value) => value ? null : "Invalid name",
            trackend: (value) => value ? null : "Invalid trackend",
            type: (value) => value ? null : "Invalid type",
            description: (value) => value ? null : "Invalid description",
        },
    });

    const saveHandler = useCallback(() => {

    });

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
                                    <HeaderCell style={{ textAlign: "center" }} stiff>Index</HeaderCell>
                                    <HeaderCell>BP Id</HeaderCell>
                                    <HeaderCell>Name</HeaderCell>
                                    <HeaderCell style={{ textAlign: "center" }}>Trackend</HeaderCell>
                                    <HeaderCell style={{ textAlign: "center" }}>Type</HeaderCell>
                                    <HeaderCell>Description</HeaderCell>
                                    <HeaderCell style={{ textAlign: "center" }}>Edit</HeaderCell>
                                    <HeaderCell style={{ textAlign: "center" }}>Delete</HeaderCell>
                                </HeaderRow>
                            )}
                            body={(item, index) => (
                                <Row item={item}>
                                    <Cell style={{ textAlign: "center" }} stiff>{index + 1}</Cell>
                                    <Cell>{item.bpId}</Cell>
                                    <Cell>{item.name}</Cell>
                                    <Cell style={{ textAlign: "center" }}>{item.trackEnd}</Cell>
                                    <Cell style={{ textAlign: "center" }}>{item.type}</Cell>
                                    <Cell>{item.des}</Cell>
                                    <Cell style={{ textAlign: "center" }}>
                                        <SVG onClick={editBuryPoint} loader={<span>Loading...</span>} fill={mantainTheme.colorScheme === "dark" ? "white" : "black"} src={editIcon} width={"20px"} height={"20px"}></SVG>
                                    </Cell>
                                    <Cell style={{ textAlign: "center" }}>
                                        <SVG loader={<span>Loading...</span>} fill={mantainTheme.colorScheme === "dark" ? "white" : "black"} src={deleteIcon} width={"20px"} height={"20px"}></SVG>
                                    </Cell>
                                </Row>
                            )}
                        />
                    )}
                </Table>
            </div >
            <Modal className={classes.burypoint} opened={opened} onClose={closeModalHandler} withCloseButton={false} yOffset={100}>
                <div className={classes.title}>{bpTitle}</div>
                <div className={classes.input}>
                    <TextInput placeholder="Bury Point Id" label="Bury Point Id" withAsterisk
                        {...form.getInputProps('bpId')} />
                </div>
                <div className={classes.input}>
                    <TextInput placeholder="Bury Point Name" label="Name" withAsterisk
                        {...form.getInputProps('name')} />
                </div>
                <div className={classes.input}>
                    <TextInput placeholder="Frontend/Backend..." label="Trackend" withAsterisk
                        {...form.getInputProps('trackend')} />
                </div>
                <div className={classes.input}>
                    <TextInput placeholder="Click/View..." label="Type" withAsterisk
                        {...form.getInputProps('type')} />
                </div>
                <div className={classes.input}>
                    <TextInput placeholder="Bury point description" label="Description" withAsterisk
                        {...form.getInputProps('description')} />
                </div>
                <div className={classes.btn}>
                    <Button variant="filled" styles={{ root: { width: "100%" } }} onClick={saveHandler}>
                        Save
                    </Button>
                </div>
            </Modal>

        </>
    );
};

export default EventSettingTable;;