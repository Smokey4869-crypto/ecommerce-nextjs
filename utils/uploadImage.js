export const uploadImage = async (image) => {
    let imgArr = []

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'my-uploads')

    const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    }).then(res => res.json())

    // console.log('data', data)

    imgArr.push({ 
        public_id: data.public_id, 
        secure_url: data.secure_url,
        url:  data.url
    })

    return imgArr;
}