import './App.css';
import { Route,Switch, BrowserRouter} from 'react-router-dom' 

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <Switch>
          <Route component={Login} path="/login"></Route>
          <Route component={ChatRoom} path="/"></Route>
        </Switch>
        <AddRoomModal></AddRoomModal>
        <InviteMemberModal></InviteMemberModal>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
