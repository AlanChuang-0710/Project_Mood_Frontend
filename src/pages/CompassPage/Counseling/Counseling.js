import React from 'react';
import { Grid, } from "@mantine/core";
import { useGetComponentStyle } from "../../../styles/dayNightStyle";
import Map from './Map/Map';
import AddressTable from './AddressTable/AddressTable';

const Counseling = () => {
    // const theme = useMantineTheme();

    return (
        <>
            <Grid>
                <Grid.Col xs={4} md={2}>
                    <div style={useGetComponentStyle()}>
                        <div style={{ height: "120px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                            尋求心理諮詢
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div style={useGetComponentStyle()}>
                        <div style={{ height: "120px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                            抽一張心理牌
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div style={useGetComponentStyle()}>
                        <div style={{ height: "120px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                            線上陪聊/哄睡
                        </div>
                    </div>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <Map />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <AddressTable
                            title={"Counseling Agency"}
                            subtitle={"The following table includes most counseling agencies in Taiwan"} />
                    </div>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Counseling;