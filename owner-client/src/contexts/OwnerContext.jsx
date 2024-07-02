import { createContext } from 'react'
import axios from 'axios'

export const OwnerContext = createContext()

const URL = 'http://localhost:8000/api/v1/owner'

export const OwnerProvider = ({ children }) => {



    return (
        <OwnerContext.Provider>{children}</OwnerContext.Provider>
    )
}