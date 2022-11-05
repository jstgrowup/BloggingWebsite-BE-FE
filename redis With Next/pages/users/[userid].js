
import React from 'react'

function Useride({ data }) {

    return (
        <div>
            <h1>{data.body}</h1>
        </div>
    )
}
export async function getServerSideProps({ query }) {
    const { userid } = query
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${userid}`)
    const data = await res.json()
    return { props: { data } }
}
export default Useride