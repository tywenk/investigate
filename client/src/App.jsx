import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Home from "./pages/Home"
import NavBar from "./pages/NavBar"
import UserProfile from "./pages/UserProfile"
import UserInvestigations from "./pages/UserInvestigations"
import InvestigationLayout from "./pages/InvestigationLayout"
import Block from "./pages/Block"
import BlockUserNarratives from "./pages/BlockUserNarratives"
import BlockShow from "./pages/BlockShow"
import BlockEdit from "./pages/BlockEdit"
import { UserProvider } from "./context/UserContext"
import { AlchemyProvider } from "./context/AlchemyContext"

import InstallMetaMaskButton from "./components/InstallMetaMaskButton"

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<AlchemyProvider>
					<Router>
						{window.ethereum ? <NavBar /> : <InstallMetaMaskButton />}
						<Routes>
							<Route index element={<Home />}></Route>
							<Route path='profile' element={<UserProfile />}></Route>
							<Route path='investigations/:addr' element={<UserInvestigations />}></Route>
							<Route path='investigations' element={<InvestigationLayout />}></Route>
							<Route path='block' element={<Block />}></Route>
							<Route path='block/:id' element={<BlockUserNarratives />}></Route>
							<Route path='block/:narrId/:blockNum' element={<BlockShow />}></Route>
							<Route path='block/:narrId/:blockNum/edit' element={<BlockEdit />}></Route>
							<Route path='block/:id/:narrative' element={<BlockEdit />}></Route>
							{/* <Route path='transaction' element={<TransactionEdit />}></Route>
						<Route path='transaction/:id' element={<TransactionShow />}></Route>
						<Route
							path='transaction/:id/edit'
							element={<TransactionEdit />}
						></Route> */}
							<Route path='*' element={<p>There's nothing here: 404</p>} />
						</Routes>
					</Router>
				</AlchemyProvider>
			</UserProvider>
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	)
}

export default App
