import { Drawer, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
import { inputTheme } from "./theme/InputTheme";
import { menuTheme } from "./theme/MenuTheme";
import { modalTheme } from "./theme/ModalTheme";
import { tabsTheme } from "./theme/TabsTheme";

const theme = extendTheme({
    config: <ThemeConfig>{
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: (props: any) => ({
            body: {
                bgColor: props.colorMode === 'dark' ? '#100e17' : '#DFE5F1',
            },

        }),
    },
    components: {
        Modal: modalTheme,
        Tabs: tabsTheme,
        Menu: menuTheme,
        Drawer: modalTheme,
        Input: inputTheme
    }
})


const themeColor = {
    //light purple
    primary: "#9147ff",
    //dark purple
    secondary: "#8232fa"
}


export { theme, themeColor };