import Link from 'next/link'
import React from 'react'

function Users() {
  
    return (
        <div>
            {
                data.map((el) => {
                    return <ul key={el.id}>
                        {/* <li>{el.name}</li> */}
                        {/* <Link href={`/users/${el.id}`} >
  
                            <li>{el.title}</li>
                        </Link> */}
                    </ul>
                })
            }

        </div>
    )
}
// export async function getServerSideProps() {
//     const res = await fetch("../api/hello/")
//     const data = await res.json()
//     return { props: { data } }
// }
export default Users