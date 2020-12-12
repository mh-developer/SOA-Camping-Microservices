package si.um.feri.activityservice.models

data class ActivityModel(val id: String?, val name: String) {
    companion object {
        val example = mapOf(
            "id" to "1",
            "name" to "Kakanje"
        )

        val exampleSpike = mapOf(
            "id" to "2",
            "name" to "Spike"
        )

        val exampleRover = mapOf(
            "id" to "3",
            "name" to "Rover"
        )
    }
}

val activityIdSchema =  mapOf(
    "type" to "string",
    "format" to "string",
    "description" to "Object id for access"
)
