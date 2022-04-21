import React from 'react';
import './styles/App1.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import logoPingPong from './styles/img/ping-pong-loader.svg'
import UserWrapper from './components/UserWrapper';
import AdminWrapper from './components/Admin/AdminWrapper';
import MessageModal from './components/Modal/MessageModal';
import BackdropLoader from './components/Styled/Backdrop';
import { initApp } from './actions/initApp';
import { getUser } from './actions/localStorage';

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const user = getUser();
      setLoading(true);
      await dispatch(initApp(user));
      setLoading(false);
    })()
  }, [dispatch])

  //TODO:
  //Сначала инитим апп, потом отрисовываемся, может даже лоадер?
  //useState для хранения була лоадинг

  if (loading) {
    return (
      <div className="loaderRocket">
        <object className='loader_rocket_start' type="image/svg+xml" data={logoPingPong}>svg-animation</object>
      </div>
    )
  }



  return (
    <div className="App">
      <MessageModal />
      <BackdropLoader />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to="/user" replace />} />
          <Route path="/user" element={<UserWrapper />} />
          <Route path="/admin" element={<AdminWrapper />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



