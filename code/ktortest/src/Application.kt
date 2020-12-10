package com.example

import com.example.Activities.danger
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.annotation.JsonAppend
import com.fasterxml.jackson.databind.util.JSONPObject
import de.nielsfalk.ktor.swagger.SwaggerSupport
import de.nielsfalk.ktor.swagger.SwaggerUi
import de.nielsfalk.ktor.swagger.version.shared.Contact
import de.nielsfalk.ktor.swagger.version.shared.Information
import de.nielsfalk.ktor.swagger.version.shared.Tag
import de.nielsfalk.ktor.swagger.version.v2.Swagger
import de.nielsfalk.ktor.swagger.version.v3.OpenApi
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.gson.gson
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.JacksonConverter
import io.ktor.jackson.jackson
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

// https://github.com/JetBrains/Exposed/wiki/DataBase-and-DataSource
fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

private val userData= "{\"users\": [\"Nate\", \"Megan\", \"John] }"

data class Activity(val id: Int? = null, val name: String, val max_p: Int, val danger: Boolean)

object Activities : Table() {
    var id: Column<Int> =integer("id").autoIncrement()
    var name: Column<String> =varchar("name",255)
    var max_p: Column<Int> =integer("max_p")
    var danger: Column<Boolean> = bool("danger")

    override val primaryKey = PrimaryKey(id, name="PK_Activity_ID")

    fun toActivity(row: ResultRow): Activity =
        Activity(
            id= row[id],
            name=row[name],
            max_p = row[max_p],
            danger = row[danger]
        )

}

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(ContentNegotiation) {
        jackson {

        }
    }
    val sizeSchemaMap = mapOf(
        "type" to "number",
        "minimum" to 0
    )


    Database.connect("jdbc:h2:mem:regular;DB_CLOSE_DELAY=-1;", "org.h2.Driver")
    transaction {
        SchemaUtils.create(Activities)

        Activities.insert {
            it[name] = "Lokostrelstvo"
            it[max_p] = 25
            it[danger]= true
        }
        Activities.insert {
            it[name] = "Obramba proti medvedu"
            it[max_p] = 22
            it[danger]= true
        }
        Activities.insert {
            it[name] = "Kakanje na prostem"
            it[max_p] = 22
            it[danger]= false
        }

        Activities.insert {
            it[name] = "Lulanje proti vetru"
            it[max_p] = 11
            it[danger]= true
        }

    }


    install(Routing) {
        route("/activities") {

            get("/") {
                val activity = transaction {
                    Activities.selectAll().map { Activities.toActivity(it) }
                }
                call.respond(activity)
            }
            get("/name") {

                val activity = transaction {
                    Activities.selectAll().map { Activities.toActivity(it) }
                }

                call.respond(activity)
            }
            get("/{id}") {
                val id = call.parameters["id"]!!.toInt()
                val neke = transaction {
                    Activities.select { Activities.id eq id }.map { Activities.toActivity(it) }
                }
                if (neke != null) {
                    call.respond(neke)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
            put("/{id}") {

                val id = call.parameters["id"]!!.toInt()

                val data = call.receive(Activities::class)

                val neke = transaction {
                    Activities.update ({ Activities.id eq id }){

                        it[name]=data.name
                        it[max_p]= data.max_p
                    }
                }
                call.respond(neke)

            }
            delete("/{id}") {
                val id = call.parameters["id"]!!.toInt()
                val neke = transaction {
                    Activities.deleteWhere { Activities.id eq id }
                }
                if (neke != null) {
                    call.respond(HttpStatusCode.OK)
                    println("Deletion success!")
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
            post("/") {

                val post = call.receive<String>()
                transaction { Activities.insert {
                    it[name] = post
                    it[max_p] = 3
                } }
                call.respondText { "You added: $post" }

            }
        }
        /*route("/activities/danger"){
            get("/") {
                val activity = transaction {
                    Activities.selectAll().map { Activities.toActivity(it) }
                }
                val condition = when{
                    Activities != null &&  != true ->
                }
                call.respond(activity)
            }
        }*/
    }

}

