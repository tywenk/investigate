class BlockNoteSerializer < ActiveModel::Serializer
	attributes :id, :tx_hash, :note, :label, :block_narrative_id
end
