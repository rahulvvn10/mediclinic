import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
        const dispatch = useDispatch();
        useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return(
  <>
    <Toaster position="bottom-center" />
   <AppRoutes />
   </>
  )
}

export default App;