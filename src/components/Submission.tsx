import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { Input, Label } from './FormFields';

interface SuccessMessageProps {
	onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = (props) => {
	const [isSuccess, setSuccessStatus] = React.useState(true);
	const { onClose } = props;
	const timeoutRef = React.useRef(null);

	React.useEffect(() => {
		if (!isSuccess) {
			return;
		}

		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setSuccessStatus(false);
			setTimeout(() => {
				onClose();
			}, 600);
		}, 1000 * 4);

		return () => clearTimeout(timeoutRef.current);
	}, [isSuccess, onClose]);

	return (
		<div
			className={`fixed success ${
				isSuccess ? 'fadeInUp' : 'fadeOutDown'
			} shadow overflow-hidden rounded items-center bg-white border mt-4 mx-auto flex`}
		>
			<div className="bg-green-500 p-2">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					className="w-8 h-8 inline-block text-white"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
			<p className="pl-4">The link has been submitted</p>
			<button onClick={onClose} className="flex justify-end flex-1 m-2 p-2">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					className="w-4 h-4 text-gray-600"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
};

export const Submission = () => {
	const [isSuccess, setSuccessStatus] = React.useState(false);
	const refProposal = React.useRef<HTMLInputElement>();
	React.useEffect(() => {
		if (firebase.apps.length > 0) {
			return;
		}

		firebase.initializeApp({
			apiKey: 'AIzaSyDKkIgPEZ5ITWx8qCQ6m7FTWAHbQRuXZJw',
			authDomain: 'thisweekingodot.firebaseapp.com',
			databaseURL: 'https://thisweekingodot.firebaseio.com',
			projectId: 'thisweekingodot',
			storageBucket: 'thisweekingodot.appspot.com',
			messagingSenderId: '313887429776',
			appId: '1:313887429776:web:add8104b53b40d92d17415',
		});
	}, []);

	const onCloseSuccess = () => {
		setSuccessStatus(false);
	};

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const result = await new firebase.auth.RecaptchaVerifier(
			'proposal-submit',
			{
				size: 'invisible',
			},
		).verify();

		const ref = await firebase.database().ref('proposals').push().set({
			link: refProposal.current.value,
			added: false,
			date: new Date(),
		});

		refProposal.current.value = '';
		setSuccessStatus(true);
	};
	return (
		<div className="py-6 px-2 md:px-6 mt-4 rounded bg-gray-200 border border-gray-300">
			<form onSubmit={onSubmit}>
				<h3 className="text-2xl mb-3 text-center">
					Do you have something to share?
				</h3>
				<Label htmlFor="link">Write the link here</Label>
				<Input
					ref={refProposal}
					name="link-proposal"
					id="link-proposal"
					placeholder="http://example.com"
				/>
				<div id="proposal-submit"></div>
				<div className="w-full flex items-center justify-center mt-5">
					<button className="rounded border border-blue-700 bg-blue-700 text-white px-4 py-2">
						Submit
					</button>
				</div>
			</form>
			{isSuccess && <SuccessMessage onClose={onCloseSuccess} />}
		</div>
	);
};
