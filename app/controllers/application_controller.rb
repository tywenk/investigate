class ApplicationController < ActionController::API
	include ActionController::Cookies

	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

	before_action :auth_current_user, :current_investigation

	private

	def auth_current_user
		@current_user ||= User.find_by(address: session[:address]) if session[:address]

		render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
	end

	def current_investigation
		@investigation = session[:investigations][0] if session[:investigations]
	end

	def render_unprocessable_entity_response(exception)
		render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
	end

	def render_not_found_response(exception)
		render json: { errors: exception.record.errors.full_messages }, status: :not_found
	end
end
