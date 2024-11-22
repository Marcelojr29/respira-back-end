-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    "sensorId" INTEGER NOT NULL,
    "co2Level" REAL NOT NULL,
    "temperature" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorData_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
