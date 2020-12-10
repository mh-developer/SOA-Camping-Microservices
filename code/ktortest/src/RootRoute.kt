package com.example

import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get

fun Routing.root(){
    get("/") {
        //call.respondText("Hello test!", ContentType.Text.Plain)
        call.respond(Activity(1,"Kakanje v naravi", 1,true))
    }
}