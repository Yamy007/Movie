import { Box, Button, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/details'
import styles from './MovieInfo.module.css'
import { Link } from 'react-router-dom'
import { MoviesListCards } from '../Home/MoviesListCards'

export const MovieInfo = ({ isDark, islanguage }) => {
	const { id } = useParams()
	const [video, setVideo] = useState(null)
	const [external, setExternal] = useState(null)
	const [watch, setWatch] = useState(false)
	const [movie, setMovie] = useState(null)
	const [popular, setPopular] = useState(null)
	const [similar, setSimilar] = useState(null)
	useEffect(() => {
		const fetchCats = async () => {
			try {
				const response = await api.get(`${id}/credits`)
				setPopular(
					response.data.cast
						.sort((a, b) => b.popularity - a.popularity)
						?.slice(0, 10)
				)
			} catch (err) {
				console.error(err)
			}
		}

		const fetchDetails = async () => {
			try {
				const response = await api.get(
					`${id}?language=${islanguage ? 'en' : 'uk'}`
				)
				setMovie(response.data)
			} catch (err) {
				console.log(err)
			}
		}
		const fetchExternal = async () => {
			try {
				const response = await api.get(`${id}/external_ids`)
				setExternal(response.data)
			} catch (err) {
				console.log(err)
			}
		}
		const fetchWatch = async () => {
			try {
				const response = await api.get(`${id}/watch/providers`)
				setWatch(response.data.results)
			} catch (err) {
				console.log(err)
			}
		}

		const fetchVideo = async () => {
			try {
				const response = await api.get(`${id}/videos`)
				setVideo(response.data.results)
			} catch (err) {
				console.log(err)
			}
		}

		const FetchSimilar = async () => {
			try {
				const response = await api.get(`${id}/similar`)
				console.log(response.data.results)
				setSimilar(response.data.results)
			} catch (err) {
				console.log(err)
			}
		}
		FetchSimilar()
		fetchVideo()
		fetchWatch()
		fetchExternal()
		fetchCats()
		fetchDetails()
	}, [id, islanguage])
	return (
		<Box className={styles.wrapper}>
			<Box className={styles.box}>
				<Box
					component='img'
					className={styles.image}
					src={
						movie?.backdrop_path
							? `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
							: 'https://source.unsplash.com/random'
					}
				></Box>
				<Box classbtnName={styles.btn}>
					<Link to={`https://www.imdb.com/title/${external?.imdb_id}`}>
						<Button variant='outlined' color='error'>
							imdb_id
						</Button>
					</Link>
					<Link to={watch?.US?.link}>
						<Button variant='outlined' color='error'>
							Watch
						</Button>
					</Link>
					{video && (
						<Link to={video ? `https://youtu.be/${video[2]?.key}` : null}>
							<Button variant='outlined' color='error'>
								You Tube
							</Button>
						</Link>
					)}
				</Box>
				<Box className={styles.description}>
					<Box className={styles.title}>
						<Typography color={isDark ? '#F5F5F5' : '#424242'}>
							{movie?.title}
						</Typography>
					</Box>
					<Box className={styles.info}>
						<Box className={styles.container}>
							<Rating precision={0.1} value='7.5' max={10} readOnly />

							<Box sx={{ ml: 2 }} color='#FFB000'>
								{movie?.vote_average}
							</Box>
						</Box>

						<Typography
							variant='h5'
							component='p'
							className={styles.wordGenre}
							color={isDark ? '#F5F5F5' : '#424242'}
						>
							{islanguage ? 'Gen' : 'Жанр'}
						</Typography>
						<Box className={styles.genres}>
							{movie?.genres.map(value => (
								<Link
									to={`/genre/${value.id}`}
									className={styles.genres}
									key={value.id}
								>
									<Typography
										variant='body2'
										component='p'
										className={styles.genres}
										color={!isDark ? '#FBC02D' : '#e91e63'}
									>
										{value.name}
									</Typography>
								</Link>
							))}
						</Box>

						<Typography
							component='h2'
							className={styles.wordGenre}
							color={isDark ? '#F5F5F5' : '#424242'}
						>
							{islanguage ? 'Info' : 'Інформація'}
						</Typography>
						<Box
							className={styles.wordGenre}
							color={isDark ? '#F5F5F5' : '#424242'}
						>
							<Typography
								variant='body1'
								component='h2'
								color={isDark ? '#E0E0E0' : '#9E9E9E'}
								className={styles.inform}
							>
								{movie?.overview}
								{movie?.homepage && (
									<Link style={{ marginLeft: '15px' }} to={movie?.homepage}>
										Home page
									</Link>
								)}
							</Typography>
						</Box>
						<Typography
							component='h2'
							className={styles.wordGenre}
							color={isDark ? '#F5F5F5' : '#424242'}
						>
							{islanguage ? 'Cast' : 'Лицедії'}
						</Typography>
						<Box className={styles.actor}>
							{popular?.map((character, i) =>
								character.profile_path ? (
									<img
										key={i}
										className={styles?.castImage}
										src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
										alt={character.name}
									/>
								) : (
									<img
										alt={movie?.title}
										key={i}
										className={styles?.castImage}
										src='https://avatars.dzeninfra.ru/get-zen_doc/3721416/pub_63cf539ce68826247713002f_63cf55453d9be32e0f207638/scale_1200'
									/>
								)
							)}
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className={styles.similar}>
				<MoviesListCards
					movie={similar}
					isDark={isDark}
					islanguage={islanguage}
				/>
			</Box>
		</Box>
	)
}
