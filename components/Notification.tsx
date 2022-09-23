import {useContext} from 'react'
import {DataContext} from '../store/globalState'
import Loading from './Loading'
import Toast from './Toast'

const Notification = () => {
    const {state, dispatch} = useContext(DataContext)
    const { notify } = state
    if (notify.error)
        console.log(notify.error)

    return(
        <> 
            {notify.loading && <Loading />}
            {notify.error && 
                <Toast
                    msg={{ msg: notify.error, title: "Error" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-danger"
                />
            }

            {notify.success && 
                <Toast
                    msg={{ msg: notify.success, title: "Success" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-success"
                />
            }
        </>
    )
}


export default Notification