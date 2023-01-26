import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        // this will style the MenuList component
        _dark: {
            bg: '#1d1e1f',
        },
    },
    item: {
        // this will style the MenuItem and MenuItemOption components
        // color: 'gray.200',
        _dark: {
            bg: '#1d1e1f',
            _hover: {
                bg: '#757d8a',
            },
            _focus: {
                bg: '#757d8a',
            },
        },
        _hover: {
            bg: '#757d8a',
        },
        _focus: {
            bg: '#757d8a',
        },

    },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })