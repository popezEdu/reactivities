import { use } from "react";
import { StoreContext } from "../stores/store";

export function useStore() {
    return use(StoreContext);
}