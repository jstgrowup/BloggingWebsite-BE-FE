import { Button, Input } from '@chakra-ui/react'
import React from 'react'


function Dashboard() {
    const para = window.location.search
    console.log('para:', para.split("=")[1])



    return (
        <div>
            <h1>Comments</h1>
            <Input />
            <Button></Button>
        </div>
    )
}

export default Dashboard