import GoogleAuth from "./GoogleAuth";
import './Navbar.css';

function Navbar() {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#174A43'}}>
            <div className="logo" style={{color: 'white', fontWeight: 'bold' }}>
                <img src="src/assets/homelogo.svg"></img>
            </div>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                <GoogleAuth></GoogleAuth>
            </ul>
        </nav>
    );
}

export default Navbar