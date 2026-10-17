// =====================================================================
// SmartMove - MongoDB demo commands
// Run these ONE SECTION AT A TIME in mongosh (or the Compass shell) and show the output.
// Do not run the whole file with "mongosh --file": that does not print the results.
//
// SAFE BY DESIGN: everything below runs in a SEPARATE database called "smartmove_demo".
// Your real database "smartmove" (used by the website) is never touched.
// =====================================================================

// ---------- 1. Select the DEMO database and show what exists ----------
db = db.getSiblingDB("smartmove_demo")
db.getName()                    // must print smartmove_demo
show collections

// OPTIONAL: copy the REAL data into the demo database first (needs MongoDB 4.4 or newer).
// The real collections are only READ here, never changed. Skip this if you want to
// use the sample documents inserted in section 3 instead.
// ["reviews", "announcements", "vehicle_media", "trip_media"].forEach(c =>
//   db.getSiblingDB("smartmove").getCollection(c).aggregate([ { $out: { db: "smartmove_demo", coll: c } } ]))
// show collections
// db.reviews.countDocuments()
// (If you copy the real data, skip sections 2 and 3, then run section 7 to create the indexes.)


// ---------- 2. Create the collections (typed by me) ----------
// drop() only affects smartmove_demo, so it is safe. Check db.getName() first.
db.reviews.drop()
db.announcements.drop()
db.vehicle_media.drop()
db.trip_media.drop()

db.createCollection("reviews")
db.createCollection("announcements")
db.createCollection("vehicle_media")
db.createCollection("trip_media")
show collections


// ---------- 3. Insert data: insertOne (one document) and insertMany (several) ----------
// 3a. reviews
db.reviews.insertOne({ routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 1, passengerName: "Nimal Perera", tripId: 1,
  vehicleId: 1, vehicleReg: "ND-4521", driverId: 2, driverName: "Nuwan Silva", rating: 5,
  comment: "Smooth ride and the AC was perfect. Driver was very professional.", tags: ["ac", "driver"], submitDate: ISODate("2026-09-20") })

db.reviews.insertMany([
  { routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 2, passengerName: "Kamal Silva", tripId: 2,
    vehicleId: 1, vehicleReg: "ND-4521", driverId: 2, driverName: "Nuwan Silva", rating: 4,
    comment: "Good trip but the bus was slightly late leaving Colombo.", submitDate: ISODate("2026-09-22") },
  { routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 3, passengerName: "Saman Virahinha", tripId: 3,
    vehicleId: 2, vehicleReg: "PV-8890", driverId: 4, driverName: "Kasun Jayasuriya", rating: 2,
    comment: "Seats were dirty and the departure was delayed by 40 minutes. Not happy.", tags: ["complaint", "delay"], submitDate: ISODate("2026-09-25") },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 4, passengerName: "Ayesha Fernando", tripId: 4,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 4, driverName: "Kasun Jayasuriya", rating: 3,
    comment: "Comfortable seats, but the trip was delayed by 15 minutes.", wouldRecommend: true, submitDate: ISODate("2026-09-28") },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 5, passengerName: "Ruwan Jayasinha", tripId: 5,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 2, driverName: "Nuwan Silva", rating: 5,
    comment: "Excellent service, clean vehicle and on time.", photos: ["/media/reviews/galle-view.jpg"], submitDate: ISODate("2026-10-01") },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 1, passengerName: "Nimal Perera", tripId: 6,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 2, driverName: "Nuwan Silva", rating: 4,
    comment: "Nice driver, music was a bit loud though.", submitDate: ISODate("2026-10-04") }
])

// 3b. announcements
db.announcements.insertOne({ title: "Service Notice", message: "Colombo–Galle route running 15 mins behind schedule today due to road works.",
  priority: "high", postedDate: ISODate("2026-10-10"), expiryDate: ISODate("2026-10-31"), active: true })

db.announcements.insertMany([
  { title: "Holiday Schedule", message: "Extra Colombo–Kandy trips will run during the festive season.",
    priority: "normal", postedDate: ISODate("2026-10-08"), expiryDate: ISODate("2026-12-31"), active: true },
  { title: "Old Notice", message: "This notice has expired and must not show on the site.",
    priority: "normal", postedDate: ISODate("2026-09-01"), expiryDate: ISODate("2026-09-30"), active: true }
])

// 3c. vehicle_media (images and documents)
db.vehicle_media.insertOne({ vehicleId: 1, vehicleReg: "ND-4521", type: "image", title: "Front view",
  url: "/media/vehicles/nd-4521-front.jpg", format: "jpg", sizeKb: 420, uploadedAt: ISODate("2026-08-01") })

db.vehicle_media.insertMany([
  { vehicleId: 1, vehicleReg: "ND-4521", type: "document", docType: "Insurance", fileName: "nd-4521-insurance.pdf",
    url: "/media/vehicles/nd-4521-insurance.pdf", issuedDate: ISODate("2025-11-15"), expiryDate: ISODate("2026-11-15"), uploadedAt: ISODate("2026-08-01") },
  { vehicleId: 1, vehicleReg: "ND-4521", type: "document", docType: "Revenue Licence", fileName: "nd-4521-licence.pdf",
    url: "/media/vehicles/nd-4521-licence.pdf", expiryDate: ISODate("2027-03-01"), uploadedAt: ISODate("2026-08-01") },
  { vehicleId: 3, vehicleReg: "NC-1122", type: "document", docType: "Emission Test", fileName: "nc-1122-emission.pdf",
    url: "/media/vehicles/nc-1122-emission.pdf", expiryDate: ISODate("2026-10-25"), uploadedAt: ISODate("2026-07-20") },
  { vehicleId: 3, vehicleReg: "NC-1122", type: "image", title: "Interior seats",
    url: "/media/vehicles/nc-1122-interior.jpg", format: "jpg", sizeKb: 515, uploadedAt: ISODate("2026-07-20") }
])

// 3d. trip_media (photos and videos)
db.trip_media.insertOne({ tripId: 1, routeId: 1, type: "photo", caption: "Scenic stop at Kadugannawa",
  url: "/media/trips/trip1-stop.jpg", uploadedBy: "Nuwan Silva", uploadedAt: ISODate("2026-09-20") })

db.trip_media.insertMany([
  { tripId: 4, routeId: 2, type: "video", caption: "Coastal road view", url: "/media/trips/trip4-coast.mp4",
    durationSec: 45, uploadedBy: "Kasun Jayasuriya", uploadedAt: ISODate("2026-09-28") },
  { tripId: 5, routeId: 2, type: "photo", caption: "Arrival in Galle", url: "/media/trips/trip5-galle.jpg",
    uploadedBy: "Nuwan Silva", uploadedAt: ISODate("2026-10-01") }
])


// ---------- 4. Count documents ----------
db.reviews.countDocuments()                       // all reviews (6)
db.announcements.countDocuments()                 // 3
db.vehicle_media.countDocuments()                 // 5
db.trip_media.countDocuments()                    // 3
db.reviews.countDocuments({ rating: 5 })          // reviews with exactly 5 stars
db.reviews.countDocuments({ rating: { $gt: 3 } }) // more than 3 stars
db.reviews.countDocuments({ routeId: 1 })         // reviews for route 1


// ---------- 5. Find ----------
db.reviews.find()                                 // every review
db.reviews.findOne({ passengerName: "Nimal Perera" })   // first match only
db.reviews.find({ routeId: 1 })                   // all reviews for route 1
db.reviews.find({ driverName: "Nuwan Silva" })

// projection: choose the fields to show (1 = show, 0 = hide)
db.reviews.find({ routeId: 1 }, { passengerName: 1, rating: 1, comment: 1, _id: 0 })

// sort: 1 = ascending, -1 = descending
db.reviews.find({}, { passengerName: 1, rating: 1, _id: 0 }).sort({ rating: 1 })    // lowest first
db.reviews.find({}, { passengerName: 1, rating: 1, _id: 0 }).sort({ rating: -1 })   // highest first
db.reviews.find().sort({ submitDate: -1 }).limit(3)                                 // newest 3


// ---------- 6. Query operators ----------
// comparison: $gt, $gte, $lt, $lte, $ne, $in
db.reviews.find({ rating: { $gt: 3 } })
db.reviews.find({ rating: { $gte: 3, $lte: 4 } })          // between 3 and 4
db.reviews.find({ driverName: { $ne: "Nuwan Silva" } })    // not this driver
db.reviews.find({ rating: { $in: [4, 5] } })               // 4 or 5

// logical: $and, $or
db.reviews.find({ $and: [ { routeId: 2 }, { rating: { $gte: 4 } } ] })
db.reviews.find({ $or: [ { rating: 2 }, { rating: 3 } ] })

// $exists: schema flexibility - only some documents have these fields
db.reviews.find({ photos: { $exists: true } })
db.reviews.find({ wouldRecommend: { $exists: true } })
db.vehicle_media.find({ expiryDate: { $exists: true } })

// text matching with a regular expression (i = ignore case)
db.reviews.find({ comment: { $regex: "delay", $options: "i" } })


// ---------- 7. Indexes ----------
db.reviews.createIndex({ comment: "text" })         // needed for keyword search with $text
db.reviews.createIndex({ routeId: 1 })
db.vehicle_media.createIndex({ vehicleId: 1 })
db.reviews.getIndexes()


// ---------- 8. The four queries required by the coursework brief ----------
// (a) All passenger reviews for a specific route
db.reviews.find({ routeId: 1 }).sort({ submitDate: -1 })

// (b) Highest-rated vehicles, drivers (and routes)
db.reviews.aggregate([
  { $group: { _id: "$vehicleReg", avgRating: { $avg: "$rating" }, reviews: { $sum: 1 } } },
  { $sort: { avgRating: -1 } }
])
db.reviews.aggregate([
  { $group: { _id: "$driverName", avgRating: { $avg: "$rating" }, reviews: { $sum: 1 } } },
  { $sort: { avgRating: -1 } }
])
db.reviews.aggregate([
  { $group: { _id: "$routeLabel", avgRating: { $avg: "$rating" }, reviews: { $sum: 1 } } },
  { $sort: { avgRating: -1 } }
])

// (c) Search customer complaints / feedback by keyword
db.reviews.find({ $text: { $search: "delayed dirty" } })            // text index search
db.reviews.find({ comment: { $regex: "late|delay|dirty", $options: "i" } })   // pattern search
db.reviews.find({ rating: { $lte: 2 } })                            // low-rated complaints

// (d) Vehicle documents and multimedia information
db.vehicle_media.find({ vehicleReg: "ND-4521" })                    // everything for one vehicle
db.vehicle_media.find({ type: "document" })                         // documents only
db.vehicle_media.find({ type: "image" })                            // images only
db.vehicle_media.find({ type: "document", expiryDate: { $lte: ISODate("2026-12-31") } }).sort({ expiryDate: 1 })  // expiring soon
db.trip_media.find({ tripId: 4 })                                   // multimedia of one trip
db.trip_media.find({ type: "video" })

// Active announcements (what the website shows)
db.announcements.find({ active: true, expiryDate: { $gte: new Date() } })


// ---------- 9. Update, using a temporary document so the real data is untouched ----------
db.reviews.insertOne({ routeId: 1, routeLabel: "Colombo → Kandy", passengerName: "Demo User", vehicleReg: "ND-4521",
  driverName: "Nuwan Silva", rating: 3, comment: "Temporary demo review", submitDate: new Date() })

db.reviews.find({ passengerName: "Demo User" })

// $set: change a field
db.reviews.updateOne({ passengerName: "Demo User" }, { $set: { rating: 4, comment: "Temporary demo review (edited)" } })

// $inc: add to a number (use -1 to subtract)
db.reviews.updateOne({ passengerName: "Demo User" }, { $inc: { rating: 1 } })

// $push: add an item to an array (creates the array if it is missing)
db.reviews.updateOne({ passengerName: "Demo User" }, { $push: { tags: "demo" } })

// $unset: remove a field
db.reviews.updateOne({ passengerName: "Demo User" }, { $unset: { tags: "" } })

// updateMany: change every matching document
db.reviews.updateMany({ passengerName: "Demo User" }, { $set: { driverName: "Kasun Jayasuriya" } })

db.reviews.find({ passengerName: "Demo User" })


// ---------- 10. Delete ----------
db.reviews.deleteOne({ passengerName: "Demo User" })     // removes the first match
db.reviews.countDocuments()                              // back to 6

// deleteMany example with temporary announcements
db.announcements.insertMany([
  { title: "Temp 1", message: "x", priority: "normal", active: false },
  { title: "Temp 2", message: "y", priority: "normal", active: false }
])
db.announcements.deleteMany({ active: false })           // removes both temporary ones
db.announcements.countDocuments()                        // back to 3

// delete by _id (copy a real _id from a find() result; this one is a made-up example)
// db.announcements.deleteOne({ _id: ObjectId("PASTE_AN_ID_HERE") })


// ---------- 11. Final check ----------
db.reviews.countDocuments()          // 6
db.announcements.countDocuments()    // 3
db.vehicle_media.countDocuments()    // 5
db.trip_media.countDocuments()       // 3

// ---------- 12. Check the real database is untouched ----------
db.getSiblingDB("smartmove").reviews.countDocuments()     // your real data

// ---------- 13. Clean up after the demo (removes ONLY the demo database) ----------
// db.getName()                      // must print smartmove_demo before you run the next line
// db.dropDatabase()
