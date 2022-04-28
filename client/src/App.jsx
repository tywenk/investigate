import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"
import NavBar from "./pages/NavBar"
import UserProfile from "./pages/UserProfile"
import UserInvestigations from "./pages/UserInvestigations"
import InvestigationLayout from "./pages/InvestigationLayout"
import BlockEdit from "./pages/BlockEdit"
import BlockShow from "./pages/BlockShow"
import { UserProvider } from "./context/UserContext"

import InstallMetaMaskButton from "./components/InstallMetaMaskButton"

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<Router>
					{window.ethereum ? <NavBar /> : <InstallMetaMaskButton />}
					<Routes>
						<Route index element={<Home />}></Route>
						<Route path='profile' element={<UserProfile />}></Route>
						<Route
							path='investigations/:id'
							element={<UserInvestigations />}
						></Route>
						<Route
							path='investigations'
							element={<InvestigationLayout />}
						></Route>
						<Route path='block' element={<BlockEdit />}></Route>
						<Route path='block/:id' element={<BlockShow />}></Route>
						<Route path='block/:id/edit' element={<BlockEdit />}></Route>
						{/* <Route path='transaction' element={<TransactionEdit />}></Route>
						<Route path='transaction/:id' element={<TransactionShow />}></Route>
						<Route
							path='transaction/:id/edit'
							element={<TransactionEdit />}
						></Route> */}
						<Route path='*' element={<p>There's nothing here: 404</p>} />
					</Routes>
				</Router>
			</UserProvider>
		</QueryClientProvider>
	)
}

export default App
