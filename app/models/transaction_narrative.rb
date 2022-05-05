class TransactionNarrative < ApplicationRecord
	belongs_to :investigation
	has_one :user, through: :investigation

	belongs_to :txn
end
