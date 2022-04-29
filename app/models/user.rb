class User < ApplicationRecord
	has_many :investigations

	self.primary_key = 'address'

	def seen
		self.last_seen = DateTime.now
	end
end
