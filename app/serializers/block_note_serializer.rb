class BlockNoteSerializer < ActiveModel::Serializer
	attributes :id, :tx_hash, :note, :block_narrative_id
	belongs_to :block_narrative
end
