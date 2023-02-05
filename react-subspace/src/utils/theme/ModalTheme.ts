import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'
import _default from 'react-hook-form/dist/logic/appendErrors'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
    dialog: {
        _dark: {
            bg: '#1d1e1f',
            color: "white",
        },
        bg: '#d2d3d4',
        color: "black"

    },
})

export const modalTheme = defineMultiStyleConfig({
    baseStyle,
})