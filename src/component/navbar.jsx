import React from "react";


export default function NavBar(){

const navRoutes = [
    {name:'Home',url:'/'},
    {name:'Dashboard',url:'/dashboard'},
    {name:'About',url:'/about'},
    {name:'Contact',url:'/contact'},
]

    return(
        <div>
            <div className="flex flex-row justify-between">
                <div className="logo w-2 h-2">
                    logo
                </div>
                <div className="flex flex-row jus">

                </div>
            </div>
        </div>
    );
}