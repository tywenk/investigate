class TransactionsController < ApplicationController
	def index
		render json: Transaction.all
	end

	def create
		transaction = Transaction.find_or_create_by!(transaction_params)
		transaction_narrative =
			TransactionNarrative.find_or_create_by!(
				{ investigation_id: session[:investigations][0], transaction_id: transaction.id },
			)
		render json: transaction_narrative, serializer: TransactionNarrativeAndTransactionOnlySerializer, status: :created
	end

	private

	def transaction_params
		params.permit(:transaction_hash)
	end
end
