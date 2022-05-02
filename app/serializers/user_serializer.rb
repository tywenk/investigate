class UserSerializer < ActiveModel::Serializer
	attributes :id
	has_many :investigations
	has_many :block_narratives
end
