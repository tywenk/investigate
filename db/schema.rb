# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_03_193958) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "block_narratives", force: :cascade do |t|
    t.bigint "block_id", null: false
    t.bigint "investigation_id", null: false
    t.string "label"
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["block_id"], name: "index_block_narratives_on_block_id"
    t.index ["investigation_id"], name: "index_block_narratives_on_investigation_id"
  end

  create_table "block_notes", force: :cascade do |t|
    t.bigint "block_narrative_id", null: false
    t.string "tx_hash"
    t.text "note"
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["block_narrative_id"], name: "index_block_notes_on_block_narrative_id"
    t.index ["tx_hash"], name: "index_block_notes_on_tx_hash", unique: true
  end

  create_table "blocks", force: :cascade do |t|
    t.string "block_num"
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["block_num"], name: "index_blocks_on_block_num", unique: true
  end

  create_table "investigations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["user_id"], name: "index_investigations_on_user_id"
  end

  create_table "transaction_narratives", force: :cascade do |t|
    t.bigint "investigation_id", null: false
    t.bigint "txn_id", null: false
    t.string "label"
    t.text "note_to"
    t.text "note_from"
    t.text "note_contract_address"
    t.text "note_gas_used"
    t.text "note_effective_gas_price"
    t.text "note_logs"
    t.text "note_value"
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["investigation_id"], name: "index_transaction_narratives_on_investigation_id"
    t.index ["txn_id"], name: "index_transaction_narratives_on_txn_id"
  end

  create_table "txns", force: :cascade do |t|
    t.string "txn_hash"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "address"
    t.string "ens"
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["address"], name: "index_users_on_address", unique: true
  end

  add_foreign_key "block_narratives", "blocks"
  add_foreign_key "block_narratives", "investigations"
  add_foreign_key "block_notes", "block_narratives"
  add_foreign_key "investigations", "users"
  add_foreign_key "transaction_narratives", "investigations"
  add_foreign_key "transaction_narratives", "txns"
end
