import { ReactNode } from 'react'

const index = ({ children }:{ children: ReactNode}) => {
    return (
        <div className='w-full flex-1 max-w-[1280px] mx-auto p-3'>
            {children}
        </div>
    )
}

export default index
