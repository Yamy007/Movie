import { colors, createTheme } from '@mui/material'

export const darkTheme = createTheme({
	palette: {
		background: {
			paper: colors.grey[700],
		},
		error: {
			main: colors.yellow['A200'],
		},
		info: {
			main: colors.teal[400],
		},
		secondary: {
			main: colors.grey[800],
		},
		primary: {
			main: colors.grey[900],
		},
	},
})

// palette: {
// 	background: {
// 		paper: colors.cyan[600],
// 	},
// 	info: {
// 		main: colors.teal[900],
// 	},
// 	secondary: {
// 		main: colors.cyan[800],
// 	},
// 	primary: {
// 		main: colors.cyan[900],
// 	},
// },
