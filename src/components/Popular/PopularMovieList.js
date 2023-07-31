import React, { useState, useEffect } from 'react'
import api from '../../api/details'
import apiGenres from '../../api/genre'
import { Box } from '@mui/material'
import { Container } from '../Home/Container'
export const PopularMovieList = ({
	isDark,
	islanguage,
	generate,
	setGenerate,
}) => {
	const [movie, setMovie] = useState(null)
	const [genre, setGenre] = useState(null)
	const [datas, setDatas] = useState(null)
	const [page, setPage] = useState(1)
	useEffect(() => {
		setGenerate(false)
		const fetchMovie = async () => {
			try {
				const response = await api.get(
					`/top_rated?page=${page}&language=${islanguage ? 'en' : 'uk'}`
				)

				setDatas(response.data)
				setMovie(response.data.results)
				setPage(response.data?.page)
			} catch (err) {
				console.error(err)
			}
		}
		fetchMovie()

		const fetchGenres = async () => {
			try {
				const response = await apiGenres.get(
					islanguage ? 'list?language=en' : 'list?language=uk'
				)
				setGenre(response.data.genres)
			} catch (err) {
				console.log(err)
			}
		}
		fetchGenres()
	}, [page, islanguage])
	return (
		<Container
			setMovie={setMovie}
			islanguage={islanguage}
			movie={movie}
			genre={genre}
			isDark={isDark}
			count={datas?.total_pages}
			page={page}
			generate={generate}
			setPage={setPage}
		/>
	)
}
