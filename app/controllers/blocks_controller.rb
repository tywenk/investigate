class BlocksController < ApplicationController
	def index
		render json: Block.all
	end

	def create
		block = Block.find_or_create_by!(block_params)

		pp block

		block_narrative =
			BlockNarrative.find_or_create_by!({ investigation_id: session[:investigations][0], block_id: block.id })

		pp block_narrative

		render json: block_narrative, serializer: BlockNarrativeAndBlockOnlySerializer, status: :created
	end

	private

	def block_params
		params.permit(:block_num)
	end
end
