import React, { useState } from 'react'
import './Event.css'
import { getDay } from '../../vendor/functions'

const Event = ({ isFavorite, event, changeFavoriteStatus }) => {
	const [favorite, setFavorite] = useState(isFavorite)

	return (
		<div
			className="event"
			style={{
				backgroundImage: "url(" + event.image + ")"
			}}
		>
			<div className="event__row">
				<span className="event__date">{getDay(event.date)}</span>
				<img
					onClick={() => {
						changeFavoriteStatus(event.id)
						setFavorite(!favorite)
					}}
					className="event__button"
					src={favorite ? "./favorite.svg" : "./nonFavorite.svg"}
					alt={favorite ? "favorite" : "nonFavorite"}
				/>
			</div>
			<h1 className="event__title">{event.name}</h1>
		</div>
	)
}

export default Event
