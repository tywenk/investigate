class ApplicationController < ActionController::API
	include ActionController::Cookies

	rescue_from ActiveRecord::RecordInvalid,
	            with: :render_unprocessable_entity_response
	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

	before_action :auth_current_user

	private

	def auth_current_user
		if session[:address]
			@current_user ||= User.find_by(address: session[:address])
		end

		unless @current_user
			render json: { errors: ['Not authorized'] }, status: :unauthorized
		end
	end

	def render_unprocessable_entity_response(exception)
		render json: {
				errors: exception.record.errors.full_messages,
		       },
		       status: :unprocessable_entity
	end

	def render_not_found_response(exception)
		render json: {
				errors: exception.record.errors.full_messages,
		       },
		       status: :not_found
	end
end
