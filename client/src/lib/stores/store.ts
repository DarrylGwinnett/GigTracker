import { createContext } from "react"
import UiStore from "./uiStore"
import { GigStore } from "./gigStore";

interface Store{
    uiStore: UiStore,
    gigStore: GigStore
}

export const store: Store = {
    uiStore: new UiStore(),
    gigStore: new GigStore()
}

export const StoreContext = createContext(store);