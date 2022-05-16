class BlockNarrativesController < ApplicationController
	skip_before_action :auth_current_user, only: %i[index show]

	def index
		render json: BlockNarrative.all, each_serializer: BlockNarrativeSerializer
	end

	def create
		block_id = Block.find_by!(block_num: params[:block_num]).id
		block_narrative =
			BlockNarrative.find_or_create_by!({ block_id: block_id, investigation_id: session[:investigations][0] })
		render json: block_narrative, status: :created
	end

	def show
		block_narrative = BlockNarrative.find_or_create_by!(id: params[:id])
		render json: block_narrative
	end

	def destroy
		block_narrative = BlockNarrative.find_by(id: params[:id])
		block_narrative.destroy
		head :no_content
	end

	private
end
