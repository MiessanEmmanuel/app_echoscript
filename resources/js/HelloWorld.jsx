import React from 'react';

const HelloWorld = () => {
    let tableau = window.myData
    return (
        <div className=''>
            Hello, World!

            {tableau.map((element) => (
        <div key='dk'>
            {element}
        </div>
    ))}

        </div>
    );
};

export default HelloWorld;
