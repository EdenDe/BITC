export const userService = {
	getUser,
}

var user = {
	name: 'Ochoa Hyde',
	coins: 100,
	moves: [],
}

function getUser() {
	return user
}
