import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function LightDarkButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';


    return (
        <ActionIcon
            variant="outline"
            color={dark ? "brand.3" : "brand.0"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            style={{ border: "none" }}
        >
            {dark ? <IconSun size="25" /> : <IconMoonStars size="25" />}
        </ActionIcon>
    );
};

export default LightDarkButton;