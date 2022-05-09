class TransactionNarrativeSerializer < ActiveModel::Serializer
	attributes :id,
	           :label,
	           :note_to,
	           :note_from,
	           :note_contract_address,
	           :note_gas_used,
	           :note_effective_gas_price,
	           :note_logs,
	           :note_value,
	           :created_at,
	           :updated_at
	has_one :investigation
	has_one :txn
	has_one :user, serializer: UserSerializer
end
