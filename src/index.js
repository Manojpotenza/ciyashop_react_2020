import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

//Component
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ProductsData } from './actions';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import servicesstore from "./services/store";

class Root extends React.Component {
   render() {
      servicesstore.dispatch(ProductsData());
       return(
            <Provider store={servicesstore}>
               <BrowserRouter>
                  <Switch>
                     <Route path="/" component={App} />
                  </Switch>
               </BrowserRouter>
            </Provider>
         );
      }
  }

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();