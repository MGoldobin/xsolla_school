import React, { useEffect } from 'react'
import './Select.css'
import { filterCity, filterMonth, filterFavorite } from '../../vendor/functions'

const Select = ({ options, def, id, setFilter, filter, apiData, favoriteArr }) => {
	useEffect(() => {
		let arr = apiData
		arr = filter.city ? filterCity(arr, filter.city) : arr
		arr = (filter.month && filter.month !== "0") ? filterMonth(arr, filter.month) : arr
		arr = filter.favorite ? filterFavorite(arr, favoriteArr) : arr
		setFilter(prev => ({ ...prev, data: arr }))
	}, [filter.city, filter.month, filter.favorite, favoriteArr])

	return (
		<select className="select" id={id} onChange={(e) => {
			const city = id === "city" ? e.target.value : filter.city
			const month = id === "month" ? e.target.selectedIndex : filter.month
			setFilter(prev => ({ ...prev, city: city, month: String(month) }))
		}
		}>
			<option className="select__option" value={def}>{def}</option>
			{
				options.map(option => (<option value={option} key={option}>{option}</option>))
			}
		</select>
	)
}

export default Select