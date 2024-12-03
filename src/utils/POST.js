export const POST = async (URL_API, body) => {
	try{
		const response = await fetch(URL_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '8e849ec1-2977-404c-88c0-c8d2246d498f',
				'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(body)
		})
		return response.json()
	}
	catch(error){		
		throw error
	}
}

export const GET = async (URL_API) => {
	try{
		const response = await fetch(URL_API, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '8e849ec1-2977-404c-88c0-c8d2246d498f'
			}
		})
		return response.json()
	}
	catch(error){		
		throw error
	}
}

export const PUT = async (URL_API, body) => {
	try{
		const response = await fetch(URL_API, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '8e849ec1-2977-404c-88c0-c8d2246d498f', 
				'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(body)
		})
		return response.json()
	}
	catch(error){		
		throw error
	}
}

export const DELETE = async (URL_API) => {
	try{
		const response = await fetch(URL_API, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '8e849ec1-2977-404c-88c0-c8d2246d498f', 
				'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
			}
		})
		return response.json()
	}
	catch(error){		
		throw error
	}
}

//Crear DELETE