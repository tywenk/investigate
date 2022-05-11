class InvestigationsController < ApplicationController
	def show
		user = User.find_by(address: params[:id])
		investigation = Investigation.find_by(user_id: user.id)
		render json: investigation
	end

	private

	def investiation_params
		params.permit(:id)
	end
end
