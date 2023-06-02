// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ImageGallery  } from './components/ImageGallery';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ImageGallery />
      </div>
    </Provider>
  );
};

export default App;
