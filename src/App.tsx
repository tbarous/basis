import React from "react";

const App = ({user}) => {
    return (
        <div>
            {JSON.stringify(user)}

            <input type="text" onChange={(e)=>user.setName(e.target.value)} />
        </div>
    )
    
}

export default App