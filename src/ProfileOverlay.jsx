import { useState } from 'react';
import { createPortal } from 'react-dom';

function ProfileOverlay({userName, setPage}) {
    const overlayContent = (
            <div className="overlay-container">
                 <div className="overlay-content">
                    <h2>{userName}</h2>
                    <button className="ProfileSettings" onClick={() => setPage('error')}>Profile Settings</button>
                </div>
            </div>
    )

return createPortal(overlayContent, document.body)

}

export default ProfileOverlay