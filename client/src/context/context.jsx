import React from 'react'
export const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
    const [chatRoom, setChatRoom] = React.useState(0)

    const isStatus = () => {
        setChatRoom(chatRoom + 1)

    }
    return <AppContext.Provider value={{ isStatus, chatRoom }}>{children}</AppContext.Provider>



}

export default AppContextProvider