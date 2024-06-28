import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react"

export const useIsConnectedToNetwork = () => {
    const [ isConnectedStatus, setIsConnectedStatus ] = useState(false);

    const { isConnected, isInternetReachable } = useNetInfo();

    useEffect(() => {
        setIsConnectedStatus(Boolean(isConnected && isInternetReachable))
    }, [isConnected, isInternetReachable])

    return { isConnectedStatus };
}