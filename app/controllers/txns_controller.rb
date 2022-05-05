class TxnsController < ApplicationController
	skip_before_action :auth_current_user, only: %i[index]

	def index
		render json: Txn.all
	end

	def create
		pp transaction_params
		transaction = Txn.find_or_create_by!(transaction_params)

		transaction_narrative =
			TransactionNarrative.find_or_create_by!({ investigation_id: session[:investigations][0], txn_id: transaction.id })
		render json: transaction_narrative, serializer: TransactionNarrativeAndTransactionOnlySerializer, status: :created
	end

	private

	def transaction_params
		params.permit(:txn_hash)
	end
end
