import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { Input, Label } from './FormFields';

export const Submission = () => {
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

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const result = await new firebase.auth.RecaptchaVerifier(
			'proposal-submit',
			{
				size: 'invisible',
			},
		).verify();

		const ref = firebase.database().ref('proposals').push().set({
			link: refProposal.current.value,
			added: false,
		});
	};
	return (
		<form
			className="p-6 mt-4 rounded bg-gray-200 shadow-xs"
			onSubmit={onSubmit}
		>
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
	);
};
