import App from "./App.jsx";
import User from "./user";
import React from "react";
import ReactDOM from "react-dom/client";
import { of } from "rxjs";

const app = document.getElementById("app");

const root = ReactDOM.createRoot(app);

var user = new User("jOHN", "Doe");

const observable = of(user)

// .subscribe((v) => console.log(`value: ${v.name}`));

root.render(<App user={user} />);

const onInputChange = ({target: {value}})=>{
    of(value).subscribe((value) =>{
        console.log(value)
    })
}

export {observable, user, onInputChange}