import { useState } from 'react';

function ListCard({name, description, image, difficulty, workload}){
    return(
        <div>
            <h2>{courseName}</h2>
            <p>{coursesDescription}</p>
            {/*make workload and difficulty receive user responses later...*/}
            <p>{Workload}</p>
            <p>{Difficulty}</p>
        </div>
    )
}

export default ListCard