import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const Chat = () => {
	const socket = io();
	const [messages, setMessages] = useState<any[]>([]);
	const message = useRef<any>();
	const [connected, setConnected] = useState<boolean>();

	useEffect(() => {
		socket.on('connect', () => {
			setConnected(true);
			socket.emit('identity');
		});
	}, []);

	useEffect(() => {
		socket.on('emit chat message', (msg) => {
			setMessages((prev: any) => [...prev, { message: msg }]);
		});
		socket.on('emit user joined', (msg) => {
			setMessages((prev: any) => [...prev, { user: msg }]);
		});
	}, []);

	const today = new Date();
	const timestamp = `(
	 ${today.getHours()}:
	 ${today.getMinutes()}
	 ) `;

	const sendMessage = (e: any) => {
		e.preventDefault();
		socket.emit('chat message', message.current.value);
		message.current.value = '';
	};

	return (
		<div className='bg-gray-200 lg:w-1/2 lg:h-96 flex'>
			<div className='flex flex-col h-96  p-8'>
				<div className='h-80'>
					{connected && <p className='text-gray-800 py-2'>Connected...</p>}
					<ul id='messages' className='flex flex-col items-start'>
						{messages.length > 0 &&
							messages?.map((message: any, i: number) => (
								<li
									key={i}
									className={[
										message.user
											? 'text-gray-500 text-sm'
											: 'text-black text-sm',
										'text-left',
									].join(' ,')}
								>
									<span className='text-xs'>{timestamp}</span>
									{message?.message ?? message?.user}
								</li>
							))}
					</ul>
				</div>
				<div className='w-full'>
					<form id='form' action='' className='w-full flex flex-row'>
						<input name='message' ref={message} className='text-black w-full' />
						<button
							onClick={sendMessage}
							className='bg-gray-800 rounded-sm text-sm px-4'
						>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
