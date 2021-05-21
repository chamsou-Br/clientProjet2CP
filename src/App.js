import LoginScreen from "./Screens/LoginScreen";
import './index.css'
import RegistreScreen from "./Screens/RegistreScreen";
import Acceil from "./Screens";
import Commande from "./Screens/commande";
import Budget from "./Screens/budget";
import Compatable from "./Screens/Compatable";
import Marche from "./Screens/marche";
import Nouveau from "./Screens/Nouveau";
import {BrowserRouter , Route , Switch} from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
    <BrowserRouter>
      <Route exact component={Acceil} path='/'  />
      <Route component={Nouveau} path='/nouveauDossier' />
      <Route component={Marche} path='/marche/edit/:id' />
      <Route component={Commande} path='/commande/edit/:id' />
      <Route component={Budget} path='/budget/edit/:id' />
      <Route component={Compatable} path='/compatable/edit/:id' />
      <Route component={LoginScreen} path='/login' />
      <Route component={RegistreScreen} path='/registre' />

    </BrowserRouter>
       
    </div>
  );
}

export default App;
