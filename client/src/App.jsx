import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Home from "./pages/Home"
import NavBar from "./pages/NavBar"
import UserProfile from "./pages/UserProfile"
import AllNarratives from "./pages/AllNarratives"
import UserNarratives from "./pages/UserNarratives"
import UserNarrativesShow from "./pages/UserNarrativesShow"
import BlockUserNarratives from "./pages/BlockUserNarratives"
import Block from "./pages/Block"
import BlockShow from "./pages/BlockShow"
import BlockEdit from "./pages/BlockEdit"
import Transaction from "./pages/Transaction"
import TransactionShow from "./pages/TransactionShow"
import TransactionEdit from "./pages/TransactionEdit"
import TransactionUserNarratives from "./pages/TransactionUserNarratives"
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
						{window.ethereum ? <NavBar /> : <></>}
						<Routes>
							<Route index element={<Home />}></Route>
							<Route path='profile' element={<UserProfile />}></Route>
							<Route path='narratives/:addr' element={<UserNarratives />}></Route>
							<Route path='explore' element={<AllNarratives />}></Route>
							<Route path='explore/:addr' element={<UserNarrativesShow />}></Route>
							<Route path='block' element={<Block />}></Route>
							<Route path='block/:narrId' element={<BlockUserNarratives />}></Route>
							<Route path='block/:narrId/:blockNum' element={<BlockShow />}></Route>
							<Route path='block/:narrId/:blockNum/edit' element={<BlockEdit />}></Route>
							<Route path='transaction' element={<Transaction />}></Route>
							<Route path='transaction/:narrId' element={<TransactionUserNarratives />}></Route>
							<Route path='transaction/:narrId/:txHash' element={<TransactionShow />}></Route>
							<Route path='transaction/:narrId/:txHash/edit' element={<TransactionEdit />}></Route>
							<Route path='*' element={<p>There's nothing here: 404</p>} />
						</Routes>
					</Router>
				</AlchemyProvider>
			</UserProvider>
			{/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
		</QueryClientProvider>
	)
}

export default App
