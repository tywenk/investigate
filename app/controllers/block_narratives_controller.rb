class BlockNarrativesController < ApplicationController
	def index
		render json: BlockNarrative.all
	end

	def create; end

	def show; end

	def update; end

	def destroy; end

	private

	def block_narr_params
		params.permit
	end
end
