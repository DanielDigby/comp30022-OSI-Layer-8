import React from "react"
import kiwi2 from "../images/kiwi2.svg"
import styles from "./Styles.module.css"

function Register(){
    return(
        <div className="base-container">
            <div className="header">Login Page</div>

            <div className={styles.basecontainer}>

                <div className="image">
                    <img className={styles.image} src={kiwi2}/>
                </div>

                <div className="form">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter full name"></input>
                </div>

                <div className="form">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="username"></input>
                </div>

                <div className="form">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="password"></input>
                </div>

            </div>

            <div className="footer">
                <button className="btn" type="button">Register</button>

            </div>



        </div>
    )

    
}


export default Register