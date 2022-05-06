class TransactionNarrativesController < ApplicationController
	skip_before_action :auth_current_user, only: %i[index show]
	skip_before_action :current_investigation

	def index
		render json: TransactionNarrative.all
	end

	def create
		transaction_narr = TransactionNarrative.upsert(transaction_narr_params)
		render json: transaction_narr, status: :created
	end

	def show
		txNarr = TransactionNarrative.find_by(id: params[:id])
		render json: txNarr
	end

	def destroy
		txNarr = TransactionNarrative.find_by(id: params[:id])
		txNarr.destroy
		head :no_content
	end

	private

	def transaction_narr_params
		params.permit(
			:id,
			:label,
			:note_to,
			:note_from,
			:note_contract_address,
			:note_gas_used,
			:note_effective_gas_price,
			:note_logs,
			:investigation_id,
			:txn_id,
		)
	end
end
