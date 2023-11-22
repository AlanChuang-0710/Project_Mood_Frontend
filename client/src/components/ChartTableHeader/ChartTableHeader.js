import { HoverCard, Text } from "@mantine/core";
import { IconInfoCircleFilled } from '@tabler/icons-react';

const ChartTableHeader = ({ title, subtitle }) => {

    return <div>
        <div style={{ position: "relative" }}>
            <div style={{ fontSize: "20px", textAlign: "center" }}>{title}</div>
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
    </div>;
};

export default ChartTableHeader;