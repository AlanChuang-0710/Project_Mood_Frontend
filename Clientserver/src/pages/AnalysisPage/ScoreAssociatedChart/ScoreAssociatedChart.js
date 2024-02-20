import React from 'react';
import { Table, Badge } from "@mantine/core";
import ChartTableHeader from "@/components/ChartTableHeader/ChartTableHeader.js";
import { happy, smile, normal, sad, depressed, } from "@/assets/index.js";

const ScoreAssociatedChart = ({ title, subtitle, data }) => {
    let rows = [];
    if (data?.data) {
        const elements = [
            { icon: happy, KOL: data.data.score2 },
            { icon: smile, KOL: data.data.score1 },
            { icon: normal, KOL: data.data.score0 },
            { icon: sad, KOL: data.data["score-1"] },
            { icon: depressed, KOL: data.data["score-2"] },
        ];
        rows = elements.map((element) => (
            <tr key={element.icon}>
                <td style={{ width: "45px" }}><img style={{ width: "40px" }} src={element.icon} alt="Mood" /></td>
                <td >
                    {element.KOL.map((item, index) => <Badge key={index} styles={{ root: { margin: "0 3px 3px 2px" } }} radius="sm" variant="outline" >{item[0]}</Badge>)}
                </td>
            </tr>
        ));
    }

    return (
        <div>
            <ChartTableHeader title={title} subtitle={subtitle} />
            <Table >
                <thead>
                    <tr>
                        <th>Mood</th>
                        <th >Top Five Influential People</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
};

export default ScoreAssociatedChart;