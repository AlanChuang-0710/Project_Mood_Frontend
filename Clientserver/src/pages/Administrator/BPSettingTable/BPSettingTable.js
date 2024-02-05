import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useMantineTheme, Grid, Modal, TextInput, Button, Dialog, Group, Text, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import SVG from "react-inlinesvg";
import { Table, HeaderRow, Row, HeaderCell, Cell } from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import { useGetAllBuryPointDataQuery, useAddBuryPointMutation, useEditBuryPointMutation, useDeleteBuryPointMutation } from "@/store/api/adminApi";
import { deleteIcon, editIcon } from "@/assets/index";
import classes from "@/pages/Administrator/BPSettingTable/BPSettingTable.module.scss";

const BPSettingTable = () => {
    /* Table */
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

    const { data: AllBPData, isSuccess: AllBPIssuccess } = useGetAllBuryPointDataQuery();
    const [addBuryPoint,] = useAddBuryPointMutation();
    const [editBuryPoint,] = useEditBuryPointMutation();
    const [deleteBuryPoint,] = useDeleteBuryPointMutation();
    useEffect(() => {
        if (!AllBPIssuccess) {
            setLoadingVisible(true);
        } else {
            setLoadingVisible(false);
        };
        if (AllBPData && AllBPData.success) {
            setShowData({
                nodes: AllBPData.data.bp
            });
        }
    }, [AllBPData, AllBPIssuccess]);

    /* Loading */
    const [loadingVisible, setLoadingVisible] = useState(false);

    /* Search */
    const [search, setSearch] = useState("");
    const [showData, setShowData] = useState({
        nodes: []
    });
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        if (AllBPData && AllBPData.success) {
            let filterData = AllBPData.data.bp.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setShowData((preVal) => ({ ...preVal, nodes: filterData }));
        }
    }, [AllBPData, search]);

    /* Model */
    const [opened, { open, close }] = useDisclosure(false);
    const [bpTitle, setbpTitle] = useState("Edit");
    const form = useForm({
        initialValues: {
            bp_id: "",
            name: "",
            trackend: "",
            type: "",
            des: ""
        },

        validate: {
            bp_id: (value) => value ? null : 'Invalid BP id',
            name: (value) => value ? null : "Invalid name",
            trackend: (value) => value ? null : "Invalid trackend",
            type: (value) => value ? null : "Invalid type",
            des: (value) => value ? null : "Invalid description",
        },
    });
    const openAdd = useCallback(async () => {
        setbpTitle("Add");
        open();
    }, [open]);
    const closeModel = useCallback(() => {
        form.reset();
        close();
    }, [close, form]);
    const openEdit = useCallback((item) => {
        setbpTitle("Edit");
        form.setValues(item);
        open();
    }, [open, form]);
    const saveHandler = useCallback(async () => {
        form.validate();
        if (!form.isValid()) return;
        setLoadingVisible(true);
        let fn = bpTitle === "Add" ? () => addBuryPoint(form.values) : () => editBuryPoint(form.values);
        const result = await fn();
        setLoadingVisible(false);
        if (result.error) return;
        close();
    }, [close, form, bpTitle, addBuryPoint, editBuryPoint]);

    // 控制能否修改bp_id
    const modalBPidDisabled = useMemo(() => {
        return bpTitle === "Add" ? false : true;
    }, [bpTitle]);

    /* Dialog */
    const [delOpened, { close: delClose, open: delOpen }] = useDisclosure(false);
    const [delDelegate, setDelDelegate] = useState(null);
    const openDelDialog = useCallback((item) => {
        setDelDelegate(item);
        delOpen();
    }, [delOpen]);
    const closeDelDialog = useCallback(() => {
        setDelDelegate(null);
        delClose();
    }, [delClose]);
    const delBPHandler = useCallback(async () => {
        setLoadingVisible(true);
        const result = await deleteBuryPoint(delDelegate.bp_id);
        setLoadingVisible(false);
        if (result.error) return;
        delClose();
    }, [delClose, delDelegate, deleteBuryPoint]);

    return (
        <>
            <Grid justify="space-between">
                <Grid.Col xs={12} sm={7} style={{ padding: "4px", margin: "4px 0 4px 0" }}>
                    <label htmlFor="search" style={{ fontSize: "18px" }}>
                        <span>&nbsp;&nbsp;Search:&nbsp;</span>
                        <input className={classes.search} style={searchStyle} id="search" type="text" value={search} onChange={handleSearch} />
                    </label>
                </Grid.Col>
                <Grid.Col xs={12} sm={1} style={{ display: "flex", justifyContent: "end", alignItems: "center", padding: "4px", }}>
                    <Button style={{ color: mantainTheme.colorScheme === 'light' ? "black" : "white", }} onClick={openAdd} compact variant='subtle'>Add +</Button>
                </Grid.Col>
            </Grid>
            <div style={{ height: "300px", borderRadius: "4px 4px 0 0", overflow: 'hidden' }}>
                <Table data={showData} theme={theme} layout={{ isDiv: true, fixedHeader: true, horizontalScroll: true }}>
                    {(tableList) => (
                        <Virtualized
                            tableList={tableList}
                            rowHeight={36}
                            header={() => (
                                <HeaderRow>
                                    <HeaderCell style={{ textAlign: "center" }} stiff>Index</HeaderCell>
                                    <HeaderCell>BP ID</HeaderCell>
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
                                    <Cell>{item.bp_id}</Cell>
                                    <Cell>{item.name}</Cell>
                                    <Cell style={{ textAlign: "center" }}>{item.trackend}</Cell>
                                    <Cell style={{ textAlign: "center" }}>{item.type}</Cell>
                                    <Cell>{item.des}</Cell>
                                    <Cell style={{ textAlign: "center", }}>
                                        <div style={{ transform: "translateY(3px) " }}>
                                            <SVG onClick={() => openEdit(item)} loader={<span>Loading...</span>} fill={mantainTheme.colorScheme === "dark" ? "white" : "black"} src={editIcon} width={"20px"} height={"20px"}></SVG>
                                        </div>
                                    </Cell>
                                    <Cell style={{ textAlign: "center", }}>
                                        <div style={{ transform: "translateY(3px) " }}>
                                            <SVG onClick={() => openDelDialog(item)} loader={<span>Loading...</span>} fill={mantainTheme.colorScheme === "dark" ? "white" : "black"} src={deleteIcon} width={"20px"} height={"20px"}></SVG>
                                        </div>
                                    </Cell>
                                </Row>
                            )}
                        />
                    )}
                </Table>
            </div >
            <LoadingOverlay visible={loadingVisible} zIndex={1000} styles={{ overlay: { radius: "sm", blur: 2 } }} />
            <Modal className={classes.burypoint} opened={opened} onClose={closeModel} withCloseButton={false} yOffset={100}>
                <div className={classes.title}>{bpTitle} Bury Point</div>
                <div className={classes.input}>
                    <TextInput disabled={modalBPidDisabled} placeholder="Bury Point Id" label="Bury Point Id" withAsterisk
                        {...form.getInputProps('bp_id')} />
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
                        {...form.getInputProps('des')} />
                </div>
                <div className={classes.btn}>
                    <Button variant="filled" styles={{ root: { width: "100%" } }} onClick={saveHandler}>
                        Save
                    </Button>
                </div>
            </Modal>
            <Dialog position={{ top: 20, right: 20 }} opened={delOpened} withCloseButton onClose={closeDelDialog} size="lg" radius="md">
                <Text size="sm" mb="xs" fw={500}>
                    Are You Sure You Want To Delete The Bury Point <br /> {delDelegate ? `(BP ID: ${delDelegate.bp_id})` : ""}?
                </Text>

                <Group position="left" >
                    <Button color="red" onClick={delBPHandler}>Delete</Button>
                    <Button onClick={closeDelDialog}>Cancel</Button>
                </Group>
            </Dialog>
        </>
    );
};

export default BPSettingTable;;