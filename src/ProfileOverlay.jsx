import { useState } from 'react';
import App from './App.jsx';

function profileOverlay(userName) {
    const [open, setOpen] = useState(false);
    const toggleOverlay = () => setOpen(!open);

    return (
        <div style={{ position: 'relative'}}>
            <Homepage toggleOverlay={toggleOverlay} />
            {open && (
            <div className="overlay-container">
                 <div className="overlay-content">
                    <h2>{userName}</h2>
                     <button className="ProfileSettings" onClick={() => setPage('error')}></button>
                </div>
            </div>)
            }
        </div>
    )
}

export default profileOverlay