import { useContext } from "react";



export default function useError() {
    const context = useContext(ErrorContext);


    if (!context) {
        throw new Error('useError se mora korisitit unutar ErrorProvider-a');

    }


    return context;
}