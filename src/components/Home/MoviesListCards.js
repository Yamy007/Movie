import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Rating,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

export const MoviesListCards = ({ movie, genre, isDark, islanguage }) => {
	const [isHovered, setIsHovered] = useState(false)
	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
	}

	return (
		<>
			{movie?.map(movieItem => (
				<Card
					className='card'
					key={movieItem.id}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<Link to={`/movie/${movieItem.id}`}>
						<div className='image-container'>
							<CardMedia
								className='image'
								component='img'
								src={
									movieItem.poster_path
										? 'https://image.tmdb.org/t/p/w500' + movieItem.poster_path
										: 'https://source.unsplash.com/random'
								}
								alt='movie'
							/>
							{isHovered && (
								<div className='hover-content'>
									<Typography component='div' variant='h5' gutterBottom>
										<Link
											to={`/movie/${movieItem.id}`}
											style={{
												textAlign: 'center',
												margin: 'auto',
												color: isDark ? '#e3f2fd' : 'white',
											}}
											className='list-title'
										>
											{movieItem.title}
										</Link>
										<Box className='Rating'>
											<Rating
												name='text-feedback'
												value={movieItem.vote_average}
												max={10}
												readOnly
												precision={0.1}
												emptyIcon={
													<StarIcon
														style={{ opacity: 1, color: 'black' }}
														fontSize='inherit'
													/>
												}
											/>
										</Box>
									</Typography>
									{movieItem.genre_ids?.map(movieGenre => (
										<Link
											to={`/genre/${
												genre?.filter(value => value.id === movieGenre)[0].id
											}`}
											key={movieGenre}
										>
											<Typography
												variatitlent='body1'
												className='list-text'
												style={{
													color: isDark ? '#9E9E9E' : '#EEEEEE',
												}}
											>
												{
													genre?.filter(value => value.id === movieGenre)[0]
														.name
												}
											</Typography>
										</Link>
									))}
									<Link to={`/movie/${movieItem.id}`}>
										<Button
											variant='outlined'
											className='detail-button'
											color='info'
											style={{
												marginTop: '2vh',
												color: isDark ? '#689F38' : '#388E3C',
											}}
										>
											{islanguage ? 'Details' : 'Детальніше'}
										</Button>
									</Link>
								</div>
							)}
						</div>
					</Link>
				</Card>
			))}
		</>
	)
}
