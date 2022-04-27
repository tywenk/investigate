import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./pages/Home"

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route index element={<Home />}></Route>
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
