import { colors, createTheme } from '@mui/material'

export const lightTheme = createTheme({
	palette: {
		background: {
			paper: colors.indigo[50],
		},
		info: {
			main: colors.green[800],
		},
		secondary: {
			main: colors.blueGrey[100],
		},
		primary: {
			main: colors.blueGrey[100],
		},
	},
})
