package si.um.feri.activityservice.models

data class Activities(val activities: MutableList<ActivityModel>) {
    companion object {
        val exampleModel = mapOf(
            "activities" to listOf(
                ActivityModel.example,
                ActivityModel.exampleRover,
                ActivityModel.exampleSpike
            )
        )
    }
}
