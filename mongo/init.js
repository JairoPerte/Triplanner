db = db.getSiblingDB("triplanner");

db.createCollection("viajes");
db.createCollection("lugares");

print("Base de datos y colecciones creadas con éxito.");
