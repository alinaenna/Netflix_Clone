import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log("UserName: ", username, email, password);

    return (
        <div
            className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/background_banner.jpg)",
            }}>

            <div className='max-w-[450px] w-full bg-black bg-opacity-75 rounded-3xl px-8 py-14 mx-auto mt-8'>
                <h1 className='text-3xl font-medium text-white mb-7'>Sign Up</h1>

                <form className='flex flex-col space-y-4'>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='AlinaEnna'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base'
                    />

                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='alinaenna@gmail.com'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base'
                    />

                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base'
                    />

                    <button type='submit' className='w-full bg-[#e50914] py-2 text-white rounded text-base hover:opacity-90 cursor-pointer'>
                        Sign Up
                    </button>
                </form>

                <div className='mt-10 text-[#737373] text-sm'>
                    <p>Already have an account? <span onClick={() => navigate("/signin")} className='text-white cursor-pointer font-medium ml-2 hover:underline'>Sign In Now</span></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp