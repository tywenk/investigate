class BlockSerializer < ActiveModel::Serializer
	attributes :id, :block_num
	has_many :block_narratives
end
