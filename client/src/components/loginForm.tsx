import React from "react"
import kiwi from "../images/kiwi-3.svg"
import styles from "./Styles.module.css"

function LogIn(){
    return(
        <div className="base-container">
            <div className="header">Login Page</div>

            <div className="content">

                <div className="image">
                    <img className={styles.image} src={kiwi}/>
                </div>

                <div className="form">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="username"></input>
                </div>

                <div className="form">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="password"></input>
                </div>

            </div>

            <div className="footer">
                <button className="btn" type="button">Login</button>

            </div>



        </div>
    )

    
}


export default LogIn