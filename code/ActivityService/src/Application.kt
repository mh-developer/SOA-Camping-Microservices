package si.um.feri.activityservice

import de.nielsfalk.ktor.swagger.SwaggerSupport
import de.nielsfalk.ktor.swagger.version.shared.Contact
import de.nielsfalk.ktor.swagger.version.shared.Information
import de.nielsfalk.ktor.swagger.version.v2.Swagger
import de.nielsfalk.ktor.swagger.version.v3.OpenApi
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
import io.ktor.locations.*
import io.ktor.routing.*
import si.um.feri.activityservice.routes.activitiesAll


fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }
    install(CORS)
    {
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Patch)
        method(HttpMethod.Delete)
        method(HttpMethod.Head)
        method(HttpMethod.Options)
        header(HttpHeaders.Accept)
        header(HttpHeaders.AcceptLanguage)
        header(HttpHeaders.ContentLanguage)
        header(HttpHeaders.XForwardedProto)
        anyHost()
        allowCredentials = true
        allowNonSimpleContentTypes = true
    }
    install(Locations) {
    }
    install(SwaggerSupport) {
        forwardRoot = true
        val information = Information(
            version = "0.1",
            title = "Activity Service API",
            description = "Activity service for manage activities in camps.",
            contact = Contact(
                name = "Care iz Omare",
                url = "https://example.com"
            )
        )
        swagger = Swagger().apply {
            info = information
        }
        openApi = OpenApi().apply {
            info = information
        }
    }

    routing {
        this.activitiesAll()
    }
}
