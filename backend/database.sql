CREATE DATABASE edmeventfinder;

CREATE TABLE accounts (
  accountID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  initVector VARCHAR(255) NOT NULL
);

CREATE TABLE events (
  eventID SERIAL PRIMARY KEY,
  eventName VARCHAR(255),
  eventLocation VARCHAR(255),
  eventDate VARCHAR(255),
  eventLink VARCHAR(255),
  eventPhoto VARCHAR(255),
  accountID INT,

  FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);