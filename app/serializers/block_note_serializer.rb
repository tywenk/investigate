class BlockNoteSerializer < ActiveModel::Serializer
  attributes :id, :tx_hash, :note, :label
  has_one :block_narrative
end
