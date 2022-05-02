class UsersController < ApplicationController
	def show
		if @current_user
			render json: @current_user,
			       serializer: UserSessionSerializer,
			       ens: session[:ens]
		else
			head :no_content
		end
	end
end
