import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'

import {
	Avatar,
	Box,
	Button,
	Container,
	FormControlLabel,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from '../components/Search/Search'
const pages = ['Top Rated', 'Movie', 'Soon']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const Header = ({
	isDark,
	setIsDark,
	islanguage,
	setIsLanguage,
	setMovie,
}) => {
	const location = useLocation()
	const hasMovieKeyword = location.pathname.includes('Movie')

	const [color, SetColor] = useState('#000')
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)
	console.log(islanguage)
	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	useEffect(() => {
		SetColor(isDark ? '#fff' : '#000')
	}, [isDark])

	return (
		<AppBar position='fixed' bgcolor='secondary'>
			<Container maxWidth='l'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						sx={{
							mr: '40%',
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
							alignItems: 'center',
							fontFamily: 'monospace',
							fontWeight: 700,
							fontSize: '1.5rem',
							letterSpacing: '.25rem',
							color: color,
							textDecoration: 'none',
						}}
					>
						Yamy
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							sx={{ mt: '5.5vh' }}
							id='menu-appbar'
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							anchorEl={anchorElNav}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
						>
							{pages.map(page => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
									style={{
										background: !isDark ? '#CFD8DC' : '#455A63',
										color: isDark ? 'white' : 'black',
									}}
								>
									<Link
										key={page}
										to={page === pages[0] ? '/' : page}
										style={{ textDecoration: 'none' }}
									>
										<Button
											variant='text'
											sx={{
												my: 0,
												color: color,
												display: 'block',
											}}
										>
											{page}
										</Button>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.25rem',
							color: color,
							textDecoration: 'none',
						}}
					>
						Yamy
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Link
								key={page}
								to={page === pages[0] ? '/' : page}
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant='text'
									sx={{
										my: 1,
										color: color,
										display: 'block',
									}}
								>
									{page}
								</Button>
							</Link>
						))}
					</Box>
					{hasMovieKeyword && <Search setMovie={setMovie} />}
					<FormControlLabel
						sx={{
							display: 'block',
							fontSize: '1.3rem',
						}}
						control={
							<Switch
								checked={islanguage}
								variant='contained'
								onChange={() => setIsLanguage(!islanguage)}
								name='Theme'
								size='large'
								color='secondary'
							/>
						}
						variant='h2'
						label={islanguage ? 'En' : 'Uk'}
					/>
					<FormControlLabel
						sx={{
							display: 'block',
							fontSize: '1.3rem',
						}}
						control={
							<Switch
								checked={isDark}
								variant='contained'
								onChange={() => setIsDark(!isDark)}
								name='Theme'
								size='large'
								color='secondary'
							/>
						}
						variant='h2'
						label={isDark ? 'Light' : 'Dark'}
					/>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
							</IconButton>
						</Tooltip>

						<Menu
							sx={{ mt: '5.5vh' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(setting => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
									style={{
										background: !isDark ? '#CFD8DC' : '#455A63',
										color: isDark ? 'white' : 'black',
									}}
								>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
