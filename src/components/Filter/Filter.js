import React, { useEffect, useState } from 'react'
import {
	Slider,
	TextField,
	Autocomplete,
	Box,
	Button,
	Typography,
} from '@mui/material'
import apiGenre from '../../api/genre'
export const Filter = ({ setData, data, islanguage }) => {
	const [autoGenre, setAutoGenre] = useState(null)
	const autoYear = []
	const [genre, setGenre] = useState(null)
	const [year, setYear] = useState(null)
	const [language, setLanguage] = useState(null)
	const [minRating, setMinRating] = useState(0)
	const [maxRating, setMaxRating] = useState(10)

	const [gen, setGen] = useState(null)
	for (let i = 2023; i > 1886; i--) {
		autoYear.push(i.toString())
	}
	const autoLanguage = [
		'English',
		'Korean',
		'Japanese',
		'Vietnamese',
		'Thai',
		'German',
	]
	const autoFullLanguage = {
		English: 'en',
		Korean: 'ko',
		Japanese: 'ja',
		Vietnamese: 'vi',
		Thai: 'th',
		German: 'de',
	}

	useEffect(() => {
		const fetchAllGenre = async () => {
			try {
				const response = await apiGenre.get(
					islanguage ? 'list?language=en' : 'list?language=uk'
				)
				setGen(response.data.genres)
				setAutoGenre(response?.data?.genres?.map(gen => gen.name))
			} catch (err) {
				console.log(err)
			}
		}

		fetchAllGenre()
	}, [])

	const handelSubmit = e => {
		e.preventDefault()
		let lang = autoFullLanguage[language]
		let genId = gen?.filter(gen => gen.name === genre)[0]?.id
		setData({ minRating, maxRating, genId, lang, year })
	}

	return (
		<>
			<form className='filter' onSubmit={handelSubmit}>
				<Box>
					<Typography gutterBottom>Ratings Range</Typography>
					<Slider
						color='info'
						value={[minRating, maxRating]}
						onChange={(event, newValue) => {
							setMinRating(newValue[0])
							setMaxRating(newValue[1])
						}}
						valueLabelDisplay='auto'
						valueLabelFormat={value => value.toFixed(1)}
						aria-labelledby='range-slider'
						getAriaValueText={value => `${value}`}
						min={0}
						max={10}
						step={0.1}
					/>
				</Box>
				<Autocomplete
					options={autoLanguage}
					value={language}
					onChange={(event, newValue) => {
						setLanguage(newValue)
					}}
					renderInput={params => (
						<TextField {...params} color='info' label='Language' type='text' />
					)}
				/>
				<Autocomplete
					options={autoYear}
					value={year}
					onChange={(event, newValue) => {
						setYear(newValue)
					}}
					renderInput={params => (
						<TextField {...params} color='info' label='Year' type='text' />
					)}
				/>
				<Autocomplete
					options={autoGenre}
					value={genre}
					onChange={(event, newValue) => {
						setGenre(newValue)
					}}
					renderInput={params => (
						<TextField {...params} color='info' label='Genres' type='text' />
					)}
				/>
				<Box
					sx={{
						width: '100%',
						height: '6vh',
						display: 'flex',
						justifyContent: 'center',
						alightItems: 'center',
					}}
				>
					<Button
						type='submit'
						variant='contained'
						sx={{ width: '85%' }}
						size='large'
						color='info'
					>
						Filter
					</Button>
				</Box>
			</form>
		</>
	)
}
