package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"fmt"
	"log"
	"os"
	"bytes"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"html/template"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

type MailSettings struct {
    SendingTo string `json:"sendingTo"`
    Data map[string]interface{} `json:"data"`
}

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"200": "API works"})
	})
	
	router.POST("/reservation-mail", func(c *gin.Context) {
		var mailSettings MailSettings
		c.BindJSON(&mailSettings)
		
		result := send_mail("Success! 🎉🍑 Your reservation is confirmed!", mailSettings.SendingTo, mailSettings.Data)
		if (result) {
			c.JSON(200, gin.H{"success": 200})
		} else {
			c.JSON(400, gin.H{"error": 400})
		}
	})

	router.Run()
}

func send_mail(subject string, sendingTo string, settings map[string]interface{}) (bool) {
	from := mail.NewEmail("Camps Support", os.Getenv("SENDGRID_FROM_MAIL"))
	to := mail.NewEmail("Example User", sendingTo)

	dir, _ := os.Getwd()
	file := fmt.Sprintf("%s/templates/%s", dir, "success-reservation.html")
	t, err := template.ParseFiles(file)
	var doc bytes.Buffer
	err = t.Execute(&doc, settings)

	message := mail.NewSingleEmail(from, subject, to, doc.String(), doc.String())
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	
	response, err := client.Send(message)

	if err != nil {
		log.Println(err)
		return false
	} else {
		fmt.Println(response.StatusCode)
		return true
	}
}