import React, { useEffect } from 'react'
import './Select.css'
import { filterCity, filterMonth, filterAll } from '../../vendor/functions'

const Select = ({ options, def, id, setFilter, filter, apiData }) => {
	useEffect(() => {
		let arr = apiData
		if (filter.month !== "" && filter.month !== "0") arr = filterMonth(apiData, filter.month)
		if ((filter.month === "" || filter.month === "0") && filter.city !== "") arr = filterCity(apiData, filter.city)
		if ((filter.month !== "" && filter.month !== "0") && filter.city !== "") arr = filterAll(apiData, filter.city, filter.month)
		if ((filter.month === "" || filter.month === "0") && filter.city === "") arr = apiData
		setFilter(prev => ({ ...prev, data: arr }))
	}, [filter.city, filter.month])

	return (
		<select className="select" id={id} onChange={(e) => {
			const city = id === "city" ? e.target.value : filter.city
			const month = id === "month" ? e.target.selectedIndex : filter.month
			setFilter({ data: filter.data, city: city, month: String(month) })
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