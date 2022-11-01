import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chat } from './Chat';

export default function App() {
	const [user, setUser] = useState<{ email: string; username: string }>({
		email: '',
		username: '',
	});

	useEffect(() => {
		(async () => {
			const { data } = await axios.get('/api/v1/users/current');
			setUser({ username: data.username, email: data.email });
		})();
	}, []);

	return (
		<div className='h-screen w-full bg-black text-white text-2xl flex flex-col items-center justify-center text-center'>
			<div className='px-24'>Welcome,</div>
			<div className='py-4'>{user?.username}</div>
			<Chat />
		</div>
	);
}
