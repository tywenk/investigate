# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

BlockNote.destroy_all
BlockNarrative.destroy_all
TransactionNarrative.destroy_all
Investigation.destroy_all
Txn.destroy_all
Block.destroy_all
User.destroy_all

u = User.create({ address: '0x22724d4Aae7aEfeC6CD63a71aDe0FC929329Af46', ens: nil })
i = Investigation.create({ user_id: u.id })
b = Block.create({ block_num: 14_694_104 })
bn = BlockNarrative.create({ block_id: b.id, investigation_id: i.id, label: '' })
n =
	BlockNote.create(
		{
			block_narrative_id: bn.id,
			note: 'YAAAH',
			label: '',
			tx_hash: '0xa7037a7fb8f7445fc5ca5cb7478cb63639ac658a9f27a702a7c930b3c21f0b19',
		},
	)

# t = Txn.create({ txn_hash: '0xdb6c970d0002a9b760ff8a11055401aaf1a36b67eed5b1bb8dfa355a6ce755de' })
# t = TransactionNarrative.create({ investigation_id: i.id, txn_id: t.id, note_from: 'Hello this is from the backend' })
