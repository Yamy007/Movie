import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { MovieList } from './components/Home/MovieList'
import { PopularMovieList } from './components/Popular/PopularMovieList'
import { MovieInfo } from './components/movie/MovieInfo'
import { darkTheme } from './theme/darkTheme'
import { lightTheme } from './theme/lightTheme'
import { FilterGenres } from './components/Filter/FilterGenres'
function App() {
	const [isDark, setIsDark] = useState(false)
	const [islanguage, setIsLanguage] = useState(false)
	const [data, setData] = useState(null)
	const [generate, setGenerate] = useState(false)
	const [movie, setMovie] = useState(null)

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Box className='App' bgcolor='secondary.light'>
				<Header
					isDark={isDark}
					setIsDark={setIsDark}
					islanguage={islanguage}
					setIsLanguage={setIsLanguage}
					setMovie={setMovie}
				/>

				<Routes>
					<Route
						path='/movie'
						element={
							<MovieList
								isDark={isDark}
								setMovie={setMovie}
								movie={movie}
								islanguage={islanguage}
								data={data}
								setData={setData}
								generate={generate}
								setGenerate={setGenerate}
							/>
						}
					></Route>
					<Route
						path='/'
						element={
							<PopularMovieList
								isDark={isDark}
								islanguage={islanguage}
								data={data}
								setData={setData}
								generate={generate}
								setGenerate={setGenerate}
							/>
						}
					/>
					<Route
						path='/movie/:id'
						element={<MovieInfo isDark={isDark} islanguage={islanguage} />}
					></Route>
					<Route
						path='/genre/:id'
						element={<FilterGenres isDark={isDark} islanguage={islanguage} />}
					></Route>
				</Routes>
			</Box>
		</ThemeProvider>
	)
}

export default App
