import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    field: {
        background: 'gray.50',
        bgColor: 'gray.50',
        _dark: {
            background: 'transparent',
        },
    },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })