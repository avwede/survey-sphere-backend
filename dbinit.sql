---- SURVEY SPHERE DATABASE SCHEMA ----

---------------- USERS TABLE ----------------
CREATE TABLE IF NOT EXISTS "users" (
    "userID" SERIAL PRIMARY KEY, 
    "fullName" VARCHAR(200) NOT NULL, 
    "username" VARCHAR(200) NOT NULL, 
    "password" VARCHAR(200) NOT NULL, 
    "email" VARCHAR(200) NOT NULL
);
ALTER TABLE ADD "createdAt";
ALTER TABLE ADD "updatedAt";

INSERT INTO users ("fullName", "username", "password", "email") 
            VALUES ('Ashley Voglewede', 'avwede', 'password', 'avwede@gmail.com');
SELECT * FROM users;

---------------- SURVEY TABLE ----------------
CREATE TABLE IF NOT EXISTS "survey" (
    "surveyID" SERIAL PRIMARY KEY,
    "userID" INT NOT NULL, 
    "title" VARCHAR(200) NOT NULL, 
    "description" VARCHAR(500), 
    "status" VARCHAR(200) DEFAULT 'ACTIVE', 
    "startDate" timestamp default current_timestamp, 
    "endDate" timestamp default null,
    FOREIGN KEY("userID") REFERENCES users("userID")
);
ALTER TABLE ADD "createdAt";
ALTER TABLE ADD "updatedAt";

INSERT INTO survey("userID", "title", "description", "status", "startDate", "endDate") 
            VALUES (817892359136706562, 'Food Survey', 'Pick your favorite foods!', 'ACTIVE', '1000-01-01 00:00:00.000000', null);
SELECT * FROM survey;

-- POSTMAN TESTING: 
-- {
--     "userID": 817892359136706562,
--     "title": "Food Survey",
--     "description": "Pick your favorite foods!"
--     "endDate": "1000-01-01 00:00:00.000000"
-- }

---------------- QUESTION TABLE ----------------
CREATE TABLE IF NOT EXISTS "question" (
    "questionID" SERIAL PRIMARY KEY, 
    "surveyID" INT NOT NULL, 
    "title" VARCHAR(200) NOT NULL, 
    "options" TEXT[], 
    "questionType" VARCHAR(100), 
    FOREIGN KEY("surveyID") REFERENCES survey("surveyID")
);
ALTER TABLE ADD "createdAt";
ALTER TABLE ADD "updatedAt";

---------------- ANSWER TABLE ----------------
CREATE TABLE IF NOT EXISTS "answer" (
    "answerID" SERIAL PRIMARY KEY, 
    "surveyID" INT NOT NULL,
    "questionID" INT NOT NULL, 
    "answer" VARCHAR(200), 
    FOREIGN KEY("surveyID") REFERENCES question("surveyID"),
    FOREIGN KEY("questionID") REFERENCES question("questionID")
);
ALTER TABLE ADD "createdAt";
ALTER TABLE ADD "updatedAt";

---------------- ENTRY TABLE ----------------
CREATE TABLE IF NOT EXISTS "entry" (
    "surveyID" INT NOT NULL,
    "userID" INT NOT NULL,
    "answers" TEXT[], 
    FOREIGN KEY("surveyID") REFERENCES survey("surveyID"),
    FOREIGN KEY("userID") REFERENCES survey("userID"),
);
ALTER TABLE ADD "createdAt";
ALTER TABLE ADD "updatedAt";