import React from 'react';
import { Table, Badge } from "@mantine/core";
import ChartTableHeader from "../../../components/ChartTableHeader/ChartTableHeader.js";
import { happy, smile, normal, sad, depressed, } from "../../../assets/index.js";

const ScoreKOLTable = ({ title, subtitle }) => {
    const elements = [
        { icon: happy, KOL: ['Alan', "Alex"] },
        { icon: smile, KOL: ['Nitrogen'] },
        { icon: normal, KOL: ['Yttrium'] },
        { icon: sad, KOL: ['Barium'] },
        { icon: depressed, KOL: ['Cerium', "王大包", "1235468796879879879879"] },
    ];

    const rows = elements.map((element) => (
        <tr key={element.icon}>
            <td style={{ width: "45px" }}><img style={{ width: "40px" }} src={element.icon} alt="Mood" /></td>
            <td >
                {element.KOL.map((item, index) => <Badge key={index} styles={{ root: { margin: "0 3px 3px 2px" } }} radius="sm" variant="outline" >{item}</Badge>)}
            </td>
        </tr>
    ));

    return (
        <div>
            <ChartTableHeader title={title} subtitle={subtitle} />
            <Table >
                <thead>
                    <tr>
                        <th>Mood</th>
                        <th>Top Five Influential People</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
};

export default ScoreKOLTable;