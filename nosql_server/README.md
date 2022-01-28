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
- `db.<COLLECTION_NAME>.insertMany([<DOCUMENT>])` - insert multiple documents

- `db.<COLLECTION_NAME>.find()` - find all documents in a collection
- `db.<COLLECTION_NAME>.find({salary: 30000})` - find all documents in a collection that has salary = 30000
- `db.<COLLECTION_NAME>.findOne()` - find only one document/first document
- `db.<COLLECTION_NAME>.findOne().name` - find only one document/first document and return only name
- `db.<COLLECTION_NAME>.updateOne()` - update one document
- `db.<COLLECTION_NAME>.updateMany()` - update multiple documents
- `db.<COLLECTION_NAME>.deleteOne()` - remove one document
- `db.<COLLECTION_NAME>.deleteMany()` - remove multiple documents
- `db.<COLLECTION_NAME>`

```
db.employees.insertOne({name: "Chitsanupong", age: 21})

db.employees.find({"grade.math": "A"})

db.employees.find({"social": ["facebook", "instagram"]})

db.employees.updateOne({name: "Chitsanupong"}, {$set: {salary: 50000}})
```

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
7. `$in` - has the value in an array
8. `$nin` - does not has the value in an array

```
db.employees.find({quantity: {$gt: 10}})

db.employees.find({"social": {$nin: ["facebook"]}})
```

### Logical Query Operators

1. `$and` - must meet two conditions
1. `$or` - just meet only one condition
1. `$nor` - must not meet any condition
1. `$not` - must meet opposite of the condition

```
db.employees.find({$and: [{"salary": {$gte: 30000}}, {"age": {$gte: 13}}]})
```

### Aggregation & Pipeline

Each stage performs an operation on the input document.

- WHERE = $match - filter document
- GROUP BY = $group - group document
- SELECT = $project - show only wanted field in the documents
- ORDER BY = $sort
  - 1 = ascending
  - -1 = descending
- LIMIT = $limit - limit documents that will be showed
- JOIN = $lookup
- $count - count documents
- $skip - skips over the specified number of documents
- $push - appends a specified value to an array
- $addToSet - adds a value to an array unless the value is already present, it does nothing to that array.

```
syntax: db.<COLLECTION_NAME>.aggregate([{STATE}])

collections -> $project -> $match -> $group -> $sort -> results

# $project - show only name and age
db.employees.aggregate([{$project: {_id:0, name: 1, age: 1}}])

# $match - show only matched condition collections
db.employees.aggregate([{$match: {salary: {$gte: 30000}}}, {$project: {_id: 0, name: 1, age: 1}}])

# $count
db.employees.aggregate([{$match: {salary: {$gte: 30000}}}, {$count: "employees amount"}])

# $sort
db.employees.aggregate([{$match: {salary: {$gte: 30000}}}, {$project: {_id: 0, name: 1, age: 1, salary: 1}}, {$sort: {salary: 1}}])

# $limit
db.employees.aggregate([{$match: {salary: {$gte: 30000}}}, {$project: {_id: 0, name: 1, age: 1, salary: 1}}, {$limit: 1}])

# $group
db.employees.aggregate([{$group: {_id: "$department", count: {$sum: 1}}}])

db.employees.aggregate([{$group: {_id: "$department", max_salary: {$max: "$salary"}}}])

db.employees.aggregate([{$group: {_id: null, total: {$sum: "$salary"}}}])

# $push
db.employees.aggregate([{$group: {_id: "$department", sum: {$sum: "$salary"}, description: {$push: {name: "$name", salary: "$salary"}}}}])

# $addToSet - like push but the values are not duplicated
db.employees.aggregate([{$group: {_id: "$department", sum: {$sum: "$salary"}, employees: {$addToSet: "$name"}}}])
```
