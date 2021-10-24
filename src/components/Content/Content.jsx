import React, { useState, useEffect, Suspense } from 'react'
import Cookies from 'js-cookie'
import Select from '../Select/Select'
import Event from '../Event/Event'
import './Content.css'
import { months } from '../../vendor/constants'
import { uniqueArr } from '../../vendor/functions'

const cookieFavoriteArr = () => {
	return (Cookies.get('favoriteArr') !== undefined) ? Cookies.get('favoriteArr').split(',') : []
}

const Content = () => {
	const [favoriteArr, setFavoriteArr] = useState(() => cookieFavoriteArr())
	const [apiData, setApiData] = useState([])
	const [cities, setCities] = useState([])
	const [filter, setFilter] = useState({
		data: [],
		city: "",
		month: ""
	})

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json")
			.then(res => res.ok ? res.json() : -1)
			.then(res => {
				setApiData(res)
				setFilter({ data: res, city: "", month: "" })
			})
	}, [])

	useEffect(() => {
		setCities(uniqueArr(apiData.map(event => { return event.city })))
	}, [apiData])

	function changeFavoriteStatus(id) {
		let arr = favoriteArr
		if (arr.includes(id)) {
			arr = arr.filter(num => num !== id)
		} else arr.push(id)
		Cookies.set('favoriteArr', arr)
		setFavoriteArr(arr)
	}

	return (
		<div className="content">
			<div className="content__filters">
				<span className="content__filter-span">City:</span>
				<Select options={cities} def="" setFilter={setFilter} id="city" filter={filter} apiData={apiData} />
				<span className="content__filter-span">Month:</span>
				<Select options={months} def="" setFilter={setFilter} id="month" filter={filter} apiData={apiData} />
			</div>
			<div className="content__events">
				{
					(filter.data.length !== 0)
						? (filter.data).map(event =>
							<Event
								key={event.id}
								isFavorite={favoriteArr.includes(event.id)}
								event={event}
								changeFavoriteStatus={changeFavoriteStatus}
							/>
						)
						: <p className="content__notFound">Not found</p>
				}
			</div>
		</div>
	)
}

export default Content