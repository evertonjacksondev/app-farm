import { createContext, useContext, useState } from "react";

interface IGlobalContextProps {
    isActiveModalProducer: boolean;
    setIsActiveModalProducer: (isActiveModalProducer: boolean) => void;
    isActiveModalFarm: boolean;
    setIsActiveModalFarm: (isActiveModalFarm: boolean) => void;
    isActiveModalAgriculture: boolean;
    setIsActiveModalAgriculture: (isActiveModalAgriculture: boolean) => void;
    setEditProducer: (value: any) => void;
    editProducer: any;
}

interface IProviderGlobalProps {
    children: React.ReactNode;
}

export const GlobalContext = createContext<IGlobalContextProps | undefined>(undefined);

export function useProviderGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useProviderGlobal must be used within a ProviderGlobal");
    }
    return context;
}

export const ProviderGlobal = ({ children }: IProviderGlobalProps) => {
    const [isActiveModalProducer, setIsActiveProducer] = useState<boolean>(false);
    const [isActiveModalFarm, setIsActiveFarm] = useState<boolean>(false);
    const [isActiveModalAgriculture, setIsActiveAgriculture] = useState<boolean>(false);
    const [editProducer, setEditProducer] = useState<any>(null);

    const handleToggleModalProducer = () => setIsActiveProducer(prev => !prev);
    const handleToggleModalFarm = () => setIsActiveFarm(prev => !prev);
    const handleToggleModalAgriculture = () => setIsActiveAgriculture(prev => !prev);
    const handleEditProducer = (value: any) => setEditProducer(value);

    return (
        <GlobalContext.Provider
            value={{
                isActiveModalProducer,
                setIsActiveModalProducer: handleToggleModalProducer,
                isActiveModalFarm,
                setIsActiveModalFarm: handleToggleModalFarm,
                isActiveModalAgriculture,
                setIsActiveModalAgriculture: handleToggleModalAgriculture,
                setEditProducer: handleEditProducer,
                editProducer,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
