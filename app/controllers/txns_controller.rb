class TxnsController < ApplicationController
	def index
		render json: Txn.all
	end

	def create
		transaction = Txn.find_or_create_by!(transaction_params)

		pp session[:investigations][0]

		transaction_narrative =
			TransactionNarrative.find_or_create_by!({ investigation_id: session[:investigations][0], txn_id: transaction.id })
		render json: transaction_narrative, serializer: TransactionNarrativeAndTransactionOnlySerializer, status: :created
	end

	private

	def transaction_params
		params.permit(:txn_hash)
	end
end
