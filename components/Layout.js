import Header from './Header';
import React from 'react';

export default function Layout ({ children, activeIng }){
    return (
            <React.Fragment>
                <Header activeIng={activeIng}/>
                <main>
                    { children }
                </main>
            </React.Fragment>
    )
}