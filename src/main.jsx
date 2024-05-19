import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Navbar from './components/navbar.jsx';
import AddApp from './components/AddApp.jsx';
import DeleteMovie from './components/DeleteMovie.jsx';
import Edit from './components/Edit.jsx';

const MainComponent = ({ setView, setSelectedId }) => {
  return (
    <>
      <React.StrictMode>
        <Navbar setView={setView} />
        <App setView={setView} setSelectedId={setSelectedId} />
      </React.StrictMode>
    </>
  );
};

const AddReview = ({ setView }) => {
  return (
    <React.StrictMode>
      <Navbar setView={setView} />
      <AddApp setView={setView} />
    </React.StrictMode>
  );
};

const Delete = ({ setView, selectedId }) => {
  return (
    <React.StrictMode>
      <Navbar setView={setView} />
      <DeleteMovie setView={setView} selectedId={selectedId} />
    </React.StrictMode>
  );
};

const EditMovie = ({ setView, selectedId }) => {
  return (
    <React.StrictMode>
      <Navbar setView={setView} />
      <Edit setView={setView} selectedId={selectedId} />
    </React.StrictMode>
  );
}

const RouterPaths = () => {
  const [view, setView] = useState('main');
  const [selectedId, setSelectedId] = useState(null);

  const renderView = () => {
    switch (view) {
      case 'main':
        return <MainComponent setView={setView} setSelectedId={setSelectedId} />;
      case 'add':
        return <AddReview setView={setView} />;
      case 'delete':
        return <Delete setView={setView} selectedId={selectedId} />;
      case 'edit':
        return <Edit setView={setView} selectedId={selectedId} />;
      default:
        return <MainComponent setView={setView} setSelectedId={setSelectedId} />;
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<RouterPaths />);
