Rails.application.routes.draw do
	resources :txns
	resources :users, except: [:show]
	resources :sessions
	resources :block_notes, except: [:update]
	resources :block_narratives
	resources :blocks
	resources :investigations
	resources :transaction_narratives

	root 'sessions#index'

	get '/profile', to: 'sessions#profile'
	post '/message', to: 'sessions#message'
	post '/sign-in', to: 'sessions#sign_in'
	post '/sign-out', to: 'sessions#sign_out'
	get '/autologin', to: 'users#show'

	# Routing logic: fallback requests for React Router.
	# Leave this here to help deploy your app later!
	get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
