﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Camps.API.Models
{
    public class Camp
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public string LocationX { get; set; }
        public string LocationY { get; set; }
        public List<Category> Categories { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}