class BlockNotesController < ApplicationController
	def create
		arr_notes = block_note_params[:notes]
		block_note = BlockNote.create!(arr_notes)
		render json: block_note, status: :created
	end

	private

	def block_note_params
		params.permit({ notes: %i[tx_hash label note block_narrative_id] })
	end
end
