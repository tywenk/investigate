class BlockNarrativeSerializer < ActiveModel::Serializer
	attributes :id, :created_at, :updated_at
	belongs_to :block
	belongs_to :investigation
	belongs_to :user, serializer: UserSerializer
	has_many :block_notes
end
