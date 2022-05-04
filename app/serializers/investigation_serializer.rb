class InvestigationSerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :user
	has_many :block_narratives
	has_many :blocks
	has_many :transaction_narratives
	has_many :txns
end
