db = db.getSiblingDB("triplanner");

if (!db.getCollectionNames().includes("viajes")) {
  db.createCollection("viajes");
}

if (!db.getCollectionNames().includes("lugares")) {
  db.createCollection("lugares");
}

print("✅ Base de datos y colecciones creadas con éxito.");
