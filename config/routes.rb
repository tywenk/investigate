Rails.application.routes.draw do
	root 'sessions#index'

	get '/profile', to: 'sessions#profile'
	post '/message', to: 'sessions#message'
	post '/sign-in', to: 'sessions#sign_in'
	post '/sign-out', to: 'sessions#sign_out'
	get '/autologin', to: 'sessions#profile'

	resources :users
	resources :sessions

	# Routing logic: fallback requests for React Router.
	# Leave this here to help deploy your app later!
	get '*path',
	    to: 'fallback#index',
	    constraints: ->(req) { !req.xhr? && req.format.html? }
end
