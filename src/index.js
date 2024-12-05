import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Appv2 from './Appv2';
// import StarRating from './StarRating';

// const Test = () => {
// 	const [rate, setRate] = useState(0);
// 	return (
// 		<div>
// 			<StarRating maxRating={10} color='blue' onSetRating={setRate} />
// 			<p>The Movie was reated {rate} stars</p>
// 		</div>
// 	);
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		{/* <StarRating
			maxRating={5}
			messages={['Terrible', 'Bad', 'Okay', 'Good', 'Ammazing']}
		/>
		<StarRating maxRating={10} size={24} color='red' className={'test'} /> */}

		{/* <Test /> */}

		{/* <Appv2 /> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
