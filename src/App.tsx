import { Toaster } from "react-hot-toast";
import { Route } from "wouter";

import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

function App() {
  return (
    <>
      <Toaster />
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </>
  );
}
export default App;
