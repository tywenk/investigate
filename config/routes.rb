Rails.application.routes.draw do
	resources :users
	root 'sessions#index'

	get 'profile' => 'sessions#profile', :as => 'profile'
	get 'message' => 'sessions#message', :as => 'message'

	post 'sign-in' => 'sessions#sign_in', :as => 'sign-in'
	post 'sign-out' => 'sessions#sign_out', :as => 'sign-out'

	resources :users
	resources :sessions

	# Routing logic: fallback requests for React Router.
	# Leave this here to help deploy your app later!
	get '*path',
	    to: 'fallback#index',
	    constraints: ->(req) { !req.xhr? && req.format.html? }
end
