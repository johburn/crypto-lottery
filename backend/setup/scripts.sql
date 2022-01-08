CREATE DATABASE lotterydb;

\c lotterydb;

CREATE TABLE lottery (
   id INT NOT NULL ,
   endDate TIMESTAMP WITH TIME ZONE,
   ticketPrice NUMERIC,
   prize NUMERIC,
   winner VARCHAR,
   primary key (id)
);