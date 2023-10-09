import { useMantineTheme } from '@mantine/core';

// 控制header, nav, main 的樣式
export function useGetLayoutComponentStyle() {
    const theme = useMantineTheme();
    return {
        background: theme.colorScheme === 'light' ? "#ebebeb" : "#0b0c29",
        transition: "all 0.2s",
        border: "none",
        borderRadius: "20px"
    };
};

// 控制header, nav, main 內第一層div的樣式
export function useGetComponentStyle() {
    const theme = useMantineTheme();
    return {
        background: theme.colorScheme === 'light' ? theme.colors.light[0] : theme.colors.night[0],
        borderRadius: "15px",
        padding: "10px",
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
    };
}
