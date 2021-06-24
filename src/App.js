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
import {Provider} from  'react-redux'
import store from "./Store";
import MarcheEncore from "./Screens/MarcheEncore";
import CommandeEncore from "./Screens/CommandeEncore";
import BudgetEncore from "./Screens/BudgetEncore";
import CompatableEncore from "./Screens/CompatableEncore";
import ConsultationDossier from "./Screens/ConsultationDossier";
import Loading from "./Screens/Loading";
import Notification from "./Screens/Notification";
import Profile from "./Screens/Profile";
import Users from "./Screens/users";
import ForgetPassword from "./Screens/ForgetPassword";
import PDFConsultationDossier from "./Screens/PDFConsultation";
import Static from "./Screens/statistic";

function App() {
 
  return (
    <Provider store={store} >
      <div className="App">
          <BrowserRouter>
            <Route exact component={Acceil} path='/'  />
            <Route component={Nouveau} path='/nouveauDossier' />
            <Route component={Marche} path='/marche/edit/:id' />
            <Route component={Commande} path='/commande/edit/:id' />
            <Route component={Budget} path='/budget/edit/:id' />
            <Route component={Compatable} path='/compatable/edit/:id' />
            <Route component={LoginScreen} exact path='/login' />
            <Route component={RegistreScreen} path='/registre' />
            <Route component={MarcheEncore} exact path='/marche/edit' />
            <Route component={CommandeEncore} exact path='/commande/edit' />
            <Route component={BudgetEncore} exact path='/budget/edit' />
            <Route component={CompatableEncore} exact path='/compatable/edit' />
            <Route component={ConsultationDossier} exact path='/consultation/:id' />
            <Route component={Notification} path='/notification' />
            <Route component={Profile} path='/profile' />
            <Route component={Users} path='/users' />
            <Route component={ForgetPassword} path='/forgetPassword' />
            <Route component={Static} path='/static'/>
          </BrowserRouter>
        
      </div>
    </Provider>
  );
}

export default App;
