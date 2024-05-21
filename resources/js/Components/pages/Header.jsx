import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

const Header = ({  name, description,button, children }) => {


    return (
        <div id="headerhome" className="bg-white/60 px-6 py-4 backdrop-blur-xl border-dropz-[40] hidden lg:flex items-end">
            <div className='w-4/5'>
                <h2 className="tracking-tight font-bold text-xl  ">{name}</h2>
                <p className="text-sm text-gray-600 font-light">
                    {description}
                </p>
            </div>
            <div className='w-1/5 text-end  '>

                {children}

            </div>

        </div>
    );
};

export default Header;
