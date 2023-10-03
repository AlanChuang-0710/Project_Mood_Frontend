import { ActionIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function LightDarkButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const theme = useMantineTheme();

    return (
        <ActionIcon
            variant="outline"
            color={dark ? "brand.3" : "brand.0"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
        >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
    );
};

export default LightDarkButton;