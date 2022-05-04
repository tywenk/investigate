class BlockNarrativesController < ApplicationController
	def index
		render json: BlockNarrative.all
	end

	def create
		block_id = Block.find_by!(block_num: params[:block_num]).id
		block_narrative =
			BlockNarrative.find_or_create_by!({ block_id: block_id, investigation_id: session[:investigations][0] })
		puts block_narrative.block_id
		puts block_narrative.investigation_id
		render json: block_narrative, status: :created
	end

	def show
		block_narrative = BlockNarrative.find_or_create_by!(id: params[:id])
		puts block_narrative
		render json: block_narrative
	end

	private
end
