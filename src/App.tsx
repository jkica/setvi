import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import {AddPost} from './Pages/AddPost';
import {EditPost} from './Pages/EditPost';
import {AllPosts} from './Pages/AllPosts';
import {GlobalProvider} from './context/GlobalState';
import {Header} from "./components/Header/Header";

function App() {
    return (
        <div>
            <Router>
                <Header/>
                <GlobalProvider>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<AllPosts />}/>
                            <Route path="/add" element={<AddPost />}/>
                            <Route path="/posts/:id" element={<EditPost />}/>
                        </Routes>
                    </div>
                </GlobalProvider>
            </Router>
        </div>
    );
}

export default App;
