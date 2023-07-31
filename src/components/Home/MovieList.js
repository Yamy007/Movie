import React, { useEffect, useState } from 'react'
import apiGenres from '../../api/genre'
import api from '../../api/movie'
import { Container } from './Container'
import axios from 'axios'
export const MovieList = ({
	isDark,
	islanguage,
	data,
	setData,
	generate,
	setGenerate,
	movie,
	setMovie,
}) => {
	const [genre, setGenre] = useState(null)
	const [datas, setDatas] = useState(null)
	const [page, setPage] = useState(1)

	const { minRating, maxRating, genId, lang, year } = data || {}
	useEffect(() => {
		setGenerate(true)
		const fetchMovie = async () => {
			try {
				const response = await api.get(
					`/discover/movie?page=${page} ${
						lang ? '&language=en' : '&language=ua'
					}`
				)

				setDatas(response.data)
				setMovie(response.data.results)
				setPage(response.data?.page)
			} catch (err) {
				console.log(err)
			}
		}
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
		fetchMovie()
		fetchGenres()
	}, [
		page,
		islanguage,
		minRating,
		maxRating,
		year,
		lang,
		genId,
		setGenerate,
		setMovie,
	])

	return (
		<Container
			setMovie={setMovie}
			islanguage={islanguage}
			movie={movie}
			genre={genre}
			setData={setData}
			data={data}
			isDark={isDark}
			count={datas?.total_pages}
			page={page}
			generate={generate}
			setPage={setPage}
		/>
	)
}
