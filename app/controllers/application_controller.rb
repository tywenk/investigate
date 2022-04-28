class ApplicationController < ActionController::API
	include ActionController::Cookies

	before_action :current_user

	private

	def current_user
		@current_user ||= User.where(address: session[:address]).first if session[
			:address
		]
	end
end
