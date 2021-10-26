import React from 'react'
import './Favoritesbutton.css'

const Favoritesbutton = ({ filter, setFilter }) => {
	return (
		<button
			onClick={(e) => {
				e.preventDefault()
				setFilter(prev => ({ ...prev, favorite: !(filter.favorite) }))
			}}

			className={filter.favorite ? "favorites_button favorites_button_active" : "favorites_button"}
		></button >
	)
}

export default Favoritesbutton