import { useState } from 'react'
import './CommentForCourseProfile.css'
import ProfilePicture from './assets/ProfilePicture.svg'

function CommentForCourseProfile({name, reviewedDiff, reviewedWorkload, review}) {
    return(
        <div id="commentBox">
            <div id="commentHeader">
                <div id="commentOnTheLeft">
                    <img src={ProfilePicture} id="commentPicture"/>
                    <p id="commentName">{name}</p>
                </div>
                <div id="commentOnTheRight">
                    <p id="commentDiff">Difficulty: {reviewedDiff}</p>
                    <p id="commentWorkload">Workload: {reviewedWorkload}</p>
                </div>
            </div>
            <p id="commentReview">{review}</p>
        </div>
    )
}

export default CommentForCourseProfile