
db.createCollection("reviews")
db.createCollection("announcements")
db.createCollection("vehicle_media")
db.createCollection("trip_media")
show collections

// reviews
db.reviews.insertOne({ routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 1, passengerName: "Nimal Perera", tripId: 1,
  vehicleId: 1, vehicleReg: "ND-4521", driverId: 2, driverName: "Nuwan Silva", rating: 5,
  comment: "Smooth ride and the AC was perfect. Driver was very professional.", tags: ["ac", "driver"], submitDate: "2026-09-20" })

db.reviews.insertMany([
  { routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 2, passengerName: "Kamal Silva", tripId: 2,
    vehicleId: 1, vehicleReg: "ND-4521", driverId: 2, driverName: "Nuwan Silva", rating: 4,
    comment: "Good trip but the bus was slightly late leaving Colombo.", submitDate: "2026-09-22" },
  { routeId: 1, routeLabel: "Colombo → Kandy", passengerId: 3, passengerName: "Saman Virahinha", tripId: 3,
    vehicleId: 2, vehicleReg: "PV-8890", driverId: 4, driverName: "Kasun Jayasuriya", rating: 2,
    comment: "Seats were dirty and the departure was delayed by 40 minutes. Not happy.", tags: ["complaint", "delay"], submitDate: "2026-09-25" },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 4, passengerName: "Ayesha Fernando", tripId: 4,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 4, driverName: "Kasun Jayasuriya", rating: 3,
    comment: "Comfortable seats, but the trip was delayed by 15 minutes.", wouldRecommend: true, submitDate: "2026-09-28" },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 5, passengerName: "Ruwan Jayasinha", tripId: 5,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 2, driverName: "Nuwan Silva", rating: 5,
    comment: "Excellent service, clean vehicle and on time.", photos: ["/media/reviews/galle-view.jpg"], submitDate: "2026-10-01" },
  { routeId: 2, routeLabel: "Colombo → Galle", passengerId: 1, passengerName: "Nimal Perera", tripId: 6,
    vehicleId: 3, vehicleReg: "NC-1122", driverId: 2, driverName: "Nuwan Silva", rating: 4,
    comment: "Nice driver, music was a bit loud though.", submitDate: "2026-10-04" }
])

// announcements
db.announcements.insertOne({ title: "Service Notice", message: "Colombo–Galle route running 15 mins behind schedule today due to road works.",
  priority: "high", postedDate: "2026-10-10", expiryDate: "2026-10-31", active: true })

db.announcements.insertMany([
  { title: "Holiday Schedule", message: "Extra Colombo–Kandy trips will run during the festive season.",
    priority: "normal", postedDate: "2026-10-08", expiryDate: "2026-12-31", active: true },
  { title: "Old Notice", message: "This notice has expired and must not show on the site.",
    priority: "normal", postedDate: "2026-09-01", expiryDate: "2026-09-30", active: true }
])

// vehicle_media
db.vehicle_media.insertOne({ vehicleId: 1, vehicleReg: "ND-4521", type: "image", title: "Front view",
  url: "/media/vehicles/nd-4521-front.jpg", format: "jpg", sizeKb: 420, uploadedAt: "2026-08-01" })

db.vehicle_media.insertMany([
  { vehicleId: 1, vehicleReg: "ND-4521", type: "document", docType: "Insurance", fileName: "nd-4521-insurance.pdf",
    url: "/media/vehicles/nd-4521-insurance.pdf", issuedDate: "2025-11-15", expiryDate: "2026-11-15", uploadedAt: "2026-08-01" },
  { vehicleId: 1, vehicleReg: "ND-4521", type: "document", docType: "Revenue Licence", fileName: "nd-4521-licence.pdf",
    url: "/media/vehicles/nd-4521-licence.pdf", expiryDate: "2027-03-01", uploadedAt: "2026-08-01" },
  { vehicleId: 3, vehicleReg: "NC-1122", type: "document", docType: "Emission Test", fileName: "nc-1122-emission.pdf",
    url: "/media/vehicles/nc-1122-emission.pdf", expiryDate: "2026-10-25", uploadedAt: "2026-07-20" },
  { vehicleId: 3, vehicleReg: "NC-1122", type: "image", title: "Interior seats",
    url: "/media/vehicles/nc-1122-interior.jpg", format: "jpg", sizeKb: 515, uploadedAt: "2026-07-20" }
])

// trip_media
db.trip_media.insertOne({ tripId: 1, routeId: 1, type: "photo", caption: "Scenic stop at Kadugannawa",
  url: "/media/trips/trip1-stop.jpg", uploadedBy: "Nuwan Silva", uploadedAt: "2026-09-20" })

db.trip_media.insertMany([
  { tripId: 4, routeId: 2, type: "video", caption: "Coastal road view", url: "/media/trips/trip4-coast.mp4",
    durationSec: 45, uploadedBy: "Kasun Jayasuriya", uploadedAt: "2026-09-28" },
  { tripId: 5, routeId: 2, type: "photo", caption: "Arrival in Galle", url: "/media/trips/trip5-galle.jpg",
    uploadedBy: "Nuwan Silva", uploadedAt: "2026-10-01" }
])

