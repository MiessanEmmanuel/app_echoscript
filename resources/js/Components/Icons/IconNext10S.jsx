export default function IconNext10S({ className = '', fill = 'none', ...props }) {
    return (
        <svg {...props}  aria-hidden="true" viewBox="0 0 24 24" fill={fill} className={'stroke-slate-500 group-hover:stroke-slate-700 h-6 w-6 ' + className}>
            <path d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M13 15V19" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
    );

}
