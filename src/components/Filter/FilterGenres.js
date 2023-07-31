import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/filter'
import apiGenres from '../../api/genre'

import { Container } from '../Home/Container'
export const FilterGenres = ({ isDark, islanguage }) => {
	const { id } = useParams()
	const [movie, setMovie] = useState(null)
	const [genre, setGenre] = useState(null)
	const [data, setData] = useState(null)
	const [page, setPage] = useState(1)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(
					`movie?with_genres=${id}&page=${page}&language=${
						islanguage ? 'en' : 'uk'
					}`
				)
				setMovie(response.data.results)
				setData(response.data)
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
				console.log('err')
			}
		}

		fetchData()
		fetchGenres()
	}, [id, page, islanguage])

	return (
		<>
			<Container
				islanguage={islanguage}
				setMovie={setMovie}
				movie={movie}
				genre={genre}
				isDark={isDark}
				count={data?.total_pages}
				page={page}
				setPage={setPage}
			/>
		</>
	)
}
