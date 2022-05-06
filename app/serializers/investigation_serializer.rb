class InvestigationSerializer < ActiveModel::Serializer
	attributes :id, :block_narrs, :txn_narrs
	belongs_to :user

	# has_many :transaction_narratives
	# has_many :block_narratives
	# has_many :block_notes
	# has_many :blocks
	# has_many :txns

	def block_narrs
		object.block_narratives.map do |narr|
			{
				id: narr.id,
				created_at: narr.created_at,
				updated_at: narr.updated_at,
				block_notes: narr.block_notes,
				block: narr.block,
			}
		end
	end

	def txn_narrs
		object.transaction_narratives.map do |txn|
			{
				id: txn.id,
				label: txn.label,
				note_contract_address: txn.note_contract_address,
				note_effective_gas_price: txn.note_effective_gas_price,
				note_from: txn.note_from,
				note_to: txn.note_to,
				note_logs: txn.note_logs,
				note_gas_used: txn.note_gas_used,
				created_at: txn.created_at,
				updated_at: txn.updated_at,
				txn: txn.txn,
			}
		end
	end
end
