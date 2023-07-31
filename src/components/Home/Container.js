import React from 'react'
import { Box, Pagination } from '@mui/material'
import Search from '../Search/Search'
import { MoviesListCards } from './MoviesListCards'
import { Filter } from '../Filter/Filter'
export const Container = ({
	movie,
	genre,
	isDark,
	setData,
	data,
	page,
	setPage,
	count,
	generate,
	islanguage,
}) => {
	return (
		<>
			<Box className={generate ? 'wrapper' : 'wrappers'} color='secondary.dark'>
				{generate && <Filter setData={setData} data={data} />}
				<Box component='div' className='content'>
					<MoviesListCards
						movie={movie}
						genre={genre}
						isDark={isDark}
						islanguage={islanguage}
					/>
				</Box>
				<Pagination
					count={count}
					className='pagination'
					page={page}
					onChange={(e, p) => setPage(p)}
				/>
			</Box>
		</>
	)
}
