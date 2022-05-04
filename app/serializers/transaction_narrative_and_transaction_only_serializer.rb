class TransactionNarrativeAndTransactionOnlySerializer < ActiveModel::Serializer
	attributes :id
	belongs_to :txn
end
