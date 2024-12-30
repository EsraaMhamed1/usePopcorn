import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Main from './components/06challeng/Main';
// import CoinTransform from './components/05challeng/CoinTransform';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		 <App /> 
		{/* <CoinTransform /> */}
{/* <Main />*/}
	</React.StrictMode>
);

reportWebVitals();
