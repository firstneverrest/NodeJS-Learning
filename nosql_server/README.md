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

### Commands

- `show dbs`, `show databases` - show all databases
- `use <DATABASE>` - choose database from all databases and create new database if that database does not exist. When create new database, it will not appear in MongoDB until you create at least one collection in the new database.
- `db.dropDatabase()` - remove database
- `show collections` - show all collections
- `db.createCollection("<COLLECTION_NAME>")` - create new collection
- `db.<COLLECTION_NAME>.renameCollection("<COLLECTION_NAME>")`- rename a collection
- `db.<COLLECTION_NAME>.drop()` - remove collection
- `db.<COLLECTION_NAME>.insertOne(<DOCUMENT>)` - insert a document

```
db.employees.insertOne({name: "Chitsanupong", age: 21})
```

- `db.<COLLECTION_NAME>.insertMany([<DOCUMENT>])` - insert multiple documents

- `db.<COLLECTION_NAME>.find()` - find all documents in a collection
- `db.<COLLECTION_NAME>.find({salary: 30000})` - find all documents in a collection that has salary = 30000
- `db.<COLLECTION_NAME>.findOne()` - find only one document/first document
- `db.<COLLECTION_NAME>.findOne().name` - find only one document/first document and return only name
-

### Data Types

- String
- Integer
- Double
- Boolean
- Null
- Object - document {}
- Array - array []
- ObjectId - document id (unique)
- Date
- Binary Data

### Comparison Query Operators

1. `$gt` - greater than
2. `$gte` - greater and equal than
3. `$lt` - less and equal than
4. `$lte` - less than
5. `$eq` - equal to
6. `$ne` - not equal to

```
db.employees.find({quantity: {$gt: 10}})
```
