# NoSQL Databases

NoSQL databases are non-tabular databases and store data differently than relational tables. NoSQL databases have four types:

1. Key-value store - Redis
2. Document store - MongoDB
3. Graph store - use in AI, machine learning such as neo4j
4. Wide-column store - Cassandra, DynamoDB

## MongoDB

### Difference between SQL and MongoDB

- table = collection
- row = document
- column = field
- primary key = object key

### Installation

- MongoDB Community - MongoDB Server, open source
- MongoDB Compass - GUI for MongoDB

## Commands

- `show dbs`, `show databases` - show databases
- `use <DATABASE>` - choose database from all databases and create new database if that database does not exist. When create new database, it will not appear in MongoDB until you create at least one collection in the new database.
- `db.dropDatabase()` - remove database
- `db.createCollection("<COLLECTION_NAME>")` - create new collection
- `db.<COLLECTION_NAME>.renameCollection("<COLLECTION_NAME>")`- rename a collection
- `db.<COLLECTION_NAME>.drop()` - remove collection
