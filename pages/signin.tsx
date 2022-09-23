import React, { useContext, useEffect, useState } from 'react'
import Meta from '../components/Meta'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/globalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'

const Signin = () => {
    const initialState = { 
        email: "", 
        password: "" 
    }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        dispatch({ 
            type: 'NOTIFY', 
            payload: {} 
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ 
            type: 'NOTIFY', 
            payload: { loading: true } 
        })
        const res = await postData('auth/signin', userData)

        console.log(res)
        
        if (res.error) {
            console.log(res.error)
            return dispatch({ 
                type: 'NOTIFY', 
                payload: { error: res.error } 
            })
        }
            
        dispatch({ 
            type: 'NOTIFY', 
            payload: { success: res.msg } 
        })

        dispatch({
            type: 'AUTH', 
            payload: {
                token: res.accessToken,
                user: res.user
            }
        })

        Cookie.set('refreshtoken', res.refreshToken, {
            path: 'api/auth/accessToken',
            expires: 15
        })

        localStorage.setItem('firstLogin', "true")
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0) {
            router.push("/")
        }
    }, [auth])

    return (
        <div>
            <Meta title="Sign in" />
            <form 
                className='mx-auto my-4' 
                style={{ maxWidth: "500px" }}
                onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        name='password'
                        value={password}
                        onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-dark w-100">Login</button>
                <p className='my-2'>You don't have an account? <Link href="/signup" style={{ color: 'crimson' }}><a>Register</a></Link></p>
            </form>
        </div>
    )
}

export default Signin