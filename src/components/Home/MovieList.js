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
					`?page=${page}&language=${islanguage ? 'en' : 'uk'}
		 ${minRating ? `&vote_average.gte=${minRating}` : '&vote_average.gte=0'}
		 ${maxRating ? `&vote_average.lte=${minRating}` : '&vote_average.lte=10'}
		 ${year ? `&primary_release_year=${year}` : ''}
		 ${lang ? `&with_original_language=${lang}` : ''}
		 ${genId ? `&with_genres=${genId}` : ''}
		 `
				)

				setDatas(response.data)
				setMovie(response.data.results)
				setPage(response.data?.page)
			} catch {
				const response = await axios.get(
					`http://api.themoviedb.org/3/discover/movie?api_key=35412d403f8ce3a591e01b81c0b112c6&language=${
						islanguage ? 'en' : 'uk'
					}&page=${page}
					${minRating ? `&vote_average.gte=${minRating}` : '&vote_average.gte=0'}
					${maxRating ? `&vote_average.lte=${minRating}` : '&vote_average.lte=10'}
					${year ? `&primary_release_year=${year}` : ''}
					${lang ? `&with_original_language=${lang}` : ''}
					${genId ? `&with_genres=${genId}` : ''}`
				)

				setDatas(response.data)
				setMovie(response.data.results)
				setPage(response.data?.page)
			} finally {
				console.log('error')
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
	}, [page, islanguage, minRating, maxRating, year, lang, genId])

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
