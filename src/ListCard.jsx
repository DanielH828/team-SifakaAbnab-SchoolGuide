import { useState } from 'react';

function ListCard({courseName2, image, onClick}){
    return(
        <div className='listCard' onClick={onClick} style={{ cursor: 'pointer' }}>
            <h2 className='Name'>{courseName2}</h2>
            {/*make workload and difficulty receive user responses later...*/}
        </div>
    )
}

export default ListCard