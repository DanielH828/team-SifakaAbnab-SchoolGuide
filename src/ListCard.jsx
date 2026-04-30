import { useState } from 'react';

function ListCard({courseName2, courseDescription, image, difficulty, workload}){
    return(
        <div>
            <h2>{courseName2}</h2>
            <p>{courseDescription}</p>
            {/*make workload and difficulty receive user responses later...*/}
            <p>{workload}</p>
            <p>{difficulty}</p>
        </div>
    )
}

export default ListCard