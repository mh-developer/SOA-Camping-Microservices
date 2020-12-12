package si.um.feri.activityservice.routes

import de.nielsfalk.ktor.swagger.*
import de.nielsfalk.ktor.swagger.version.shared.Group
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.locations.*
import io.ktor.response.*
import io.ktor.routing.*
import org.bson.types.ObjectId
import si.um.feri.activityservice.models.*
import si.um.feri.activityservice.mongo.MongoDataService

private val mongoDataService = MongoDataService("ActivitiesDb")

@Group("Activities operation")
@Location("/activities")
class activities

@Group("Activities operation")
@Location("/activities/{id}")
class activity(val id: String)

fun Routing.activitiesAll() {
    get<activities>("All activities".responds(ok<Activities>(example("model", Activities.exampleModel)))) {
        call.respond(mongoDataService.getAll("Activities"))
    }

    post<activities, ActivityModel>(
        "Create activity"
            .description("Save activity in our wonderful database!")
            .examples(
                example("rover", ActivityModel.exampleRover, summary = "One possible activity."),
                example("spike", ActivityModel.exampleSpike, summary = "Different possible activity.")
            )
            .responds(
                created<ActivityModel>(
                    example("rover", ActivityModel.exampleRover, summary = "One possible activity."),
                    example("spike", ActivityModel.exampleSpike, summary = "Different possible activity.")
                )
            )
    ) { _, entity ->
        val oidOrErrorMessage = mongoDataService.create("Activities", entity)
        if (ObjectId.isValid(oidOrErrorMessage)) {
            call.respond(HttpStatusCode.Created, oidOrErrorMessage)
        } else {
            call.respond(HttpStatusCode.BadRequest, oidOrErrorMessage)
        }
    }

    get<activity>("Find activity".responds(ok<ActivityModel>(), notFound())) { params ->
        val id: String? = params.id
        val document = mongoDataService.get("Activities", id)
        if (document != null) {
            call.respond(document)
        } else {
            call.respond(HttpStatusCode.NotFound)
        }
    }

    put<activity, ActivityModel>("Update activity".responds(ok<ActivityModel>(), notFound())) { params, entity ->
        val id: String? = params.id
        val (updatedRecords, message) = mongoDataService.update("Activities", id, entity)
        when (updatedRecords) {
            -1 -> call.respond(HttpStatusCode.BadRequest, message)
            0 -> call.respond(HttpStatusCode.NotFound, message)
            1 -> call.respond(HttpStatusCode.NoContent)
        }
    }

    delete<activity>("Delete activity".responds(ok<ActivityModel>(), notFound())) { params ->
        val id: String? = params.id
        val (updatedRecords, message) = mongoDataService.delete("Activities", id)
        when (updatedRecords) {
            0 -> call.respond(HttpStatusCode.NotFound, message)
            1 -> call.respond(HttpStatusCode.NoContent)
        }
    }
}