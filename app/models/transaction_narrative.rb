class TransactionNarrative < ApplicationRecord
  belongs_to :investigation
  belongs_to :transaction
end
