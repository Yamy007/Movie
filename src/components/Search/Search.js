import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import api from '../../api/search'
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))

export default function SearchAppBar({ setMovie }) {
	const fetchSearch = async () => {
		try {
			const response = await api.get(value)
			console.log(response)
			setMovie(response.data.results)
		} catch (err) {
			console.log(err)
		}
	}

	const [value, setValue] = useState('')
	const handelSubmit = e => {
		e.preventDefault()
		fetchSearch()
	}

	const search = data => {
		setValue(data)
		console.log(data)
		fetchSearch()
	}
	return (
		<form onSubmit={handelSubmit} className='find'>
			<Search>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder='Search…'
					inputProps={{ 'aria-label': 'search' }}
				/>
			</Search>
		</form>
	)
}
