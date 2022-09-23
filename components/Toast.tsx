import React from 'react'

type Message = {
    msg: string,
    title: string
}

const Toast = ({msg, handleShow, bgColor} : {msg: Message, handleShow: () => any, bgColor: string}) => {
    return(
        <div 
            className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px', padding: "2px" }} >

            <div className={`toast-header ${bgColor} text-light`}>
                <strong className="mr-auto text-light">{msg.title}</strong>

                <button 
                    type="button" 
                    className="ml-2 mb-1 close text-light" 
                    data-dismiss="toast" 
                    style={{ outline: 'none'}} 
                    onClick={handleShow}>x</button>
            </div>

            <div className="toast-body">{msg.msg}</div>

        </div>
    )
}

export default Toast