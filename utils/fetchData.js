const baseUrl = process.env.BASE_URL

export const getData = async (url, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })

    console.log(res)

    const data = await res.json()
    // const data = {
    //     product: {
    //         "images": [
    //             {
    //                 "public_id": "nextjs_media/pb8fnxyickqqe9krov82",
    //                 "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605263280/nextjs_media/pb8fnxyickqqe9krov82.jpg"
    //             },
    //             {
    //                 "public_id": "nextjs_media/irfwxjz56x4xa6pdwoks",
    //                 "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605263281/nextjs_media/irfwxjz56x4xa6pdwoks.jpg"
    //             }
    //         ],
    //         "checked": false,
    //         "inStock": 500,
    //         "sold": 0,
    //         "title": "animal",
    //         "price": 5,
    //         "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
    //         "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
    //         "category": "5faa35a88fdff228384d51d8"
    //     }
    // }
    return data
}

export const postData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const putData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url, post, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const deleteData = async (url, token) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}