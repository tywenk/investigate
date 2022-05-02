class UserSessionSerializer < ActiveModel::Serializer
	attributes :id, :address, :ens
	has_many :investigations
	has_many :block_narratives

	def ens
		instance_options[:ens]
	end
end
