class InvestigationSerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :user
	has_many :block_narratives
	has_many :blocks
end
