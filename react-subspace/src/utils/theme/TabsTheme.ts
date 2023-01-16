import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { themeColor } from '../theme'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
    // define the part you're going to style
    tab: {
        _selected: {
            color: "#9147ff"
        },

    },
})

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle })