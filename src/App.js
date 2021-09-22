
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import Layout from "./Layout";
import Projects from "./views/Projects";
import Authorization from "./views/Authorization";
import NotFount from "./views/NotFount";
import TasksAndWorks from "./views/TasksAndWorks";
import Calendar from "./views/Calendar";
import Possibilities from "./views/Possibilities";

function App() {
    return (
        <Router>

            <Layout>
                <Switch>
                    <Route exact path='/'><Redirect to='/projects'/></Route>
                    <Route exact  path='/works'><TasksAndWorks/></Route>
                    <Route  path='/projects'><Projects/></Route>
                   <Route path='/calendar'> <Calendar /></Route>
                    <Route path='/possibilities'><Possibilities/></Route>
                    <Route  path='/authorization'><Authorization/></Route>
                    <Route path='*'><NotFount/></Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;







// <Router>
//     <Layout>
//         <Switch>
//             <Route exact path='/'> <Home/> </Route>
//             <Route exact path='/news'> <News/> </Route>
//             <Route path='/news/:id'> <NewsDetails/> </Route>
//             <Route path='/login'><LogIn/></Route>
//             <Route path='/claim'><Claim/></Route>
//             <Route path='/students'><Students/></Route>
//             <Route path='/registration'><Registration/></Route>
//             <Route path='*'><NotFount/></Route>
//         </Switch>
//     </Layout>
// </Router>
