class TransactionNarrativeAndTransactionOnlySerializer < ActiveModel::Serializer
	attributes :id
	elongs_to :transaction
end
