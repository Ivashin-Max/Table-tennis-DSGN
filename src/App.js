import React from 'react';
import './styles/App1.css';
import { initApp } from './actions/initApp';
import { useDispatch } from 'react-redux';
import Table from './components/Table'
import MyHeader from './components/MyHeader';
import Form from './components/Form';
import logoPingPong from './styles/img/ping-pong-loader.svg'

function App() {

	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			await dispatch(initApp());
			setLoading(false);
		})()
	}, [dispatch])

	//TODO:
	//Сначала инитим апп, потом отрисовываемся, может даже лоадер?
	//useState для хранения була лоадинг

	if (loading) { return (
    <div className="loaderRocket">
      	<img className="loader_rocket" src={logoPingPong} alt="red rocket"  />
    </div>
    ) }



	return (
		<div className="App">
			<MyHeader />
			<main>
				<Table />
				<Form q='sdfsd' />
			</main>
		</div>
	);
}

export default App;



