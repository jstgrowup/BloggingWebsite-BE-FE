import React from 'react'


function Dashboard() {
    const para=window.location.search
    console.log('para:', para.split("=")[1])

  
 
    return (
        <div>
            <h1>dashboard</h1>
        </div>
    )
}

export default Dashboard