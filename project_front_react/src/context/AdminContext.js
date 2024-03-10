import { createContext } from "react";

const AdminContext = createContext();

export default AdminContext;

// Create context
// Wrap component <Context.Provider value={{ state, setState  }}>
// To read context value => const { state, setState } = useContext(Context)