import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './css/first-style.css'
import {HashRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#706f6f',
                  colorError: '#be0028',
                  colorSuccess: '#54ad2a',
                  fontSizeHeading3: 20
              },
              components: {
                  Input: {
                  }
              }
          }}
      >
          <HashRouter>
              <App />
          </HashRouter>
      </ConfigProvider>
  </React.StrictMode>
);

