function AanimateWriteText({className = '',text, ...props}) {
    return (
        <div className='mx-auto'>
            <h1 className={'animate-write-text text-5xl  mx-auto  bg-clip-text  uppercase ' + className} {...props}>{text} </h1>
        </div>
    );
}

export default AanimateWriteText;
