import { createContext } from "react";

const SidebarContext = createContext({
    isSidebar: '',
    setIsSidebar: () => {},
});

export default SidebarContext;

