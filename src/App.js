import React from 'react';
import { BrowserRouter as Router, Route , Routes  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import AssetsView from './components/assetsView';
import CollectionsView from './components/collectionsView';

const App = () => {

    return (
        <Router>
            {/* <ScrollMemory /> */}
            <Routes>
                <Route path="/" element={ <CollectionsView />}></Route>
                <Route path="/assetsView" element={<AssetsView />}></Route>
            </Routes>
           
        </Router>
    )
}

export default App;
