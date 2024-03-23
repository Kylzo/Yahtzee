const sql = require("better-sqlite3");
const db = sql("yahtzee.db");

async function initData() {
  // Création de la table Role
  const createRoleStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Role (
       id_role INT,
       role VARCHAR(50) NOT NULL,
       PRIMARY KEY(id_role)
    )
  `);
  createRoleStatement.run();

  // Création de la table User_
  const createPlayerStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Player (
       id_player INT,
       avatar VARCHAR(32),
       pseudo VARCHAR(32) NOT NULL,
       email VARCHAR(32) NOT NULL,
       password VARCHAR(32) NOT NULL,
       token VARCHAR(50) NOT NULL,
       id_role INT NOT NULL,
       PRIMARY KEY(id_player),
       UNIQUE(email),
       UNIQUE(token),
       FOREIGN KEY(id_role) REFERENCES Role(id_role)
    )
  `);
  createPlayerStatement.run();

  // Création de la table Game
  const createGameStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Game (
       id_game INT,
       id_creator INT NOT NULL,
       state VARCHAR(32) NOT NULL,
       PRIMARY KEY(id_game),
       FOREIGN KEY(id_creator) REFERENCES Player(id_player)
    )
  `);
  createGameStatement.run();

  // Création de la table Gaming
  const createGamingStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Gaming (
       id_game INT NOT NULL,
       id_player INT NOT NULL,
       PRIMARY KEY(id_game, id_player),
       FOREIGN KEY(id_game) REFERENCES Game(id_game),
       FOREIGN KEY(id_player) REFERENCES Player(id_player)
    )
  `);
  createGamingStatement.run();

  // Création de la table Chat
  const createChatStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Chat (
       id_message INT,
       content TEXT NOT NULL,
       date_ DATE NOT NULL,
       id_game INT NOT NULL,
       id_player INT NOT NULL,
       PRIMARY KEY(id_message),
       FOREIGN KEY(id_game) REFERENCES Game(id_game),
       FOREIGN KEY(id_player) REFERENCES Player(id_player)
    )
  `);
  createChatStatement.run();

  // Création de la table Score
  const createScoreStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS Score (
       id_score INT,
       score INT,
       id_game INT NOT NULL,
       id_player INT NOT NULL,
       PRIMARY KEY(id_score),
       FOREIGN KEY(id_game) REFERENCES Game(id_game),
       FOREIGN KEY(id_player) REFERENCES Player(id_player)
    )
  `);
  createScoreStatement.run();

  console.log("Tables created successfully.");
}

async function insertData() {
  // Insertion des données fictives
  const insertRoleStatement = db.prepare(`
    INSERT INTO Role (id_role, role) VALUES (?, ?)
  `);

  const roles = [
    [1, "Admin"],
    [2, "Moderator"],
    [3, "Player"],
  ];

  for (const role of roles) {
    insertRoleStatement.run(role);
  }

  // Insertion des données fictives pour Player
  const insertPlayerStatement = db.prepare(`
    INSERT INTO Player (id_player, avatar, pseudo, email, password, token, id_role) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const players = [
    [
      1,
      "avatar1.jpg",
      "JohnDoe",
      "john.doe@example.com",
      "password123",
      "token123",
      1,
    ],
    [
      2,
      "avatar2.jpg",
      "JaneSmith",
      "jane.smith@example.com",
      "password456",
      "token456",
      3,
    ],
    [
      3,
      "avatar3.jpg",
      "Alice",
      "alice@example.com",
      "password789",
      "token789",
      3,
    ],
  ];

  for (const player of players) {
    insertPlayerStatement.run(player);
  }

  // Insertion des données fictives pour Game
  const insertGameStatement = db.prepare(`
    INSERT INTO Game (id_game, id_creator, state) VALUES (?, ?, ?)
  `);

  const games = [
    [1, 1, "Active"],
    [2, 2, "Inactive"],
    [3, 3, "Active"],
  ];

  for (const game of games) {
    insertGameStatement.run(game);
  }

  // Insertion des données fictives pour Gaming
  const insertGamingStatement = db.prepare(`
    INSERT INTO Gaming (id_game, id_player) VALUES (?, ?)
  `);

  const gaming = [
    [1, 1], // JohnDoe joue à Game 1
    [1, 3], // JaneSmith joue à Game 1
    [2, 3], // JaneSmith joue à Game 2
    [3, 2], // Alice joue à Game 3
  ];

  for (const gamePlayer of gaming) {
    insertGamingStatement.run(gamePlayer);
  }

  // Insertion des données fictives pour Chat
  const insertChatStatement = db.prepare(`
    INSERT INTO Chat (id_message, content, date_, id_game, id_player) VALUES (?, ?, ?, ?, ?)
  `);

  const chats = [
    [1, "Hello everyone!", "2024-03-23", 1, 1],
    [2, "Anyone up for a game?", "2024-03-23", 1, 3],
    [3, "I just scored 100 points!", "2024-03-24", 3, 2],
  ];

  for (const chat of chats) {
    insertChatStatement.run(chat);
  }

  // Insertion des données fictives pour Score
  const insertScoreStatement = db.prepare(`
    INSERT INTO Score (id_score, score, id_game, id_player) VALUES (?, ?, ?, ?)
  `);

  const scores = [
    [1, 150, 1, 1],
    [2, 80, 2, 3],
    [3, 100, 3, 2],
  ];

  for (const score of scores) {
    insertScoreStatement.run(score);
  }

  console.log("Data inserted successfully.");
}

initData();
insertData();
