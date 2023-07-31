// api/languages.js
import axios from 'axios'

const API_KEY = 'YOUR_TMDB_API_KEY' // Ваш ключ для доступу до TMDB API
const BASE_URL = 'https://api.themoviedb.org/3/language'

const apiLanguages = axios.create({
	baseURL: BASE_URL,
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTQxMmQ0MDNmOGNlM2E1OTFlMDFiODFjMGIxMTJjNiIsInN1YiI6IjY0YzBkZTQ5ZGY4NmE4MDEwNjM2OGQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xJ8r3YibvTE_z6DKrXHQuU-ARzeH8kxK1JEuy5L9GPE',
	},
})

export default apiLanguages
