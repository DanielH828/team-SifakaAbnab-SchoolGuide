import { useState } from 'react';
import App from './App.jsx';

function profileOverlay(userName) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: 'relative'}}>
            {open && (<div className="overlay-container">
                    <div className="overlay-content">
                        <h2>{userName}</h2>
                        <button className="ProfileSettings" onClick={() => setPage('error')}></button>
                    </div>
                </div>)
            }
        </div>
    )
}