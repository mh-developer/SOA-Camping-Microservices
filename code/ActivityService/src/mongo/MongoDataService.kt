package si.um.feri.activityservice.mongo

import com.google.gson.Gson
import com.mongodb.*
import com.mongodb.MongoClient
import org.bson.BsonDocument
import org.bson.BsonObjectId
import org.bson.Document
import org.bson.json.JsonParseException
import org.bson.types.ObjectId


class MongoDataService(database: String) {
    private val uri = MongoClientURI(
        "SET_MONGODB_CONNECTION_STRING"
    )
    private val mongoClient: MongoClient = MongoClient(uri)
    private val database = mongoClient.getDatabase(database)

    fun getAll(collection: String): ArrayList<Map<String, Any>> {
        val mongoResult = database.getCollection(collection, Document::class.java)
        val result = ArrayList<Map<String, Any>>()
        mongoResult.find()
            .forEach {
                val asMap: Map<String, Any> = mongoDocumentToMap(it)
                result.add(asMap)
            }
        return result
    }

    fun get(collection: String, id: String?): Map<String, Any>? {
        if (!ObjectId.isValid(id)) {
            return null
        }
        val document = database.getCollection(collection).find(Document("_id", ObjectId(id)))
        if (document.first() != null) {
            return mongoDocumentToMap(document.first()!!)
        }
        return null
    }

    fun create(collection: String, document: Any): String {
        try {
            val bsonDocument = BsonDocument.parse(Gson().toJson(document))
            // we create the id ourselves
            bsonDocument.remove("id")
            bsonDocument.remove("_id")
            val oid = ObjectId()
            bsonDocument.put("_id", BsonObjectId(oid))
            database.getCollection(collection, BsonDocument::class.java).insertOne(bsonDocument)
            return oid.toHexString()
        } catch (ex: JsonParseException) {
            return "Invalid JSON: ${ex.localizedMessage}"
        }
    }

    fun update(collection: String, id: String?, document: Any): Pair<Int, String> {
        try {
            if (!ObjectId.isValid(id)) {
                return Pair(0, "ID not found")
            }
            val bsonDocument = BsonDocument.parse(Gson().toJson(document))
            bsonDocument.remove("id")
            val filter = BsonDocument("_id", BsonObjectId(ObjectId(id)))
            val updatedValues =
                database.getCollection(collection, BsonDocument::class.java)
                    .replaceOne(filter, bsonDocument).modifiedCount
            if (updatedValues < 1) {
                return Pair(0, "ID not found")
            } else {
                return Pair(1, "success")
            }
        } catch (ex: JsonParseException) {
            return Pair(-1, "Invalid JSON: ${ex.localizedMessage}")
        }

    }

    fun delete(collection: String, id: String?): Pair<Int, String> {
        if (!ObjectId.isValid(id)) {
            return Pair(0, "ID not found")
        }
        val filter = BsonDocument("_id", BsonObjectId(ObjectId(id)))
        val updatedValues = database.getCollection(collection).deleteOne(filter).deletedCount
        if (updatedValues < 1) {
            return Pair(0, "ID not found")
        } else {
            return Pair(1, "success")
        }
    }

    private fun mongoDocumentToMap(document: Document): Map<String, Any> {
        val asMap: MutableMap<String, Any> = document.toMutableMap()
        if (asMap.containsKey("_id")) {
            val id = asMap.getValue("_id")
            if (id is ObjectId) {
                asMap.set("_id", id.toHexString())
            }
        }
        return asMap
    }
}