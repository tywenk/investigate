class InvestigationsController < ApplicationController
	def show
		investigation = Investigation.find_by(user_id: params[:id])
		render json: investigation
	end

	private

	def investiation_params
		params.permit(:id)
	end
end
