import React, { useContext, useEffect, useState } from 'react'
import Meta from '../components/Meta'
import Link from 'next/link'
import validate from '../utils/validate'
import { DataContext } from '../store/globalState'
import { postData } from '../utils/fetchData'
import Router, { useRouter } from 'next/router'

const Register = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, confirmPassword } = userData
    const {state, dispatch} = useContext(DataContext)
    const router = useRouter()
    const {auth} = state


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        dispatch({
            type: 'NOTIFY',
            payload: {}
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // console.log(userData)
        e.preventDefault()
        const errMsg = validate(name, email, password, confirmPassword)
        if (errMsg) {
            console.log(errMsg)
            return dispatch({
                type: "NOTIFY",
                payload: {error: errMsg}
            })
        }

        dispatch({
            type: 'NOTIFY',
            payload: {loading: true}
        })

        const res = await postData('auth/register', userData)

        if (res.error) {
            return dispatch({
                type: 'NOTIFY',
                payload: {error: res.error}
            })
        }

        return dispatch({
            type: "NOTIFY",
            payload: {success: res.msg}
        })
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0)
            router.push('/')
    }, [auth])

    return (
        <div>
            <Meta title="Register" />
            <form className='mx-auto my-4' style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={name}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                        placeholder="Enter name" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                        placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={password}
                        id="exampleInputPassword1"
                        placeholder="Enter a password"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        id="exampleInputPassword1"
                        placeholder="Confirm your password"
                        onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-dark w-100">Register</button>
                <p className='my-2'>Already have an account? <Link href="/signin" style={{ color: 'crimson' }}><a>Login Now</a></Link></p>
            </form>
        </div>
    )
}

export default Register