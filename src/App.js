import "./App.css";
import "./style/input.css";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import BoardDetail from "./pages/BoardDetail";
import Board from "./pages/Board";
import LoginForm from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";

import Join from "./pages/Join";
function App() {
  const token = useSelector((state) => state.Auth.token);
  console.log(token);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Board" element={<BoardDetail />} />
        <Route
          path="/BoardWrite"
          element={<BoardWrite />}
          // element={<PrivateRoute path="/BoardWrite" component={BoardWrite} />}
        />
        <Route path="/MyPage/:userId" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
