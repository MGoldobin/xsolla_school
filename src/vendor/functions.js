export function uniqueArr(arr) {
	let result = []

	for (let str of arr) {
		if (!result.includes(str)) {
			result.push(str)
		}
	}

	return result
}

export function getDay(date) {
	return String(date).slice(0, 2)
}

export function getMonth(date) {
	return (String(date)[3] === '0') ? String(date).slice(4, 5) : String(date).slice(3, 5)
}

export function filterCity(arr, value) {
	return arr.filter(item => item.city === value)
}

export function filterMonth(arr, value) {
	return arr.filter(item => getMonth(item.date) === value)
}

export function filterFavorite(arr, favArr) {
	return arr.filter(item => favArr.includes(item.id))
}