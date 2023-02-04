import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

// define the base component styles
const baseStyle = {
    _dark: {
        bg: '#1d1e1f',
        color: "white",
    },
}

// export the component theme
export const tooltipTheme = defineStyleConfig({ baseStyle })