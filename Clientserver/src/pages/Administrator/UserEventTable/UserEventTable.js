import React, { useState, useEffect } from 'react';
import { useMantineTheme, Grid, Dialog, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Table, HeaderRow, Row, HeaderCell, Cell } from "@table-library/react-table-library/table";
import { Virtualized } from "@table-library/react-table-library/virtualized";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import SVG from "react-inlinesvg";
import { useGetAllEventCountDataQuery } from "@/store/api/adminApi";
import { detailsIcon } from "@/assets/index";
import classes from "./UserEventTable.module.scss";

const UserEventTable = () => {
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

  const { data: AllEvData, isSuccess: AllEvIssuccess } = useGetAllEventCountDataQuery();


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
    if (AllEvData && AllEvData.success) {
      console.log(AllEvData.data);
      let filterData = AllEvData.data.filter((item) =>
        item.user_id.toLowerCase().includes(search.toLowerCase())
      );
      setShowData((preVal) => ({ ...preVal, nodes: filterData }));
    }
  }, [AllEvData, search]);


  return (
    <>
      <Grid justify="space-between">
        <Grid.Col span={12} style={{ padding: "4px", margin: "4px 0 4px 0" }}>
          <label htmlFor="search" style={{ fontSize: "18px" }}>
            <span>&nbsp;&nbsp;Search By User ID:&nbsp;</span>
            <input className={classes.search} style={searchStyle} id="search" type="text" value={search} onChange={handleSearch} />
          </label>
        </Grid.Col>
      </Grid>
      <div style={{ position: "relative" }}>
        <div style={{ height: "300px", borderRadius: "4px 4px 0 0", overflow: 'hidden' }}>
          <Table data={showData} theme={theme} layout={{ isDiv: true, fixedHeader: true, horizontalScroll: true }}>
            {(tableList) => (
              <Virtualized
                tableList={tableList}
                rowHeight={36}
                header={() => (
                  <HeaderRow>
                    <HeaderCell style={{ textAlign: "center" }} stiff>Index</HeaderCell>
                    <HeaderCell>User ID</HeaderCell>
                    <HeaderCell style={{ textAlign: "center" }}>Username</HeaderCell>
                    <HeaderCell>Last Login Time</HeaderCell>
                    <HeaderCell style={{ textAlign: "center" }}>Event Count</HeaderCell>
                    <HeaderCell style={{ textAlign: "center" }}>More</HeaderCell>
                  </HeaderRow>
                )}
                body={(item, index) => (
                  <Row item={item}>
                    <Cell style={{ textAlign: "center" }} stiff>{index + 1}</Cell>
                    <Cell>{item.user_id}</Cell>
                    <Cell style={{ textAlign: "center" }}>{item.username}</Cell>
                    <Cell>{item.lastLoginTime}</Cell>
                    <Cell style={{ textAlign: "center" }}>{item.count}</Cell>
                    <Cell style={{ textAlign: "center" }}>
                      <div style={{ transform: "translateY(3px) " }}>
                        <SVG loader={<span>Loading...</span>} onClick={() => { }} fill={mantainTheme.colorScheme === "dark" ? "white" : "black"} src={detailsIcon} width={"20px"} height={"20px"}></SVG>
                      </div>
                    </Cell>
                  </Row>
                )}
              />
            )}
          </Table>
        </div >
        <LoadingOverlay visible={loadingVisible} zIndex={1000} styles={{ overlay: { radius: "sm", blur: 2 } }} />
      </div></>
  );
};

export default UserEventTable;