CREATE DATABASE edmeventfinder;

CREATE TABLE accounts (
  accountID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
);

CREATE TABLE events (
  eventID INT PRIMARY KEY, 
  eventName VARCHAR(255),
  eventLocation VARCHAR(255),
  eventDate DATE,
  accountID INT,

  FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);