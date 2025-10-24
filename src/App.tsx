import { Route, Routes } from "react-router-dom";
import TransactionList from "./pages/TransactionList";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionList />} />
      <Route path="/transaction/:id" element={<TransactionDetail />} />
    </Routes>
  );
}

export default App;
