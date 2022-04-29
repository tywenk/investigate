class BlocksController < ApplicationController
	def index
		render json: Block.all
	end

	def create
		Block.upsert(block_params)
		block = Block.find_by(block_num: params[:block_num])
		render json: block, status: :created
	rescue ActiveRecord::RecordNotUnique
		block = Block.find_by(block_num: params[:block_num])
		render json: block
	end

	private

	def block_params
		params.permit(:block_num)
	end
end
