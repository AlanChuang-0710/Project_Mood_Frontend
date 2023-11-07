import React from 'react';
import { Table, Badge, HoverCard, Text } from "@mantine/core";
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { happy, smile, normal, sad, depressed, } from "../../../assets/index.js";
import classes from "./ScoreKOLTable.module.scss";

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