import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { useContext } from 'react'
import { DataContext } from '../store/globalState'
import validate from '../utils/validate'
import { patchData, postData } from '../utils/fetchData'
import { uploadImage } from '../utils/uploadImage'

interface Order {
    _id: string,
    createdAt: string,
    user: string,
    address: string,
    phone: string,
    cart: [],
    total: string,
    delivered: boolean,
    updatedAt: string
}

const Profile = () => {
    const initialState = {
        avatar: '',
        name: '',
        password: '',
        confirmPassword: ''
    }

    const [data, setData] = useState(initialState)
    const { avatar, name, password, confirmPassword } = data

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state
    const [imgFile, setImgFile] = useState<File>()

    useEffect(() => {
        if (auth.user) {
            setData({ ...data, name: auth.user.name })
        }
    }, [auth.user])

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        })

        dispatch({
            type: 'NOTIFY',
            payload: {}
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (password) {
            const errMsg = validate(name, auth.user.email, password, confirmPassword)
            if (errMsg) {
                return dispatch({
                    type: 'NOTIFY',
                    payload: {
                        error: errMsg
                    }
                })
            }
            updatePassword()
        }

        if (name !== auth.user.name || avatar) {
            updateInfor()
        }
    }

    const updatePassword = () => {
        dispatch({
            type: 'NOTIFY',
            payload: {
                loading: true
            }
        })
        patchData('user/resetPassword', { password }, auth.token)
            .then(res => {
                if (res.error) {
                    return dispatch({
                        type: 'NOTIFY',
                        payload: {
                            error: res.error
                        }
                    })
                }

                return dispatch({
                    type: 'NOTIFY',
                    payload: {
                        success: res.msg
                    }
                })
            })
    }

    const changeAvatar = async (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            if (e.currentTarget.files.length > 0) {
                const file = e.currentTarget.files[0]

                // console.log(file)
                if (!file) {
                    return dispatch({
                        type: 'NOTIFY',
                        payload: {
                            error: 'File does not exist.'
                        }
                    })
                }

                if (file.size > 1024 * 1024 * 1024) {
                    return dispatch({
                        type: 'NOTIFY',
                        payload: {
                            error: 'The larget image size is 1024MB'
                        }
                    })
                }

                if (file.type !== "image/jpeg" && file.type !== "image/png") {
                    return dispatch({
                        type: 'NOTIFY',
                        payload: {
                            error: 'Invalid file format.'
                        }
                    })
                }

                const result = await uploadImage(file)
                console.log(result)
                setImgFile(file)

                setData({
                    ...data,
                    avatar: result[0].url
                })
            }
        }

    }

    const updateInfor = async () => {
        dispatch({
            type: 'NOTIFY',
            payload: {
                loading: true
            }
        })

        patchData('user', {
            name,
            avatar: avatar ? avatar : auth.user.avatar
        }, auth.token).then(res => {
            if (res.err) {
                return dispatch({
                    type: 'NOTIFY',
                    payload: {
                        error: res.err
                    }
                })
            }

            dispatch({
                type: 'AUTH',
                payload: {
                    token: auth.token,
                    user: res.user
                }
            })

            return dispatch({
                type: 'NOTIFY',
                payload: {
                    success: res.msg
                }
            })
        })
    }

    if (!auth.user) {
        return null
    }

    return (
        <div className='profile-page'>
            <Meta title='Profile' />
            <section className='row text-secondary my-3'>
                <div className="col-md-3">
                    <h3 className='text-center text-uppercase'>User Profile</h3>
                    <div className="avatar">
                        <img src={imgFile ? URL.createObjectURL(imgFile) : auth.user.avatar} alt={auth.user.avatar} />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input
                                type="file"
                                name='file'
                                id='file'
                                accept='image/*'
                                onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' value={name} className='form-control' placeholder='Your name'
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' defaultValue={auth.user.email} className='form-control' placeholder='Your email' disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Pasword</label>
                        <input type="text" name='password' value={password} className='form-control' placeholder='Your password'
                            onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="text" name='confirmPassword' value={confirmPassword} className='form-control' placeholder='Confirm your password'
                            onChange={handleChange} />
                    </div>

                    <button
                        type='submit'
                        className='btn btn-info'
                        disabled={notify.loading}
                        onClick={handleSubmit}
                    >Update profile</button>
                </div>
                <div className="col-md-6 ml-5">
                    <h3 className='text-uppercase'>Orders</h3>

                    <div className="my-3">
                        <table className='table-bordered table-hover w-100 text-uppercase'
                            style={{
                                minWidth: '600px',
                                cursor: 'pointer'
                            }}
                        >
                            <thead className='bg-light font-weight-bold'>
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">action</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders?.map((item: Order) => (
                                        <tr>
                                            <td className="p-2">{orders._id}</td>
                                            <td className="p-2">{orders.createdAt}</td>
                                            <td className="p-2">{orders.total}</td>
                                            <td className="p-2">{orders.delivered}</td>
                                            <td className="p-2">action</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile