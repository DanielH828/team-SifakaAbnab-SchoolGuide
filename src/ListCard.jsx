import { useState } from 'react';

function ListCard({courseName2, courseDescription, image, difficulty, workload}){
    return(
        <div>
            <h2 className='Name'>{courseName2}</h2>
            <p className='desc'>{courseDescription}</p>
            {/*make workload and difficulty receive user responses later...*/}
            <p className='load'>{workload}</p>
            <p className='diffic'>{difficulty}</p>
        </div>
    )
}

export default ListCard