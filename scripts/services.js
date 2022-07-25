// TODO => Server Methods
const getData = async(url) => {
    const response = await fetch(url)
    return await response.json()
}

const addData = async(url, data) => { 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return await response.json()
}

const updateData = async(url, data) => { 
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return await response.json()
}

const deleteData = async(url) => { 
    const response = await fetch(url, {
        method: 'DELETE',
    })
    return await response.json()
}

//TODO => json-server --watch database/database.json --port 3000
//? https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//? https://cognitiveseo.com/blog/23628/url-structure/

//TODO => http://jsonplaceholder.typicode.com/posts?category=sport&published=true#section
//* PROTOCOL => http://
//* DOMAIN => jsonplaceholder.typicode.com
//* QUERY_STRING => ?category=sport&published=true
//* FRAGMENT => #section

