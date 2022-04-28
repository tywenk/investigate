import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"
import NavBar from "./pages/NavBar"
import User from "./pages/User"
import UserProfile from "./pages/UserProfile"
import UserInvestigations from "./pages/UserInvestigations"
import InvestigationLayout from "./pages/InvestigationLayout"

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<NavBar />
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path='user' element={<User />}>
						<Route path='profile' element={<UserProfile />}></Route>
						<Route
							path='investigations'
							element={<UserInvestigations />}
						></Route>
					</Route>
					<Route path='investigation' element={<InvestigationLayout />}></Route>
					<Route path='*' element={<p>There's nothing here: 404</p>} />
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
