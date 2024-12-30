import { useEffect, useState } from 'react';

function CoinTransform() {
	const [amount, setAmount] = useState(1);
	const [fromCur, setFromCur] = useState('EUR');
	const [toCur, setToCur] = useState('USD');
	const [converted, setConverted] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	useEffect(
		function () {
			async function convert() {
				setIsLoading(true);
				const res = await fetch(
					`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
				);
				if (!res.ok) throw new Error('Network response was not ok');
				const data = await res.json();
				setConverted(data.rates[toCur]);
				setIsLoading(false);
			}

			if (fromCur === toCur) return setConverted(amount);
			convert();
		},
		[amount, fromCur, toCur]
	);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div style={{ display: 'flex', gap: '10px' }}>
				<input
					type='text'
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					disabled={isLoading ? true : false}
				/>
				<select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
					<option value={'USD'}>USD</option>
					<option value={'EUR'}>EUR</option>
					<option value={'CAD'}>CAD</option>
					<option value={'INR'}>INR</option>
					<option></option>
				</select>
				<select value={toCur} onChange={(e) => setToCur(e.target.value)}>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
					<option value='CAD'>CAD</option>
					<option value='INR'>INR</option>
				</select>
			</div>
			<p>
				{converted} {toCur}
			</p>
		</div>
	);
}

export default CoinTransform;
