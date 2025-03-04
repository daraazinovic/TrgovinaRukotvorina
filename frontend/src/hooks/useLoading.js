import { useContext } from "react";




export default function useLoading() {
    const context = useContext();


    if (!context) {
        throw new Error('useLoading se mora korisiti unutar LoadingProvidera-a');

    }

    return context
}