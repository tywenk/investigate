class BlocksController < ApplicationController
	def index
		render json: Block.all
	end

	def create
		block = Block.find_or_create_by!(block_params)
		block_narrative =
			BlockNarrative.find_or_create_by!({ investigation_id: session[:investigations][0], block_id: block.id })
		render json: block, status: :created
	end

	private

	def block_params
		params.permit(:block_num)
	end
end
