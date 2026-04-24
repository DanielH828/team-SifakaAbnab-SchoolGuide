import { useState } from 'react';

function ListCard({courseName, courseDescription, image, difficulty, workload}){
    return(
        <div>
            <h2>{courseName}</h2>
            <p>{coursesDescription}</p>
            {/*make workload and difficulty receive user responses later...*/}
            <p>{workload}</p>
            <p>{difficulty}</p>
        </div>
    )
}

export default ListCard