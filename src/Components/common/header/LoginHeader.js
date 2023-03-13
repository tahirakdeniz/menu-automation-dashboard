import React from "react";

const LoginHeader = () => {
    return (
    <div className="header">
        <img
        className="header_logo"
        alt="Back4App Logo"
        src={
            'https://media-exp1.licdn.com/dms/image/C4E0BAQHIMEfhiwYd6g/company-logo_200_200/0/1624274901673?e=2147483647&v=beta&t=lu-YPbJ08TGLRx5frzPlUBgIVRuFlj4oXTNUjbOXj4w'
        }
        />
        <p className="header_text_bold">{'Infosort'}</p>
    </div>
    )
}

export default LoginHeader