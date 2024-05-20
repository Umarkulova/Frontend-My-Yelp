import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [accountList, setAccountList] = useState([])
  let auth = getAuth();

  const itemCollectionAccount = collection(db, "accounts");

  const getAccountList = async () => {
    try {
      const dataAcc = await getDocs(itemCollectionAccount);
      const filteredDataAcc = dataAcc.docs.map((doc) => ({
        ...doc.data()
      }));
      setAccountList(filteredDataAcc)
    } catch (error) {
      console.log(error);
    }
  };

  if (accountList) {
    console.log(accountList);
  }

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={isLogged ? <Navigate to={"/"} replace /> : <SignIn />}></Route>
        <Route path="/SignUp" element={isLogged ? <Navigate to={"/"} replace /> : <SignUp itemCollectionAccount={itemCollectionAccount} />}></Route>
        <Route path="/" element={isLogged ? ( <Main accountList={accountList} getAccountList={getAccountList} /> ) : ( <Navigate to={"/SignIn"} replace />)}></Route>
      </Routes>
    </div>
  );
}

export default App;
