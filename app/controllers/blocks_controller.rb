class BlocksController < ApplicationController
	def index
		render json: Block.all
	end

	def create
		block = Block.find_or_create_by!(block_params)
		render json: block, status: :created
	end

	private

	def block_params
		params.permit(:block_num)
	end
end
