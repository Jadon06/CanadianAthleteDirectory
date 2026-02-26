export default function Sign_up() {
    return (
        <div>
            <div className="center-grid">
                <h1>Sign Up Now</h1>
                <div className="label-input-form-row">    
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" />

                    <label htmlFor="First Name">First Name</label>
                    <input id="First Name" type="string" />
                </div>
            </div>
        </div>
    );
}