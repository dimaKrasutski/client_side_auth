import React from 'react';
import ReacDOM from 'react-dom';
import { BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import Welcome from './components/Welcome';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import SignIn from './components/auth/SignIn';

import App from './components/App';
import Feature from './components/Feature'



const store = createStore(
    reducers,
    {  
        auth:{authenticated:localStorage.getItem('token')}
    },
    applyMiddleware(reduxThunk)
)


ReacDOM.render(
    <Provider store={store}>
        <BrowserRouter> 
            <App>
                <Route path="/" exact component={Welcome}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/feature' component={Feature}/>
                <Route path='/signout' component={SignOut}/>
                <Route path='/signin' component={SignIn}/>

            </App>
        </BrowserRouter>
        </Provider>,

    document.querySelector('#root')
    )

