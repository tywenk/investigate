class BlockNoteSerializer < ActiveModel::Serializer
	attributes :id, :tx_hash, :note, :label, :block_narrative_id
	has_one :block_narrative
end
