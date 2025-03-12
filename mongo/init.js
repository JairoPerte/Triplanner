db = db.getSiblingDB("triplanner");

if (!db.getCollectionNames().includes("Viajes")) {
  db.createCollection("Viajes");
}

if (!db.getCollectionNames().includes("Lugares")) {
  db.createCollection("Lugares");
}

print("Base de datos y colecciones creadas con éxito.");
