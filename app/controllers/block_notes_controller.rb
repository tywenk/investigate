class BlockNotesController < ApplicationController
	skip_before_action :auth_current_user, only: %i[index show]
	def index
		render json: BlockNote.all
	end

	def create
		arr_notes = block_note_params[:notes]

		pp params[:label]

		pp arr_notes
		block_notes = BlockNote.upsert_all(arr_notes, unique_by: :index_block_notes_on_tx_hash)
		render json: block_notes, status: :created
	end

	def show
		notes = BlockNote.where(block_narrative_id: params[:id])
		render json: notes
	end

	def destroy; end

	private

	def block_note_params
		params.permit({ notes: %i[tx_hash note block_narrative_id] }, :label)
	end
end
