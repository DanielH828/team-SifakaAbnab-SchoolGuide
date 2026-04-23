import { useState } from 'react'
import ProfilePicture from './assets/ProfilePicture.svg'

function CommentForCourseProfile({name, reviewedDiff, reviewedWorkload, review}) {
    return(
        <div>
            <img src={ProfilePicture}/>
            <p>{name}</p>
            <p></p>
            <p>Difficulty: {reviewedDiff}</p>
            <p>Workload: {reviewedWorkload}</p>
            <p>{review}</p>
        </div>
    )
}

export default CommentForCourseProfile