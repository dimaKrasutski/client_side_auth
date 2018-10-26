import React from 'react';
import ReacDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter,Route} from 'react-router-dom'
import Welcome from './components/Welcome';


ReacDOM.render(
        <BrowserRouter> 
            <App>
                <Route path="/" exact component={Welcome}/>
            </App>
        </BrowserRouter>,
    document.querySelector('#root')
    )

