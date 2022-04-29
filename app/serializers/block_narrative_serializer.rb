class BlockNarrativeSerializer < ActiveModel::Serializer
  attributes :id, :block
  has_one :investigation
end
